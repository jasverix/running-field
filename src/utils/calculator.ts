interface Position {
  x: number
  y: number
}

function getLongLinePosition (lane: number, top: boolean): number {
  const laneOne = top ? 84 : 601
  const laneSeparator = 11.3
  const laneMultiplier = (lane - 1) * (top ? -1 : 1)

  return laneOne + laneSeparator * laneMultiplier
}

function getFirstSwingPosition (value: number, lane: number): Position {
  const percentageOfSwing = value / 28
  const laneSeparator = 11.3
  const laneMultiplier = (lane - 1)

  const minYValue = getLongLinePosition(lane, true)
  const maxYValue = getLongLinePosition(lane, false)

  const minXValue = 780
  const maxXValue = 1018 + laneSeparator * laneMultiplier

  // somehow, the percentage must go slow from zero to 0.25 and then faster to 0.5 and slower to 0.75 and slower to 1

  // calculate y
  const yProgress = 1 - (maxYValue - minYValue) * percentageOfSwing
  const y = maxYValue + yProgress

  // calculate x
  const xPercentage = Math.abs(percentageOfSwing * 2 - 1)
  const xProgress = (maxXValue - minXValue) * xPercentage
  const x = maxXValue - xProgress

  return { x, y }
}

function getTopLongLinePosition (value: number, lane: number): Position {
  const y = getLongLinePosition(lane, true)
  const startX = 780
  const endX = 290
  const progressValue = (value - 28) / 14
  const length = startX - endX
  const progressX = length * progressValue
  const x = startX - progressX

  return { x, y }
}

export function calculatePosition (value: number, lane: number): Position {
  if (value <= 28) {
    return getFirstSwingPosition(value, lane)
  }
  if (value < 42) {
    return getTopLongLinePosition(value, lane)
  }

  if (value < 50) {
    return { x: 780, y: getLongLinePosition(lane, true) }
  }

  return { x: 0, y: 0 }
}
