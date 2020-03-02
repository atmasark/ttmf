import React, { useEffect } from "react"
import styled from "styled-components"
import getParentSize from "../../utils/getParentSize"
import { getAmountOfSprites } from "./Background/setup"
import { createSprite, createBackground } from "./Background/functions"
import closeUpLeaf from "../../images/close-up-of-leaf.jpg"
import moth from "../../images/white-brown-and-orange-moth.jpg"
import displacement from "../../images/displacement.jpg"
import {
  setColorFilter,
  setDisplacementFilter,
  setBlurFilter,
} from "./Background/filters"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const initPixi = (PIXI, parent, resources) => {
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
  let patternContainer = new PIXI.Container()
  let bgContainer = new PIXI.Container()
  stage.addChild(bgContainer)
  stage.addChild(patternContainer)

  let ticker = new PIXI.Ticker()
  ticker.add(() => {
    renderer.render(stage)
  }, PIXI.UPDATE_PRIORITY.LOW)
  ticker.start()

  setColorFilter(PIXI, stage, ticker)
  setDisplacementFilter(PIXI, bgContainer, ticker, resources)
  setBlurFilter(PIXI, patternContainer, ticker)

  createBackground(PIXI, type, parent, bgContainer, ticker, resources)

  // Create a grid of sprites
  for (let i = 0; i < getAmountOfSprites(parent); i++) {
    createSprite(PIXI, i, parent, ticker, patternContainer, type)
  }
}
export default () => {
  const id = "canvasContainer"
  useEffect(() => {
    // Pixi imported here to prevent
    // Fail while deploying
    const PIXI = require("pixi.js")
    const loader = new PIXI.Loader()
    loader.add("closeUpLeaf", closeUpLeaf)
    loader.add("moth", moth)
    loader.add("displacement", displacement)
    loader.load((loader, resources) => {
      initPixi(PIXI, getParentSize(id), resources)
    })
  }, [])
  return <Wrapper id={id}></Wrapper>
}
