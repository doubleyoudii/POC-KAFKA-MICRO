import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateMarket } from 'src/dtos/create-market.dto';
import { MarketCreateEvent } from 'src/dtos/market-create.event';

@Injectable()
export class MarketService {
  constructor(
    @Inject('MARKET_SERVICE') private readonly marketClient: ClientKafka,
  ) {}

  getAll() {
    return this.marketClient.send('get_markets', {}).subscribe((market) => {
      console.log(market);
      console.log(typeof market);
      return market;
    });
  }

  createMarket(body: CreateMarket) {
    const { name, quantity } = body;
    this.marketClient.emit(
      'market_created',
      new MarketCreateEvent(name, quantity),
    );
  }
}
