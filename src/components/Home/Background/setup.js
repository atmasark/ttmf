import gear from "../../../images/gear.png"

const defaultBgPosition = parent => ({
  anchor: 0.5,
  x: parent.width / 2,
  y: parent.height / 2,
})

const backgroundSettings = parent => [
  {
    texture: "closeUpLeaf",
    scaleAddition: 0.0001,
    lifetime: 0.8,
    ...defaultBgPosition(parent),
  },
  {
    texture: "moth",
    scaleAddition: 0.00005,
    lifetime: 0.6,
    ...defaultBgPosition(parent),
  },
]

export const getBackgroundSettings = parent =>
  backgroundSettings(parent)[
    Math.floor(Math.random() * backgroundSettings(parent).length)
  ]

export const getAmountOfSprites = parent =>
  (parent.height / 64 + 1) * (parent.width / 64 + 1)

export const getSpriteInitSettings = (PIXI, i, parent) => ({
  default: {
    texture: gear,
    anchor: 0.5,
    scale: {
      x: 0.25,
      y: 0.25,
    },
    x: (i % (Math.round(parent.width / 64) + 1)) * 64 + 32,
    y: Math.floor(i / (Math.round(parent.width / 64) + 1)) * 64 + 32,
    blendMode: PIXI.BLEND_MODES.MULTIPLY,
  },
})

export const getSpriteTickerSettings = (i, counters) => ({
  default: {
    counterAddition: {
      alpha: 0.001,
      scale: 0.001,
    },
    rotation: i % 2 ? 0.01 : -0.01,
    scale: {
      x:
        0.3 * Math.sin(counters.scale) > 0.25 && 0.3 * Math.sin(counters.scale),
      y:
        0.3 * Math.sin(counters.scale) > 0.25 && 0.3 * Math.sin(counters.scale),
    },
    alpha: 0.035 + 0.0055 * Math.sin(counters.alpha),
  },
})
