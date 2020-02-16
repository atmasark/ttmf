import React from "react"
import styled, { keyframes } from "styled-components"
import image from "../images/ttm_logo_rgb.png"

const colorRotate = keyframes`
  100% {
    -webkit-filter: hue-rotate(360deg);
  }
`

const scaleAndSpin = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  45% { transform: scale(1.05) rotate(3deg); }
  55% { transform: scale(1.049) rotate(2.99deg); }
`

const Image = styled.img`
  animation: ${colorRotate} 5s linear infinite,
    ${scaleAndSpin} 20s linear infinite;
  height: 50vh;
`

export default () => <Image src={image} />
