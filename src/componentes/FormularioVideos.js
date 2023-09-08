import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const FormularioVideos = () => {
  // Estado para las categorías disponibles
  const [categorias, setCategorias] = useState([]);

  // Función para cargar las categorías disponibles utilizando Axios
  const fetchCategorias = async () => {
    try {
      const response = await axios.get('https://my-json-server.typicode.com/jose-luis-dev/challenge-aluraflix-react/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  useEffect(() => {
    // Carga las categorías disponibles cuando se monta el componente
    fetchCategorias();
  }, []);
  
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    titulo: '',
    linkVideo: '',
    categoria:  '', // Establece la primera categoría por defecto
    descripcion: '',
    codigoSeguridad: '',
    linkImagenVideo: '', 
    // Agrega otros campos aquí si es necesario
  });

  // Estado para la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Función para manejar la selección de una imagen
  const handleImageChange = (event) => {
  const file = event.target.files[0];
  setSelectedImage(file);
  };

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para limpiar el formulario y la imagen seleccionada
  const handleClear = () => {
    setFormData({
      titulo: '',
      linkVideo: '',
      categoria: '',
      descripcion: '',
      codigoSeguridad: '',
    });
    setSelectedImage(null);
  };

    // Obtén la función de navegación
    const navigate = useNavigate();

// Función para manejar el envío del formulario
const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    // Crea un objeto con los datos del formulario y la imagen seleccionada
    const videoData = {
      id: uuidv4(),
      titulo: formData.titulo,
      linkVideo: formData.linkVideo,
      categoria: formData.categoria,
      descripcion: formData.descripcion,
      codigoSeguridad: formData.codigoSeguridad,
      linkImagenVideo: formData.linkImagenVideo,
      // Agrega otros campos aquí si es necesario
    };
     // Agrega un console.log para verificar los datos del video antes de enviarlos al servidor
     console.log('Datos del video a enviar:', videoData);
    // Realiza una solicitud POST al servidor para agregar el nuevo video
    const response = await fetch('https://my-json-server.typicode.com/jose-luis-dev/challenge-aluraflix-react/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(videoData),
    });

      // Verifica si la solicitud fue exitosa (código de estado 201)
      if (response.status === 201) {
        // El video se ha agregado correctamente, puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
        alert('Video agregado con éxito');
        // Redirige al usuario a la página principal u otra página según tus necesidades
        navigate('/'); // Reemplaza '/' con la URL a la que deseas redirigir
      } else {
        // Si la solicitud no fue exitosa, muestra un mensaje de error
        console.error('Error al agregar el video:', response.statusText);
        console.log('Código de estado de la respuesta:', response.status);
      }
  } catch (error) {
    console.error('Error al agregar el video:', error);
    
  }
};




  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" marginTop={5}>
              Nuevo video
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Link del video"
              name="linkVideo"
              value={formData.linkVideo}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="linkImagenVideo"
              label="Enlace de la imagen del video (URL)"
              fullWidth
              value={formData.linkImagenVideo}
              onChange={handleInputChange}
              // Otros atributos o propiedades que necesites
            />
          </Grid>
          <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="categoria-label">Escoja una categoría</InputLabel>
            <Select
              labelId="categoria-label"
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="Escoja una categoría" disabled>
                Escoja una categoría
              </MenuItem>
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.categoriaNombre}>
                  {categoria.categoriaNombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Código de seguridad"
              name="codigoSeguridad"
              value={formData.codigoSeguridad}
              onChange={handleInputChange}
              required
            />
          </Grid>
        </Grid>
        <ButtonGroup  
          variant="outlined"
          size="large"
          // aria-label="small button group"
          orientation="vertical"
          aria-label="vertical outlined button group"
        >
      <Button variant="contained" color="success" style={{ marginTop: '8px' }}onClick={handleSubmit}>
        Agregar Video
      </Button>
      <Link to="/formularioCategoria" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" style={{ marginTop: '8px' }}>
          Crear Nueva Categoria
        </Button>   
      </Link>
      <Button variant="contained" color="secondary" style={{ margin: '8px 0px 9px' }} onClick={handleClear}>
        Limpiar
      </Button>
        </ButtonGroup>
      </form>
    </Container>
  );
};

export default FormularioVideos;
