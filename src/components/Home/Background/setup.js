import gear from "../../../images/gear.png"

export const getSpriteSettings = (PIXI, i, parent) => ({
  init: {
    amountOfObjects: (parent.height / 64 + 1) * (parent.width / 64 + 1),
    texture: gear,
    anchor: 0.5,
    scale: {
      x: 0.225,
      y: 0.225,
    },
    x: (i % (parent.width / 64 + 1)) * 64 + 32,
    y: Math.floor(i / (parent.width / 64 + 1)) * 64 + 32,
    blendMode: PIXI.BLEND_MODES.ADD,
  },
})
