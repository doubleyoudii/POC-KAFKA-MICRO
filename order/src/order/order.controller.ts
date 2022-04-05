import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController implements OnModuleInit {
  constructor(
    private readonly orderService: OrderService,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
    @Inject('MARKET_SERVICE') private readonly marketClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.marketClient.subscribeToResponseOf('update_quantity');
    this.userClient.subscribeToResponseOf('get_user');
  }

  @EventPattern('order-set')
  handleSetOrder(data: any) {
    this.orderService.handleSetOrder(data.value);
  }

  @MessagePattern('get_orders')
  getMarkets() {
    return this.orderService.getOrders();
  }
}
