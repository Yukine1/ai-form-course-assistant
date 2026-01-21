import { Module } from "@nestjs/common";
import { VapiController } from "./vapi.controller";
import { VapiService } from "./vapi.service";

@Module({
    controllers:[VapiController],
    providers:[VapiService],
    exports:[VapiService],
})

export class VapiModule {}
