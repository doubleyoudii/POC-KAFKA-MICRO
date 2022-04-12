import { Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { OrderSubService } from './order-sub.service';
import { OrderSubResolvers } from './orderSub.resolver';

@Module({
  providers: [OrderSubService, OrderSubResolvers],
  exports: [],
})
export class OrderSubModule {}
