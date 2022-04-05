export class MarketCreateEvent {
  constructor(public readonly name: string, public readonly quantity: number) {}

  toString() {
    return JSON.stringify({
      name: this.name,
      quantity: this.quantity,
    });
  }
}
