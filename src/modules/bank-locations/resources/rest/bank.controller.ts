import { Controller, Get, Headers, Logger, Query } from '@nestjs/common';
import { BankLocationsService } from '../../service/bank-locations.service';
import { BankDataResponse } from '../../dto/client/bank-data-response.dto';

@Controller('/bank-service/api/v1')
export class BankController {
    private readonly logger = new Logger(BankController.name);

    constructor(private readonly bankService: BankLocationsService) { }

    @Get('/banks')
    async findBanks(@Headers() headers: any, @Query() queryParams: Record<string, any>): Promise<BankDataResponse> {
        this.logger.log("Request received on bank data rest controller.");
        return this.bankService.findBankData(headers, queryParams);
    }
}