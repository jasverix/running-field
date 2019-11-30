function sleep (milliseconds: number): Promise<any> {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds)
  })
}

interface ProgressOptions {
  min?: number
  max: number
  handler: (value: number) => void
  steps?: number
  intervalTime?: number
}

export async function progress ({ min = 0, max, handler, steps = 100, intervalTime = 10 }: ProgressOptions): Promise<void> {
  const valueRange = max - min
  let internalValue = 0
  const step = valueRange / steps

  while (internalValue <= valueRange) {
    await sleep(intervalTime)
    internalValue += step
    handler(internalValue + min)
  }
}
