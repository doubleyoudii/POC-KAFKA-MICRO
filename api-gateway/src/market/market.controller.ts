import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { CreateMarket } from 'src/dtos/create-market.dto';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController implements OnModuleInit {
  constructor(
    private readonly marketService: MarketService,
    @Inject('MARKET_SERVICE') private readonly marketClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.marketClient.subscribeToResponseOf('get_markets');
  }

  @Get()
  getAll() {
    this.marketService.getAll();
  }

  @Post()
  createMarket(@Body() body: CreateMarket) {
    this.marketService.createMarket(body);
  }

  @EventPattern('market_update')
  handleMarketChange() {
    this.marketService.getAll();
  }
}
