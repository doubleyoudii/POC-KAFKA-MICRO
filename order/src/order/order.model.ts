import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  user_id: string;

  @Prop()
  method: string;

  @Prop()
  quantity: number;

  @Prop()
  market_id: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
