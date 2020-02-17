import React from "react"
import styled, { keyframes } from "styled-components"
import image from "../../images/ttm_logo_rgb.png"

const colorRotate = keyframes`
  100% {
    -webkit-filter: hue-rotate(360deg);
  }
  `

const scaleAndSpin = randDeg => keyframes`
  0% { transform: scale(1) rotate(0deg); }
  45% { transform: scale(1.1) rotate(${randDeg}deg); }
  `

const randomizeDeg = () => (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5

const Image = styled.img`
  animation: ${colorRotate} 5s linear infinite,
    ${scaleAndSpin(randomizeDeg())} 20s ease-in-out infinite;
  height: 50vh;
`

export default () => <Image src={image} />
