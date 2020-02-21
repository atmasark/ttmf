import React from "react"
import styled from "styled-components"

import Background from "./Home/Background"
import Content from "./Home/Content"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #0f0f0f;
`

export default () => {
  return (
    <Wrapper>
      <Background />
      <Content />
    </Wrapper>
  )
}
