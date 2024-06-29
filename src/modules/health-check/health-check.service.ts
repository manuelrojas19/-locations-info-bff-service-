import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  healthCheck(): string {
    return 'assets-service-bff is healthy!';
  }
}
