import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { BankDataResponse, Data } from '../dto/client/bank-data-response.dto';
import { ConfigService } from '@nestjs/config';
import { toBankTypeConstants } from '../utils/mappers';

@Injectable()
export class BankLocationsService {

  private readonly logger = new Logger(BankLocationsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) { }

  async findBankData(headers: any, queryParams: Record<string, any>): Promise<BankDataResponse> {
    const bankData = await this.findBankDataFromDownstreamService(headers, queryParams);
    const types = queryParams["types"]?.map((t: string) => toBankTypeConstants(t)) ?? [];
    if (types.length > 0) {
      this.logger.log("Bank types criteria were provided");
      return this.filterBankDataByType(types, bankData);
    }
    this.logger.log("No types were indicated, returning bank data information")
    return bankData
  }

  private filterBankDataByType(types: string[], bankData: BankDataResponse) {
    this.logger.log("Filtering bank infromation using type(s): " + types);
    bankData.Data.Bank = bankData.Data.Bank.filter(bank => types.includes(bank.Type));
    return bankData;
  }

  private async findBankDataFromDownstreamService(headers: any, queryParams: Record<string, any>): Promise<BankDataResponse> {
    const url = this.findBanksApiUrl();
    this.logger.log(`Calling downstream service: ${url}`);
    queryParams.size = 9000
    const bankData$ = this.httpService.get<BankDataResponse>(url, { headers, params: queryParams })
      .pipe(
        map(response => response.data as BankDataResponse),
        catchError(error => {
          this.logger.error(`Error retrieving bank data: ${error.message}`, error);
          throw new Error('Failed to fetch data');
        })
      );
    const bankData = await lastValueFrom(bankData$);
    this.logger.debug(`Bank data information from downstream service --> ${JSON.stringify(bankData)}`);
    this.logger.log('Bank data information retrieved successfully from downstream service.');
    return bankData;
  }

  private findBanksApiUrl(): string {
    const host = this.configService.get<string>('application.backend.bank-service.host');
    const findBanksUri = this.configService.get<string>('application.backend.bank-service.find-banks-api-uri');
    return `${host}${findBanksUri}`;
  }

} 