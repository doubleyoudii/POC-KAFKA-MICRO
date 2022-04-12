import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { CreateMarket } from 'src/dtos/create-market.dto';
import { MarketCreateEvent } from 'src/dtos/market-create.event';
import { PUB_SUB } from 'src/pubsub/pubsub.module';

@Injectable()
export class MarketService {
  constructor(
    @Inject('MARKET_SERVICE') private readonly marketClient: ClientKafka,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  getAll() {
    return this.marketClient.send('get_markets', {}).subscribe((market) => {
      console.log(market);
      this.pubSub.publish('GET_MARKET', { getMarket: market });
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
