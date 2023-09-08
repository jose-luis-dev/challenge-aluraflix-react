import React, { useState, useContext, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../../Context';

import Fab from '@mui/material/Fab';

const VideoContainer = styled.div`
  width: auto;
  height: 80vh;
  position: relative;
  background-color: #191919;
  padding-top: 1rem;
`;

const StyledPlayer = styled(ReactPlayer)`
  position: relative;
`;

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  height: 60vh;
  margin: 0 20%;

  & .boton {
    align-self: flex-end;
    padding: 0.5rem;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
  & .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  opacity: ${(props) => (props.loading ? 0 : 1)};
  transition: opacity 0.9s ease-in-out;
`;

const VideoPlayer = ({ videoUrl }) => {
  const navigate = useNavigate();
  const { videoToPlay } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

  const volverMain = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleReady = () => {
      setLoading(false);
    };

    const handleError = () => {
      // Manejar errores aquí si es necesario
    };

    // Registra los oyentes de eventos del reproductor
    const player = document.querySelector('.react-player');
    player.addEventListener('ready', handleReady);
    player.addEventListener('error', handleError);

    return () => {
      // Limpia los oyentes de eventos cuando el componente se desmonta
      player.removeEventListener('ready', handleReady);
      player.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    // Almacena videoToPlay en sessionStorage cuando cambia
    sessionStorage.setItem('videoToPlay', videoToPlay);
    setLoading(true); // Establece el estado loading a true cuando cambia videoToPlay
  }, [videoToPlay]);

  useEffect(() => {
    // Recupera videoToPlay de sessionStorage cuando se monta el componente
    const storedVideoToPlay = sessionStorage.getItem('videoToPlay');
    if (storedVideoToPlay) {
      setLoading(false);
    }
  }, []);

  return (
    <VideoContainer>
      <PlayerWrapper loading={loading}>
        <Fab color="error" aria-label="add" className="boton" onClick={volverMain}>
          X
        </Fab>
        <StyledPlayer
          className="react-player"
          url={videoToPlay}
          width="100%"
          height="100%"
        />
      </PlayerWrapper>
    </VideoContainer>
  );
};

export default VideoPlayer;
