import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'; // Agrega esta línea
import { CardActionArea } from '@mui/material';
import styled, { css } from 'styled-components';

const StyledCard = styled(Card)`
  /* Estilos generales para el card */
  height:400px;
  text-align:center;
  
  ${(props) => props.theme.breakpoints.laptop} {
    /* Estilos para laptops */
    max-width: 370px; /* Cambiar el ancho según tus necesidades */
  }

  /* Agregar más estilos para otras resoluciones aquí si es necesario */
`;
export default function ActionAreaCard({ video, categoriaColor, onClick }) {
  return (
    <StyledCard sx={{ border: `2px solid `  }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="140"
          image={video.linkImagenVideo}
          alt={video.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {video.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}

