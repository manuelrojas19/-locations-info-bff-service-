import { Test, TestingModule } from '@nestjs/testing';
import { BankLocationsService } from './bank-locations.service';

describe('BankService', () => {
  let service: BankLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankLocationsService],
    }).compile();

    service = module.get<BankLocationsService>(BankLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
