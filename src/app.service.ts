import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Todo API is running. Visit /docs for Swagger documentation.';
  }
}
