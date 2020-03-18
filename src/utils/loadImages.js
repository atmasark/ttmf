/*
 * Create a loader, add images and send it back its way
 */
import closeUpLeaf from "../images/close-up-of-leaf.jpg"
import moth from "../images/white-brown-and-orange-moth.jpg"
import displacement from "../images/displacement.jpg"
import moss from "../images/moss.jpg"
import snail from "../images/snail.jpg"
import liverMoss from "../images/liver-moss.jpg"

export default PIXI => {
  const loader = new PIXI.Loader()
  loader.add("closeUpLeaf", closeUpLeaf)
  loader.add("moth", moth)
  loader.add("moss", moss)
  loader.add("snail", snail)
  loader.add("liverMoss", liverMoss)
  loader.add("displacement", displacement)
  return loader
}
