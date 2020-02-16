import React from "react"
import styled from "styled-components"

import Logo from "./Logo"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0f0f0f;
`

export default () => {
  return (
    <Wrapper>
      <Logo />
    </Wrapper>
  )
}
