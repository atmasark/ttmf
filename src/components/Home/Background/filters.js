export const setColorFilter = (PIXI, element, ticker) => {
  let hueCounter = Math.round(Math.random() * 360)
  const colorMatrix = new PIXI.filters.ColorMatrixFilter()
  element.filters = [colorMatrix]
  ticker.add(() => {
    hueCounter += 0.1
    if (hueCounter > 360) {
      hueCounter = 0
    }
    colorMatrix.hue(hueCounter)
  })
}

export const setBlurFilter = (PIXI, element, ticker) => {
  const blurFilter1 = new PIXI.filters.BlurFilter()
  element.filters = [blurFilter1]
}
