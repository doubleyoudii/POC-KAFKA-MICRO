import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Market')
export class MarketType {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field()
  _id?: string;

  @Field()
  name?: string;

  @Field()
  quantity?: number;
}
