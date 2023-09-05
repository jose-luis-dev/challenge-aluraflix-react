import React from 'react'
import styled, { css } from "styled-components"
import slider1 from "../assets/Slider/slider1.png"
import BannerText from './BannerText';
import bannerCard from '../assets/thumbnails/bannerCard.png';
import { Link } from 'react-router-dom';
import videoPlayer from './HomeCarrusel/VideoCard/VideoPlayer'
import Button from '../componentes/Button'

import { colorGreyLight, colorBlackDark } from '../ui/colores';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  
  min-width:320px;

  ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      height: 65vh;   
   ` 
   }  
`;


const BannerImage = styled.div`
    position:relative;
    background-image: url(${slider1});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
   
    height: 80vh; 
    ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      height: 65vh;     
   ` }

    
`


const Overlay = styled.div`
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80vh;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index:10;
  

  ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      height: 65vh;     
   ` }
`;

const Titulo = styled.div`
   background-color:#D51919;

   color:white;
   height:6rem; 
   width:20rem;
   display:flex;
   align-items:center;
   justify-content:center;
   font-family: 'Roboto', sans-serif;
   font-size:3rem;
   position:relative;
   ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      display: none;  
   ` }
    



`;
const SubTitulo = styled.div`
  font-family: 'Roboto', sans-serif;
  color:white;
  font-size: 2.5rem;
  margin-top:1.5rem;
  position:relative;
 
  ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
   
      font-size: 2.5rem;
      min-width:320px;
      font-weight:203;
      margin-left:8%;
      bottom: 70%;
      text-align:center;    
   ` }
`;

const TextoBanner = styled.div`
    color:#dac782;
    margin-top: 1rem;
    font-family: 'Roboto', sans-serif;
    font-weight:light;
    font-size: 1.2rem;
    text-align: justify;
    ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      display: none;
   ` }
`

const BannerContent = styled.div`
position:absolute;
height:35vh;
top:35vh;
width:96%;
left: 2%;
z-index:1000;
display:flex;
justify-content:space-between;

${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      top:60%;
      left: 0%;
      position:relative;
      margin:0 auto;
      max-width:320px;
   ` }
`;

const BannerTexContent = styled.div`
    display:flex;
    flex-direction:column;
    max-width:45%;
    height:20vh;
    justify-content:space-between;
    
    ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      height: 20vh;
      min-width:320px; 
   ` }
`;


const BannerCard = styled.img`
  max-height:100%;
  border: 5px solid  #dac782;
 
  ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      display: none;
   ` }
`;


const Banner = () => {
  return (
    <Container>

      <BannerImage>
        <BannerContent>
          <BannerTexContent>
            <Titulo>Raccoonflix</Titulo>
            <SubTitulo>
               Resident Evil Challenge
            </SubTitulo>
            <TextoBanner>
            Supera este desafío en el mundo de Resident Evil. Este challenge es una oportunidad para poner a prueba tus habilidades y aplicar tus conocimientos de React en un entorno temático inspirado en la icónica franquicia de survival horror. Enfréntate a los problemas y demuestra tu destreza mientras exploras el universo de Resident Evil en tu camino hacia la victoria. ¡Adéntrate en la pesadilla y domina React!.
            </TextoBanner>

          </BannerTexContent>
          <BannerCard src={bannerCard} alt="Resident Logo" />
        </BannerContent>
      </BannerImage>
      <Overlay />
    </Container>
  )
}

export default Banner


