import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketModule } from './market/market.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [MarketModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
