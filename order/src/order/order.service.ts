import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.model';
import { Model } from 'mongoose';
import { OrderSetEvent } from 'src/dto/order-set.event';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from 'src/dto/get-user-request.dto';
import { UpdateQuantityRequest } from 'src/dto/update-quantity-request.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
    @Inject('MARKET_SERVICE') private readonly marketClient: ClientKafka,
  ) {}

  async getOrders() {
    return await this.orderModel.find();
  }

  async handleSetOrder(data: OrderSetEvent) {
    const { user_id, market_id, quantity, method } = data;
    let getMarket;
    let getUser;
    this.marketClient
      .send(
        'update_quantity',
        new UpdateQuantityRequest(data.market_id, data.quantity),
      )
      .subscribe(async (market) => {
        getMarket = await market;
        console.log(getMarket);
      });
    this.userClient
      .send('get_user', new GetUserRequest(data.user_id))
      .subscribe(async (user) => {
        getUser = await user;
        console.log(getUser);
      });

    const newOrder = await this.orderModel.create({
      user_id,
      market_id,
      quantity,
      method,
    });
    console.log(`New Order Created with an ID of ${newOrder._id}`);
  }
}
