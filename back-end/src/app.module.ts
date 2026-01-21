import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VapiModule } from './vapi/vapi.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    VapiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
