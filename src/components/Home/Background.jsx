import React, { useEffect } from "react"
import styled from "styled-components"
import closeUpLeaf from "../../images/close-up-of-leaf.jpg"
import getParentSize from "../../utils/getParentSize"
import {
  getSpriteInitSettings,
  getSpriteTickerSettings,
  getAmountOfSprites,
} from "./Background/setup"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const initPixi = (PIXI, parent) => {
  let renderer = new PIXI.Renderer({
    width: parent.width,
    height: parent.height,
    autoResize: true,
    forceFXAA: true,
    powerPreference: "high-performance",
    transparent: true,
  })
  document.getElementById("canvasContainer").appendChild(renderer.view)
  let stage = new PIXI.Container()
  let bgSprite = PIXI.Sprite.from(closeUpLeaf)

  bgSprite.anchor.set(0.5)
  bgSprite.x = parent.width / 2
  bgSprite.y = parent.height / 2
  let bgSpriteScale = 0.4
  bgSprite.scale.set(0.4)
  stage.addChild(bgSprite)
  let hueCounter = Math.round(Math.random() * 360)
  const colorMatrix = new PIXI.filters.ColorMatrixFilter()
  stage.filters = [colorMatrix]
  let ticker = new PIXI.Ticker()
  ticker.add(() => {
    renderer.render(stage)
    bgSprite.scale.set((bgSpriteScale += 0.0001))
    hueCounter += 0.1
    if (hueCounter > 360) {
      hueCounter = 0
    }
    colorMatrix.hue(hueCounter)
  }, PIXI.UPDATE_PRIORITY.LOW)
  ticker.start()

  // Create a grid of sprites
  for (let i = 0; i < getAmountOfSprites(parent); i++) {
    let counters = {
      scale: 0,
      alpha: 0,
    }
    const init = getSpriteInitSettings(PIXI, i, parent)["default"]
    let sprite = PIXI.Sprite.from(init.texture)
    sprite.anchor.set(init.anchor)
    sprite.scale.x = init.scale.x
    sprite.scale.y = init.scale.y
    sprite.x = init.x
    sprite.y = init.y
    sprite.blendMode = init.blendMode
    stage.addChild(sprite)
    ticker.add(delta => {
      const tickerSettings = getSpriteTickerSettings(i, counters)["default"]
      counters.alpha += tickerSettings.counterAddition.alpha
      counters.scale += tickerSettings.counterAddition.scale
      sprite.rotation += tickerSettings.rotation * delta
      sprite.alpha = tickerSettings.alpha
      sprite.scale.x = tickerSettings.scale.x || init.scale.x
      sprite.scale.y = tickerSettings.scale.y || init.scale.y
    })
  }
}
export default () => {
  const id = "canvasContainer"
  useEffect(() => {
    // Pixi imported here to prevent
    // Fail while deploying
    const PIXI = require("pixi.js")
    initPixi(PIXI, getParentSize(id))
  }, [])
  return <Wrapper id={id}></Wrapper>
}
