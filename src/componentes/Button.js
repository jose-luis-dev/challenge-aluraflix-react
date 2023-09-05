import React from 'react'
import styled , {css}from "styled-components"

const Button = styled.button`
display: inline-block;
color: ${props => props.inputColor };
background-color: ${props => props.backgroundColor || "transparent"};
width: ${props => props.btnwidth || 'auto'};
height: ${props => props.height || 'auto'};
font-size:${props=> props.fontSize};
font-family: 'Source Sans Pro', sans-serif;
margin-right: ${props => props.marginR  || '0'};
margin-left: ${props=>props.ml || '0'};
border: 2px solid #df3616;
border-radius: 4px;
display: block;


`;

export default Button

/* ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {

   ` } */