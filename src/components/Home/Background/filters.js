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

export const setDisplacementFilter = (PIXI, element, ticker, resources) => {
  const displacementSprite = PIXI.Sprite.from(resources["displacement"].texture)
  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
  const displacementFilter = new PIXI.filters.DisplacementFilter(
    displacementSprite
  )
  element.addChild(displacementSprite)
  element.filters = [displacementFilter]
  ticker.add(() => {
    displacementSprite.x += 1
    displacementSprite.y += 1
    if (displacementSprite.x > displacementSprite.width) {
      displacementSprite.x = 0
    }
    if (displacementSprite.y > displacementSprite.height) {
      displacementSprite.y = 0
    }
  })
}

export const setBlurFilter = (PIXI, element, ticker) => {
  const blurFilter = new PIXI.filters.BlurFilter()
  element.filters = [blurFilter]
  let blurCount = 0
  ticker.add(() => {
    blurCount += 0.005
    blurFilter.blur = 10 + 5 * Math.cos(blurCount)
  })
}
