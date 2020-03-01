/*
 * Resize an element to cover the whole parent
 */
export default (element, parent, PIXI) => {
  let parentRatio = parent.width / parent.height
  let elementRatio = element.width / element.height
  let scale = 1
  if (parentRatio > elementRatio) {
    scale = parent.width / element.width
  } else {
    scale = parent.height / element.height
  }
  return new PIXI.Point(scale, scale)
}
