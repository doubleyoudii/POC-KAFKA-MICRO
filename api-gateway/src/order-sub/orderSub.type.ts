import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('orderSet')
export class OrderSetType {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field({ nullable: true })
  id?: string;
}
