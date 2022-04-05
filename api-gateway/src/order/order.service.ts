import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderSetEvent } from 'src/dtos/order-set.event';
import { SetOrderDTO } from 'src/dtos/set-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
  ) {}

  getAll() {
    return this.orderClient.send('get_orders', {}).subscribe((orders) => {
      console.log(orders);
      return orders;
    });
  }

  setOrder(body: SetOrderDTO) {
    const { user_id, method, market_id, quantity } = body;
    this.orderClient.emit(
      'order-set',
      new OrderSetEvent(user_id, market_id, method, quantity),
    );
  }
}
