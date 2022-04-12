import { Module } from '@nestjs/common';
import { MarketSubResolvers } from './market-sub.resolver';

@Module({
  providers: [MarketSubResolvers],
  exports: [],
})
export class MarketSubModule {}
