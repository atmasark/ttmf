import { css } from "styled-components"

const sizes = {
  xl: 1366,
  lg: 1024,
  md: 768,
  sm: 480,
}

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16
  accumulator[label] = (first, ...interpolations) => css`
    @media (max-width: ${emSize}em) {
      ${css(first, ...interpolations)}
    }
  `
  return accumulator
}, {})
