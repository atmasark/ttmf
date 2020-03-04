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
  resources
) => {
  let bgSprite = null
  let currentScale = null
  let settings = null
  ticker.add(() => {
    if (bgSprite && bgSprite.scale.x < settings.lifetime) {
      bgSprite.scale.set(
        (currentScale.x += settings.scaleAddition),
        (currentScale.y += settings.scaleAddition)
      )
    } else {
      settings = getBackgroundSettings(parent, type)
      if (!bgSprite) {
        bgSprite = PIXI.Sprite.from(resources[settings.texture].texture)
        bgContainer.addChild(bgSprite)
      } else {
        bgSprite.texture = resources[settings.texture].texture
      }
      bgSprite.anchor.set(settings.anchor)
      currentScale = resize(bgSprite, parent, PIXI)
      bgSprite.scale = currentScale
      bgSprite.x = settings.x
      bgSprite.y = settings.y
    }
  })
}
