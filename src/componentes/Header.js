import React from 'react';
import { useNavigate  } from 'react-router-dom';
import styled, { css } from "styled-components"
import logo from '../assets/LogoMain.png'
import Button from '../componentes/Button'

const HeaderContainer = styled.div`
    background-color:  #101010;
    font-size: 32px;
    color: white;
    height: 5rem;
    display:flex;
    align-items: center;
    justify-content:space-between;
    min-width:320px;
    border-bottom: 3px solid  #FFC300; 
`
const Logo = styled.img`
    max-height:40%;
    margin-left:2%;

    ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      margin: 0 auto;      
   ` }  
`

const Header = () => {
  const navigate = useNavigate();
  const volverMain = () =>{  
navigate('/');
}

  function handleClick() {
    console.log("nada")
    navigate('/formulariovideos');
  }

  return (
    <HeaderContainer>
      <Logo src={logo} onClick={volverMain} alt="Resident Logo" />
 
      <Button onClick={handleClick}   inputColor="white" borderColor='white' marginR="2%" display='none' fontSize="1rem" btnwidth="8rem" height="3rem"  >
        Nuevo Video
      </Button>
  
    </HeaderContainer>
  )
}

export default Header