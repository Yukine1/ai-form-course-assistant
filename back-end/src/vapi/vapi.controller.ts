import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { VapiService } from './vapi.service';

@Controller('call-details')
export class VapiController {
  constructor(private readonly vapiService: VapiService) {}

  @Get()
  async getCallDetails(@Query('call_id') callId: string) {
    if (!callId) {
      throw new BadRequestException('Call ID is required');
    }
    return this.vapiService.getCallDetails(callId);
  }
}