import React, { useEffect } from "react"
import styled from "styled-components"
import getParentSize from "../../utils/getParentSize"
import { getAmountOfSprites } from "./Background/setup"
import {
  createSprite,
  createBackground,
  createCurtain,
} from "./Background/functions"
import loadImages from "../../utils/loadImages"
import {
  setColorFilter,
  setDisplacementFilter,
  setBlurFilter,
} from "./Background/filters"

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const initPixi = (PIXI, resources, id) => {
  const parent = getParentSize(id)
  let renderer = new PIXI.Renderer({
    width: parent.width,
    height: parent.height,
    autoDensity: true,
    forceFXAA: true,
    powerPreference: "high-performance",
    transparent: true,
  })
  document.getElementById("canvasContainer").appendChild(renderer.view)
  let stage = new PIXI.Container()
  let patternContainer = new PIXI.Container()
  let bgContainer = new PIXI.Container()
  let curtainContainer = new PIXI.Container()
  stage.addChild(bgContainer)
  stage.addChild(patternContainer)
  stage.addChild(curtainContainer)

  window.addEventListener("resize", () => {
    const { width, height } = getParentSize(id)
    renderer.resize(width, height)

    stage.position.set(width / 2, height / 2)
    stage.pivot.set(width / 2, height / 2)
  })

  let ticker = new PIXI.Ticker()
  ticker.add(() => {
    renderer.render(stage)
  }, PIXI.UPDATE_PRIORITY.LOW)
  ticker.start()

  setColorFilter(PIXI, stage, ticker)
  setDisplacementFilter(PIXI, bgContainer, ticker, resources)
  setBlurFilter(PIXI, patternContainer, ticker)

  const curtain = createCurtain(PIXI, curtainContainer, id)
  createBackground(PIXI, bgContainer, ticker, resources, curtain, id)

  // // Create a grid of sprites
  // for (let i = 0; i < getAmountOfSprites(parent); i++) {
  //   createSprite(PIXI, i, parent, ticker, patternContainer, type)
  // }
}
export default () => {
  const id = "canvasContainer"
  useEffect(() => {
    // Pixi imported here to prevent
    // Fail while deploying
    const PIXI = require("pixi.js")
    const loader = loadImages(PIXI)
    loader.load((loader, resources) => {
      initPixi(PIXI, resources, id)
    })
  }, [])
  return <Wrapper id={id}></Wrapper>
}
