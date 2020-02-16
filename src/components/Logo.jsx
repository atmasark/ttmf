import React from "react"
import styled, { keyframes } from "styled-components"
import image from "../images/ttm_logo_rgb.png"

const colorRotate = keyframes`
  100% {
    -webkit-filter: hue-rotate(360deg);
  }
`

const Image = styled.img`
  animation: ${colorRotate} 5s linear infinite;
  max-width: 25%;
`

export default () => <Image src={image} />
