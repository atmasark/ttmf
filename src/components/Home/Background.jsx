import React, { useEffect } from "react"
import styled from "styled-components"
import gear from "../../images/gear.png"
import closeUpLeaf from "../../images/close-up-of-leaf.jpg"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const initPixi = PIXI => {
  let renderer = new PIXI.Renderer({
    width: document.getElementById("canvasContainer").offsetWidth,
    height: document.getElementById("canvasContainer").offsetHeight,
    autoResize: true,
    forceFXAA: true,
    powerPreference: "high-performance",
    transparent: true,
  })
  document.getElementById("canvasContainer").appendChild(renderer.view)
  let stage = new PIXI.Container()
  let bgSprite = PIXI.Sprite.from(closeUpLeaf)

  bgSprite.anchor.set(0.5)
  bgSprite.x = document.getElementById("canvasContainer").offsetWidth / 2
  bgSprite.y = document.getElementById("canvasContainer").offsetHeight / 2
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

  const texture = PIXI.Texture.from(gear)
  const parentHeight =
    Math.round(document.getElementById("canvasContainer").offsetHeight / 64) + 1
  const parentWidth =
    Math.round(document.getElementById("canvasContainer").offsetWidth / 64) + 1

  // Create a grid of sprites
  for (let i = 0; i < parentHeight * parentWidth; i++) {
    let sprite = PIXI.Sprite.from(texture)
    sprite.anchor.set(0.5)
    sprite.x = (i % parentWidth) * 64 + 32
    sprite.y = Math.floor(i / parentWidth) * 64 + 32
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
      sprite.alpha = 0.005 + 0.1 * alphaAmount
      scaleCount += 0.0075
      const scaleAmount = Math.sin(scaleCount)
      sprite.scale.x = 0.225 * scaleAmount
      sprite.scale.y = 0.225 * scaleAmount
    })
  }
}
export default () => {
  useEffect(() => {
    // Pixi imported here to prevent
    // Fail while deploying
    const PIXI = require("pixi.js")
    initPixi(PIXI)
  }, [])
  return <Wrapper id={"canvasContainer"}></Wrapper>
}
