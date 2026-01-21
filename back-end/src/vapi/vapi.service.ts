import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VapiService {
  private readonly vapiApiKey = process.env.VAPI_API_KEY;
  private readonly baseUrl = 'https://api.vapi.ai/call';

  async getCallDetails(callId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${callId}`, {
        headers: {
          Authorization: `Bearer ${this.vapiApiKey}`,
        },
      });

      const { summary, analysis } = response.data;
      return { summary, analysis };
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error fetching Vapi details',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}