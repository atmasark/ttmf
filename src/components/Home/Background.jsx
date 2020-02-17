import React from "react"
import styled from "styled-components"
import Gear from "./Background/Gear"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
`

export default () => {
  return (
    <Wrapper>
      {[...Array(Math.round(window.innerHeight / 64) - 2)].map((e, i) => (
        <Row>
          {[...Array(Math.round(window.innerWidth / 64))].map((e, i) => (
            <Gear />
          ))}
        </Row>
      ))}
    </Wrapper>
  )
}
