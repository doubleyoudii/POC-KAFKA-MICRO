import {
  Controller,
  Body,
  Post,
  Get,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SetOrderDTO } from 'src/dtos/set-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController implements OnModuleInit {
  constructor(
    private readonly orderService: OrderService,
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.orderClient.subscribeToResponseOf('get_orders');
  }

  @Get()
  getAll() {
    this.orderService.getAll();
  }

  @Post()
  setOrder(@Body() body: SetOrderDTO) {
    this.orderService.setOrder(body);
  }
}
