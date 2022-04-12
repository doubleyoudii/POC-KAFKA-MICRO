import { Resolver, Mutation, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { OrderSetType } from './orderSub.type';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const TEST_EVENT_NAME = 'test';

@Resolver((of) => OrderSetType)
export class OrderSubResolvers {
  constructor(@Inject(PUB_SUB) private pubSub: RedisPubSub) {}

  @Mutation((returns) => OrderSetType)
  async ping() {
    const pingId = Date.now().toLocaleString();
    this.pubSub.publish(TEST_EVENT_NAME, { pong: { id: pingId } });
    return { id: pingId };
  }

  @Subscription((returns) => OrderSetType)
  pong() {
    const sub = this.pubSub.asyncIterator(TEST_EVENT_NAME);
    return sub;
  }
}
