export class UpdateQuantityRequest {
  constructor(
    public readonly market_id: string,
    public readonly quantity: number,
  ) {}
}
