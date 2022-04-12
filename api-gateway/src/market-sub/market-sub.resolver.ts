import { Resolver, Mutation, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { MarketType } from './market-sub.type';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const EVENT_NAME = 'GET_MARKET';

@Resolver((of) => MarketType)
export class MarketSubResolvers {
  constructor(@Inject(PUB_SUB) private pubSub: RedisPubSub) {}

  //   @Mutation((returns) => OrderSetType)
  //   async ping() {
  //     const pingId = Date.now().toLocaleString();
  //     this.pubSub.publish(EVENT_NAME, { pong: { id: pingId } });
  //     return { id: pingId };
  //   }

  @Subscription((returns) => [MarketType])
  getMarket() {
    const sub = this.pubSub.asyncIterator(EVENT_NAME);
    return sub;
  }
}
