import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './order.model';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer-order',
          },
        },
      },
      {
        name: 'MARKET_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'market',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'market-consumer-order',
          },
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
