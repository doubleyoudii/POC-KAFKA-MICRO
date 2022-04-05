import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MARKET_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'market',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'market-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
