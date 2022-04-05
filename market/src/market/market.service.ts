import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MarketCreatedEvent } from 'src/dto/market-created.event';
import { Market, MarketDocument } from './market.model';
import { Model } from 'mongoose';
import { UpdateQuantityRequest } from 'src/dto/update-quantity.dto';

@Injectable()
export class MarketService {
  constructor(
    @InjectModel(Market.name)
    private readonly marketModel: Model<MarketDocument>,
  ) {}

  async handleMarketCreated(body: MarketCreatedEvent) {
    const { name, quantity } = body;
    const market = await this.marketModel.create({ name, quantity });
    if (market) {
      console.log(
        `Market Created with the name of ${market.name} with quanty of ${market.quantity}`,
      );
      return market;
    }
  }

  async getMarkets() {
    return await this.marketModel.find();
  }

  async updateQuantity(body: UpdateQuantityRequest) {
    const { market_id, quantity } = body;
    const findMarket = await this.marketModel.findOne({ _id: market_id });
    findMarket.quantity = findMarket.quantity - quantity;
    const updatedMarket = await findMarket.save();
    console.log(
      `${updatedMarket.name} quantity updated. Current Quantity: ${updatedMarket.quantity}`,
    );
    return updatedMarket;
    // return await this.marketModel.find()[0];
  }
}
