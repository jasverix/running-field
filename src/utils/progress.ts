function sleep (milliseconds: number): Promise<any> {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds)
  })
}

interface ProgressOptions {
  min?: number // the minimum value
  max: number // the maximum value
  handler: (value: number) => void // progress handler - called for every step
  steps?: number // amount of steps to take
  intervalTime?: number // how long between each step
}

export class Progresser {
  private readonly options: ProgressOptions
  private running = false
  private stepRunning = false
  constructor (options: ProgressOptions) {
    this.options = options
  }

  async run () {
    const { min = 0, max, handler, steps = 100, intervalTime = 10 } = this.options
    this.running = true

    const valueRange = max - min
    let internalValue = 0
    const step = valueRange / steps

    while (internalValue < valueRange) {
      this.stepRunning = false
      if (!this.running) return

      this.stepRunning = true
      await sleep(intervalTime)
      internalValue += step

      const thisValue = Math.round((internalValue + min) * 100) / 100
      if (thisValue > max) {
        handler(max)
        return
      }
      handler(thisValue)
    }
  }

  async cancel () {
    this.running = false
    while (this.stepRunning) {
      await sleep(1)
    }
  }
}

/**
 * Progress from min value to max value through steps.
 */
export function progress (options: ProgressOptions): Progresser {
  const progresser = new Progresser(options)
  progresser.run()

  return progresser
}
