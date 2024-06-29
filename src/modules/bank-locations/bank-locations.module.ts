import { Module } from '@nestjs/common';
import { BankController } from './resources/rest/bank.controller';
import { BankLocationsService } from './service/bank-locations.service';
import { HttpModule } from '@nestjs/axios';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BankLocationsResolver } from './resources/resolver/bank-locations.resolver';

@Module({
  imports: [HttpModule, GraphQLModule.forRoot<ApolloDriverConfig>({  
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile: true,
    path: '/bank-service/graphql'
  })],
  controllers: [BankController],
  providers: [BankLocationsService, BankLocationsResolver]
})
export class BankLocationsModule { }

