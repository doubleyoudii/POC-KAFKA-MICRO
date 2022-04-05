export class MarketCreatedEvent {
  constructor(public readonly name: string, public readonly quantity: number) {}
}
