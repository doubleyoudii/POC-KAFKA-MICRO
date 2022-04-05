export class OrderSetEvent {
  constructor(
    public readonly user_id: string,
    public readonly market_id: string,
    public readonly method: string,
    public readonly quantity: number,
  ) {}
}
