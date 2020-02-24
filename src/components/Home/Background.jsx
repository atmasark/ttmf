import React, { useEffect } from "react"
import styled from "styled-components"
import gear from "../../images/gear.png"
import closeUpLeaf from "../../images/close-up-of-leaf.jpg"
import getParentSize from "../../utils/getParentSize"

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
  let hueCounter = 0
  const colorMatrix = new PIXI.filters.ColorMatrixFilter()
  stage.filters = [colorMatrix]
  let ticker = new PIXI.Ticker()
  ticker.add(() => {
    renderer.render(stage)
    bgSprite.scale.set((bgSpriteScale += 0.0001))
  }, PIXI.UPDATE_PRIORITY.LOW)
  ticker.start()

  // Create a grid of sprites
  for (let i = 0; i < (parent.height / 64 + 1) * (parent.width / 64 + 1); i++) {
    let sprite = PIXI.Sprite.from(gear)
    sprite.anchor.set(0.5)
    sprite.scale.x = 0.225
    sprite.scale.y = 0.225
    sprite.x = (i % (parent.width / 64 + 1)) * 64 + 32
    sprite.y = Math.floor(i / (parent.width / 64 + 1)) * 64 + 32
    sprite.blendMode = PIXI.BLEND_MODES.ADD
    stage.addChild(sprite)
    let scaleCount = 0
    let alphaCount = 0
    ticker.add(delta => {
      if (i % 2) sprite.rotation += 0.01 * delta
      else sprite.rotation -= 0.01 * delta

      alphaCount += 0.001
      hueCounter += 0.001
      if (hueCounter > 360) {
        hueCounter = 0
      }
      colorMatrix.hue(hueCounter)
      const alphaAmount = Math.sin(alphaCount)
      sprite.alpha = 0.03 + 0.01 * alphaAmount
      scaleCount += 0.0075
      const scaleAmount = 0.02 * Math.sin(scaleCount)
      if (scaleAmount > 0.225) {
        sprite.scale.x = scaleAmount
        sprite.scale.y = scaleAmount
      }
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
