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
    const w = window.innerWidth
    const h = window.innerHeight

    renderer.view.style.width = w + "px"
    renderer.view.style.height = h + "px"

    stage.position.set(w / 2, h / 2)
    stage.pivot.set(w / 2, h / 2)
  })

  let ticker = new PIXI.Ticker()
  ticker.add(() => {
    renderer.render(stage)
  }, PIXI.UPDATE_PRIORITY.LOW)
  ticker.start()

  setColorFilter(PIXI, stage, ticker)
  setDisplacementFilter(PIXI, bgContainer, ticker, resources)
  setBlurFilter(PIXI, patternContainer, ticker)

  const curtain = createCurtain(PIXI, parent, curtainContainer, ticker)
  createBackground(PIXI, parent, bgContainer, ticker, resources, curtain)

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
    const loader = loadImages(PIXI)
    loader.load((loader, resources) => {
      initPixi(PIXI, getParentSize(id), resources)
    })
  }, [])
  return <Wrapper id={id}></Wrapper>
}
