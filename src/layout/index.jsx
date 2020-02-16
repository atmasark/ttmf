import React from "react"
import { ThemeProvider } from "styled-components"
import theme from "../styles/theme"
import "../styles/styles.css"

const Layout = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Layout
