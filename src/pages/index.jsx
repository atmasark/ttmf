import React from "react"
import styled from "styled-components"
import Layout from "../layout/index"
import Home from "../components/Home"
import SEO from "../components/seo"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const IndexPage = () => {
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
