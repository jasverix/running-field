import seedrandom, { prng } from 'seedrandom'

export class Random {
  private readonly rng: prng

  public constructor (seed: string) {
    this.rng = seedrandom(seed)
  }

  public random (): number {
    return this.rng()
  }

  public randomInteger (min: number, max: number): number {
    const highestValue = (max - min) + 1
    const calculatedValue = Math.floor(this.random() * highestValue)

    return calculatedValue + min
  }
}
