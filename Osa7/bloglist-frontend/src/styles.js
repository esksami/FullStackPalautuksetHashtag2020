import styled from 'styled-components'

import { createGlobalStyle } from "styled-components"


import { Link, NavLink } from 'react-router-dom'


// Create a Title component that'll render an <h1> tag with some styles
export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

export const SecondHeader = styled.h2`
  font-size: 1.3em;
  text-align: center;
  color: palevioletred;
`

export const ThirdHeader = styled.h3`
  font-size: 1.1em;
  text-align: center;
  color: palevioletred;
`

// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.section`
  padding: 0.2em;
  background: papayawhip;
`


export const Navigation = styled.section`
  padding: 0.5em;
  background: papayawhip;
`

export const NavItem = styled(NavLink)`
  color: palevioletred;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;

  &:hover {
    color: rgba(125, 47, 47, 0.4);
  }
  &.active {
    border-color: rgba(125, 47, 47, 0.8);
    border:none;
    border-bottom: 2px solid;
  }
`

export const StyledLink = styled(Link)`
  color: palevioletred;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;

  &:hover {
    color: rgba(125, 47, 47, 0.4);
  }
`

export const Button = styled.button`
  margin: 4px;
  cursor: pointer;
  display:inline-block;
  padding:0.35em 1.2em;
  border: 2px solid #00000047;
  background-color: #80a7a6;
  box-shadow: 
  margin:0 0.3em 0.3em 0;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-weight:300;
  color:#FFFFFF;
  text-align:center;
  transition: all 0.2s;

  &:hover {
    color:#000000;
    background-color:#FFFFFF;
  }
`

// injectGlobal deprecated: https://styled-components.com/docs/faqs#what-do-i-need-to-do-to-migrate-to-v4
export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    background: papayawhip;
    height: 100%;
    width: 100%;
    color: #333;
    font-family: "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica";
    -webkit-font-smoothing: subpixel-antialiased;
  }
`

export const List = styled.ul`
  list-style: none;
  margin: 1.75rem 0;
  padding-left: 1rem;
`

export const ListItem = styled.ul`
  background: white;
  border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
  counter-increment: gradient-counter;
  margin-top: 0.3rem;
  padding: 0.7rem 0.3rem 0.7rem 0.7rem;
  position: relative;
  box-shadow: 1px 1px 2px #0000005c;
`


export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: white;
  border: none;
  border-bottom: 2px solid palevioletred;
`;

export const Form = styled.form`
  top: 200px;
  left: 35%;
  display: block;
  margin-bottom: 80px;
  margin: auto;
  padding: 10px;
  width: 500px;
  height: 360px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  border: 4px solid #867d708c;
`