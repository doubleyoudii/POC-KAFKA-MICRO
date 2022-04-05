import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketModule } from './market/market.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/bet-nest', {
      autoCreate: true,
    }),
    MarketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
