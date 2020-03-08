import {
  getSpriteInitSettings,
  getSpriteTickerSettings,
  getBackgroundSettings,
} from "./setup"
import resize from "../../../utils/resize"

export const createSprite = (
  PIXI,
  i,
  parent,
  ticker,
  patternContainer,
  type
) => {
  let counters = {
    scale: 0,
    alpha: 0,
  }

  let sprite = null
  let init = null
  ticker.add(delta => {
    if (sprite) {
      const tickerSettings = getSpriteTickerSettings(i, counters)[type]
      counters.alpha += tickerSettings.counterAddition.alpha
      counters.scale += tickerSettings.counterAddition.scale
      sprite.rotation += tickerSettings.rotation * delta
      sprite.alpha = tickerSettings.alpha
      sprite.scale.x = tickerSettings.scale.x || init.scale.x
      sprite.scale.y = tickerSettings.scale.y || init.scale.y
    } else {
      init = getSpriteInitSettings(PIXI, i, parent)[type]
      sprite = PIXI.Sprite.from(init.texture)
      sprite.anchor.set(init.anchor)
      sprite.scale.x = init.scale.x
      sprite.scale.y = init.scale.y
      sprite.x = init.x
      sprite.y = init.y
      sprite.blendMode = init.blendMode
      patternContainer.addChild(sprite)
    }
  })
}

export const createBackground = (
  PIXI,
  type,
  parent,
  bgContainer,
  ticker,
  resources,
  curtain
) => {
  let bgSprite = null
  let currentScale = null
  let settings = null
  let closingInProgress = false
  let openingInProgress = false
  ticker.add(() => {
    if (bgSprite) {
      bgSprite.scale.set(
        (currentScale.x += settings.scaleAddition),
        (currentScale.y += settings.scaleAddition)
      )
    }
    if (
      bgSprite &&
      bgSprite.scale.x >= settings.lifetime &&
      !closingInProgress &&
      !openingInProgress
    ) {
      closingInProgress = true
    }
    if (closingInProgress) {
      if (curtain.alpha < 1) {
        curtain.alpha += 0.01
      } else {
        closingInProgress = false
        openingInProgress = true
        bgSprite.destroy()
        settings = getBackgroundSettings(parent, type)
        bgSprite = PIXI.Sprite.from(resources[settings.texture].texture)
        bgContainer.addChild(bgSprite)
        bgSprite.anchor.set(settings.anchor)
        currentScale = resize(bgSprite, parent, PIXI)
        bgSprite.scale = currentScale
        bgSprite.x = settings.x
        bgSprite.y = settings.y
      }
    }
    if (openingInProgress) {
      if (curtain.alpha > 0) {
        curtain.alpha -= 0.01
      } else {
        openingInProgress = false
      }
    }

    if (!bgSprite) {
      settings = getBackgroundSettings(parent, type)
      bgSprite = PIXI.Sprite.from(resources[settings.texture].texture)
      bgContainer.addChild(bgSprite)
      bgSprite.anchor.set(settings.anchor)
      currentScale = resize(bgSprite, parent, PIXI)
      bgSprite.scale = currentScale
      bgSprite.x = settings.x
      bgSprite.y = settings.y
    }
  })
}

export const createCurtain = (PIXI, parent, curtainContainer, ticker) => {
  const curtain = new PIXI.Graphics()

  // Rectangle
  curtain.beginFill(0x000000)
  curtain.drawRect(0, 0, parent.width, parent.height)
  curtain.endFill()
  curtain.alpha = 0
  curtainContainer.addChild(curtain)
  return curtain
}
