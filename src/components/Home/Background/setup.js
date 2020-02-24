import gear from "../../../images/gear.png"

export const getAmountOfSprites = parent =>
  (parent.height / 64 + 1) * (parent.width / 64 + 1)

export const getSpriteInitSettings = (PIXI, i, parent) => ({
  default: {
    texture: gear,
    anchor: 0.5,
    scale: {
      x: 0.23,
      y: 0.23,
    },
    x: (i % (Math.round(parent.width / 64) + 1)) * 64 + 32,
    y: Math.floor(i / (Math.round(parent.width / 64) + 1)) * 64 + 32,
    blendMode: PIXI.BLEND_MODES.ADD,
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
        0.35 * Math.sin(counters.scale) > 0.23 &&
        0.35 * Math.sin(counters.scale),
      y:
        0.35 * Math.sin(counters.scale) > 0.23 &&
        0.35 * Math.sin(counters.scale),
    },
    alpha: 0.025 + 0.0075 * Math.sin(counters.alpha),
  },
})
