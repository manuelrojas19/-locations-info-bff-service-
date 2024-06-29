import { Args, Query, Resolver, Float, Context } from "@nestjs/graphql";
import { BankLocations } from "../../dto/graphql/bank-data.gql.model";
import { BankLocationsService } from "../../service/bank-locations.service";
import { Logger } from "@nestjs/common";
import { toBankLocations } from "../../utils/mappers";
import { BankLocationSearchInput } from "../../dto/graphql/bank-location.search-input";

@Resolver(() => BankLocations)
export class BankLocationsResolver {

    private readonly logger = new Logger(BankLocationsResolver.name);

    constructor(
        private readonly bankLocationsService: BankLocationsService,
    ) { }

    @Query(() => [BankLocations])
    async findBankLocations(
        @Context() context: any,
        @Args('searchInput') searchInput: BankLocationSearchInput,
    ): Promise<BankLocations[]> {

        this.logger.log("Request received on bank data GraphQL resolver.");
    
        const headers = context.headers;
        this.logger.debug(`Request headers: ${JSON.stringify(headers)}`);

        this.logger.debug(`Calling bank service to fetch data for --> ${JSON.stringify(searchInput)}`);
        const response = await this.bankLocationsService.findBankData(headers, searchInput);
        this.logger.debug("Received response from bank service.");

        this.logger.debug("Mapping bank data response to GraphQL response...");
        const bankDataGraphqlResponse = toBankLocations(response);
        this.logger.debug("Mapping completed.");

        this.logger.log("Sending response to client.");
        this.logger.debug(`Bank Data GraphQL response --> ${JSON.stringify(bankDataGraphqlResponse)}`);

        return bankDataGraphqlResponse;
    }
}