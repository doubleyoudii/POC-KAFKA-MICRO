export class UpdateQuantityRequest {
  constructor(
    public readonly market_id: string,
    public readonly quantity: number,
  ) {}

  toString() {
    return JSON.stringify({
      market_id: this.market_id,
      quantity: this.quantity,
    });
  }
}
