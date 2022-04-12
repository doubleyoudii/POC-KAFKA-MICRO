import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketModule } from './market/market.module';
import { OrderModule } from './order/order.module';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderSubModule } from './order-sub/order-sub.module';
import { PubsubModule } from './pubsub/pubsub.module';
import { MarketSubModule } from './market-sub/market-sub.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school-mangement',
      useUnifiedTopology: true,
      entities: [Student],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      include: [StudentModule, OrderSubModule, MarketSubModule],
    }),
    StudentModule,
    MarketModule,
    OrderModule,
    OrderSubModule,
    PubsubModule,
    MarketSubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
