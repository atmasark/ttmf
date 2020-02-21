import React, { useEffect } from "react"
import * as PIXI from "pixi.js"
import styled from "styled-components"
import gear from "../../images/gear.png"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const initPixi = () => {
  let renderer = new PIXI.Renderer({
    width: document.getElementById("canvasContainer").offsetWidth,
    height: document.getElementById("canvasContainer").offsetHeight,
    autoResize: true,
    resolution: devicePixelRatio,
    forceFXAA: true,
    powerPreference: "high-performance",
    backgroundColor: 0x1099bb,
  })
  document.getElementById("canvasContainer").appendChild(renderer.view)

  let stage = new PIXI.Container()

  let ticker = new PIXI.Ticker()
  ticker.add(() => {
    renderer.render(stage)
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
    sprite.scale.x = 0.125
    sprite.scale.y = 0.125
    sprite.x = (i % parentWidth) * 64 + 32
    sprite.y = Math.floor(i / parentWidth) * 64 + 32
    stage.addChild(sprite)
    ticker.add(delta => {
      sprite.rotation += 0.01 * delta
    })
  }
}
export default () => {
  useEffect(() => {
    initPixi()
  }, [])
  return <Wrapper id={"canvasContainer"}></Wrapper>
}
