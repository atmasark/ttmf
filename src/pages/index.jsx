import React from "react"
import styled from "styled-components"
import Layout from "../layout/index"
import Home from "../components/Home"
import SEO from "../components/seo"

const Wrapper = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
`

const IndexPage = () => {
  if (typeof window !== "undefined") {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    })
  }

  return (
    <Layout>
      <Wrapper>
        <SEO title="Home" />
        <Home />
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
