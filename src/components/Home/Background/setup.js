import gear from "../../../images/gear.png"

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
    blendMode: PIXI.BLEND_MODES.SATURATION,
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
        0.4 * Math.sin(counters.scale) > 0.25 && 0.4 * Math.sin(counters.scale),
      y:
        0.4 * Math.sin(counters.scale) > 0.25 && 0.4 * Math.sin(counters.scale),
    },
    alpha: 0.035 + 0.0055 * Math.sin(counters.alpha),
  },
})
