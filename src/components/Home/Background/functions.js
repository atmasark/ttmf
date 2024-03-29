import {
  getSpriteInitSettings,
  getSpriteTickerSettings,
  getBackgroundSettings,
  randomizeBgOrder,
} from "./setup"
import resize from "../../../utils/resize"
import getParentSize from "../../../utils/getParentSize"

export const createSprite = (PIXI, i, ticker, patternContainer, type, id) => {
  let counters = {
    scale: 0,
    alpha: 0,
  }
  let init = getSpriteInitSettings(PIXI, i, getParentSize(id))[type]
  let sprite = PIXI.Sprite.from(init.texture)
  sprite.anchor.set(init.anchor)
  sprite.scale.x = init.scale.x
  sprite.scale.y = init.scale.y
  sprite.x = init.x
  sprite.y = init.y
  sprite.blendMode = init.blendMode
  patternContainer.addChild(sprite)
  window.addEventListener("resize", () => {
    if (!sprite._destroyed) sprite.destroy()
  })
  ticker.add(delta => {
    if (!sprite._destroyed) {
      const tickerSettings = getSpriteTickerSettings(i, counters)[type]
      counters.alpha += tickerSettings.counterAddition.alpha
      counters.scale += tickerSettings.counterAddition.scale
      sprite.rotation += tickerSettings.rotation * delta
      sprite.alpha = tickerSettings.alpha
      sprite.scale.x = tickerSettings.scale.x || init.scale.x
      sprite.scale.y = tickerSettings.scale.y || init.scale.y
    }
  })
}

export const createBackground = (
  PIXI,
  bgContainer,
  ticker,
  resources,
  curtain,
  id
) => {
  const bgArray = randomizeBgOrder()
  let currentBgIndex = 0
  let bgSprite = null
  let currentScale = null
  let settings = null
  let closingInProgress = false
  let openingInProgress = false
  let age = 0
  window.addEventListener("resize", () => {
    closingInProgress = true
    bgSprite.x = getParentSize(id).width / 2
    bgSprite.y = getParentSize(id).height / 2
  })
  ticker.add(() => {
    if (closingInProgress && !openingInProgress) {
      if (curtain.alpha < 1) {
        curtain.alpha += 0.01
      } else {
        closingInProgress = false
        openingInProgress = true
        age = 0
        bgSprite.destroy()
        settings = getBackgroundSettings(
          getParentSize(id),
          bgArray[currentBgIndex]
        )
        currentBgIndex++
        if (currentBgIndex >= bgArray.length) currentBgIndex = 0
        bgSprite = PIXI.Sprite.from(resources[settings.texture].texture)
        bgContainer.addChild(bgSprite)
        bgSprite.anchor.set(settings.anchor)
        currentScale = resize(bgSprite, getParentSize(id), PIXI)
        bgSprite.scale = currentScale
        bgSprite.x = settings.x
        bgSprite.y = settings.y
      }
    }
    if (bgSprite) {
      age += settings.scaleAddition
      bgSprite.scale.set(
        (currentScale.x += settings.scaleAddition),
        (currentScale.y += settings.scaleAddition)
      )
    }
    if (
      bgSprite &&
      age >= settings.lifetime &&
      !closingInProgress &&
      !openingInProgress
    ) {
      closingInProgress = true
    }
    if (openingInProgress) {
      if (curtain.alpha > 0) {
        curtain.alpha -= 0.01
      } else {
        openingInProgress = false
      }
    }

    if (!bgSprite) {
      settings = getBackgroundSettings(
        getParentSize(id),
        bgArray[currentBgIndex]
      )
      currentBgIndex++
      if (currentBgIndex >= bgArray.length) currentBgIndex = 0
      bgSprite = PIXI.Sprite.from(resources[settings.texture].texture)
      bgContainer.addChild(bgSprite)
      bgSprite.anchor.set(settings.anchor)
      currentScale = resize(bgSprite, getParentSize(id), PIXI)
      bgSprite.scale = currentScale
      bgSprite.x = settings.x
      bgSprite.y = settings.y
    }
  })
}

export const createCurtain = (PIXI, curtainContainer, id) => {
  let parent = getParentSize(id)
  window.addEventListener("resize", () => {
    parent = getParentSize(id)
    curtain.clear()
    curtain.beginFill(0x000000)
    curtain.drawRect(0, 0, parent.width, parent.height)
    curtain.endFill()
  })

  const curtain = new PIXI.Graphics()
  curtain.beginFill(0x000000)
  curtain.drawRect(0, 0, parent.width, parent.height)
  curtain.endFill()
  curtain.alpha = 0
  curtainContainer.addChild(curtain)
  return curtain
}
