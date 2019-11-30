export interface Position {
  x: number
  y: number
}

function getLongLinePosition (lane: number, top: boolean): number {
  const laneOne = top ? 84 : 601
  const laneSeparator = 11.3
  const laneMultiplier = (lane - 1) * (top ? -1 : 1)

  return laneOne + laneSeparator * laneMultiplier
}

function getSwingPercentage (value: number, invert: boolean): { xPercentage: number, yPercentage: number } {
  let percentageOfSwing = value / 28

  let yPercentage = percentageOfSwing
  let xPercentage = Math.abs(percentageOfSwing * 2 - 1)
  if (percentageOfSwing < 0.5) {
    yPercentage *= (yPercentage * 2)
    yPercentage += (yPercentage / 7)

    xPercentage *= (xPercentage)
    xPercentage -= 0.01
  } else {
    yPercentage *= ((1 - yPercentage / 1.6) + 0.9)
    yPercentage -= 0.25
    yPercentage -= yPercentage / 35

    xPercentage *= xPercentage
    xPercentage -= xPercentage / 5
  }

  if (invert) {
    xPercentage = 1 - xPercentage
  }

  return { xPercentage, yPercentage }
}

function getFirstSwingPosition (value: number, lane: number): Position {
  const laneSeparator = 11.3
  const laneMultiplier = (lane - 1)

  const minYValue = getLongLinePosition(lane, true)
  const maxYValue = getLongLinePosition(lane, false)

  const minXValue = 780
  const maxXValue = 1018 + laneSeparator * laneMultiplier

  const { xPercentage, yPercentage } = getSwingPercentage(value, false)

  const yProgress = 1 - (maxYValue - minYValue) * yPercentage
  const xProgress = (maxXValue - minXValue) * xPercentage

  const y = maxYValue + yProgress
  const x = maxXValue - xProgress

  return { x, y }
}

function getSecondSwingPosition (value: number, lane: number): Position {
  const swingValue = value - 42

  const laneSeparator = 11.3
  const laneMultiplier = (lane - 1)

  const minYValue = getLongLinePosition(lane, false)
  const maxYValue = getLongLinePosition(lane, true)

  const minXValue = 86 + laneSeparator * laneMultiplier
  const maxXValue = 310

  const { xPercentage, yPercentage } = getSwingPercentage(swingValue, true)

  const yProgress = 1 - (maxYValue - minYValue) * yPercentage
  const xProgress = (maxXValue - minXValue) * xPercentage

  const y = maxYValue + yProgress
  const x = maxXValue - xProgress

  return { x, y }
}

function getTopLongLinePosition (value: number, lane: number): Position {
  const y = getLongLinePosition(lane, true)
  const startX = 830
  const endX = 300
  const progressValue = (value - 28) / 14
  const length = startX - endX
  const progressX = length * progressValue
  const x = startX - progressX

  return { x, y }
}

function getBottomLinePosition (value: number, lane: number): Position {
  const y = getLongLinePosition(lane, false)
  const startX = 270
  const endX = 1050
  const progressValue = (value - 70) / 30
  const length = endX - startX
  const progressX = length * progressValue
  const x = startX + progressX

  return { x, y }
}

export function calculatePosition (value: number, lane: number): Position {
  if (value <= 28) {
    return getFirstSwingPosition(value, lane)
  }
  if (value < 42) {
    return getTopLongLinePosition(value, lane)
  }
  if (value <= 70) {
    return getSecondSwingPosition(value, lane)
  }
  if (value <= 100) {
    return getBottomLinePosition(value, lane)
  }

  return { x: -10, y: -10 }
}
