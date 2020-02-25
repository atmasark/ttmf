import { getSpriteInitSettings, getSpriteTickerSettings } from "./setup"

export const createSprite = (PIXI, i, parent, ticker, stage, type) => {
  let counters = {
    scale: 0,
    alpha: 0,
  }
  const init = getSpriteInitSettings(PIXI, i, parent)[type]
  let sprite = PIXI.Sprite.from(init.texture)
  sprite.anchor.set(init.anchor)
  sprite.scale.x = init.scale.x
  sprite.scale.y = init.scale.y
  sprite.x = init.x
  sprite.y = init.y
  sprite.blendMode = init.blendMode
  stage.addChild(sprite)
  ticker.add(delta => {
    const tickerSettings = getSpriteTickerSettings(i, counters)[type]
    counters.alpha += tickerSettings.counterAddition.alpha
    counters.scale += tickerSettings.counterAddition.scale
    sprite.rotation += tickerSettings.rotation * delta
    sprite.alpha = tickerSettings.alpha
    sprite.scale.x = tickerSettings.scale.x || init.scale.x
    sprite.scale.y = tickerSettings.scale.y || init.scale.y
  })
}
