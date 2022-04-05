import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MarketDocument = Market & Document;

@Schema()
export class Market {
  @Prop()
  name: string;

  @Prop()
  quantity: number;
}

export const MarketSchema = SchemaFactory.createForClass(Market);
