import { Module } from '@nestjs/common';

import { HelthCheckModule } from './health-check/health-check.module';
import { BankLocationsModule } from './bank-locations/bank-locations.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    BankLocationsModule,
    HelthCheckModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configuration],
      isGlobal: true,
    })
  ],
})
export class AppModule { }
