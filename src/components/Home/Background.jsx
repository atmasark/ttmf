import React, { useEffect } from "react"
import styled from "styled-components"
import getParentSize from "../../utils/getParentSize"
import { getAmountOfSprites } from "./Background/setup"
import { createSprite, createBackground } from "./Background/functions"

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
  let type = "default"
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

  let hueCounter = Math.round(Math.random() * 360)
  const colorMatrix = new PIXI.filters.ColorMatrixFilter()
  stage.filters = [colorMatrix]
  let ticker = new PIXI.Ticker()
  ticker.add(() => {
    renderer.render(stage)
    hueCounter += 0.1
    if (hueCounter > 360) {
      hueCounter = 0
    }
    colorMatrix.hue(hueCounter)
  }, PIXI.UPDATE_PRIORITY.LOW)
  ticker.start()

  createBackground(PIXI, type, parent, stage, ticker)

  // Create a grid of sprites
  for (let i = 0; i < getAmountOfSprites(parent); i++) {
    createSprite(PIXI, i, parent, ticker, stage, type)
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
