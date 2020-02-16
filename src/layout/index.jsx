import React from "react"
import styled, { ThemeProvider } from "styled-components"
import theme from "../styles/theme"
import "../styles/styles.css"

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Wrapper>
  )
}

export default Layout
