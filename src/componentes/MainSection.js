import React , { useState, useEffect }  from 'react'
import Slider from './HomeCarrusel/Slider/Slider'
import Banner from '../componentes/Banner'
import styled , {css} from "styled-components";
import CategoriaVideos from './CardContenido/CategoriaVideos';




const MainSectionContainer = styled.div`
    background-color: #191919;
    padding:2rem;
    ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      padding-top:1.5rem;    
   ` }
`
function MainSection({ categorias, videos }) {
  console.log(videos);
  console.log(categorias);

  return (
    <>
      <Banner />
      <MainSectionContainer>
      
        <Slider videos={videos} categorias={categorias} />
        <CategoriaVideos videos={videos} categorias={categorias} />)
        </MainSectionContainer>
    </>
  );
}

export default MainSection;
