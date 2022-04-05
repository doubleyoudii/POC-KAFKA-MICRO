import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @EventPattern('market_created')
  handleMarketCreation(data: any) {
    this.marketService.handleMarketCreated(data.value);
  }

  @MessagePattern('get_markets')
  getMarkets() {
    return this.marketService.getMarkets();
  }

  @MessagePattern('update_quantity')
  getUser(data: any) {
    return this.marketService.updateQuantity(data.value);
  }
}
