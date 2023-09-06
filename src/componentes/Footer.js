import React from 'react'
import styled, { css } from "styled-components"
import logo from '../assets/LogoMain.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const FooterContainer = styled.div`
  background-color: #000000;
  font-size: 20px;
  color: white;
  text-align: center;
  border-top: 2px solid #FFC300;
  padding-top: 1rem;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center; 
`

const Logo = styled.img`
    height:3rem;
    margin-left:2%;
    padding-bottom:15px;
    
    ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      margin: 0 auto; 
   ` }
`

const Text = styled.p`
    margin-top: 0.6rem; /* Agrega espacio entre el logo y el texto */
`
const SocialIcons = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
`

const Icon = styled.a`
    margin: 0 0.5rem; /* Agrega espacio entre los iconos */
    font-size: 1.5rem;
    color: white;
    text-decoration: none;
`

function Footer() {
  return (
    <FooterContainer>
            <Logo src={logo} alt="Resident Logo" /> 
            <Text>Desarrollado por Luis Alvarado - 2023</Text>
            <SocialIcons>
                <Icon href="https://github.com/jose-luis-dev" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </Icon>
                <Icon href="https://linkedin.com/in/jose-alvarado-72620220b" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                </Icon>
            </SocialIcons>
        </FooterContainer>
  )
}

export default Footer