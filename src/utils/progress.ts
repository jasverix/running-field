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

/**
 * Progress from min value to max value through steps.
 */
export async function progress ({ min = 0, max, handler, steps = 100, intervalTime = 10 }: ProgressOptions): Promise<void> {
  const valueRange = max - min
  let internalValue = 0
  const step = valueRange / steps

  while (internalValue < valueRange) {
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
