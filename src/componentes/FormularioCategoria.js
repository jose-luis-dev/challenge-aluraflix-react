import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { useForm, Controller } from 'react-hook-form'; // Aquí está la única importación de 'useForm'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useSnackbar } from 'notistack';





export default function FormularioCategoria() {
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [categorias, setCategorias] = useState([]);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [color, setColor] = useState('#563d7c'); // Valor inicial del color
  const { enqueueSnackbar } = useSnackbar();


  const [isEditing, setIsEditing] = useState(false);
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(true);


  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('https://my-json-server.typicode.com/jose-luis-dev/challenge-aluraflix-react/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  const onSubmit = async (formData) => {
    console.log('Datos a enviar:', formData);
    try {
      if (editingCategoria) {
        // Si se está editando, actualiza la categoría existente
        const updatedCategoria = {
          ...editingCategoria, // Copia todos los campos de la categoría existente
          categoriaNombre: formData.categoriaNombre,
          categoriaTexto: formData.categoriaTexto,
          categoriaColor: formData.categoriaColor,
        };
  
        await axios.put(`https://my-json-server.typicode.com/jose-luis-dev/challenge-aluraflix-react/categorias/${editingCategoria.id}`, updatedCategoria);
        enqueueSnackbar('Categoria actualizada correctamente', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
  
        // Deshabilita el botón "Actualizar" después de la actualización
        setIsUpdateButtonDisabled(true);
      } else {
        // Si no se está editando, crea una nueva categoría
        const nuevaCategoriaId = uuidv4();
        const nuevaCategoria = {
          id: nuevaCategoriaId,
          categoriaNombre: formData.categoriaNombre,
          categoriaTexto: formData.categoriaTexto,
          categoriaColor: formData.categoriaColor,
        };
  
        await axios.post('https://my-json-server.typicode.com/jose-luis-dev/challenge-aluraflix-react/categorias', nuevaCategoria);
        enqueueSnackbar('Categoria agregada correctamente', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
  
      // Limpia el formulario y actualiza la lista de categorías
      reset();
      setEditingCategoria(null);
      fetchCategorias();
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
      enqueueSnackbar('Hubo un problema y la categoría no pudo ser guardada', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };
  
  

  const eliminarCategoria = async (id) => {
    try {
      await axios.delete(`https://my-json-server.typicode.com/jose-luis-dev/challenge-aluraflix-react/categorias/${id}`);
      // Actualiza la lista de categorías después de eliminar
      fetchCategorias();
    } catch (error) {
      console.error('Error en la solicitud HTTP:', error);
    }
  };

  const editarCategoria = (categoria) => {
    // Establece los valores del formulario con la categoría seleccionada
    setValue('categoriaNombre', categoria.categoriaNombre);
    setValue('categoriaTexto', categoria.categoriaTexto);
    setValue('categoriaColor', categoria.categoriaColor || color); // Asegura que el color esté incluido
    setEditingCategoria(categoria);

      // Habilita el estado de edición y deshabilita el botón "Crear Categoría"
    setIsEditing(true);
    setIsUpdateButtonDisabled(false);

  };
  
    // Función para manejar cambios en el color
    const handleColorChange = (event) => {
      setColor(event.target.value);
    };
  
    const resetForm = () => {
      reset(); // Esta función resetea los valores del formulario
    
      // Restablece los estados a sus valores iniciales
      setIsEditing(false);
      setIsUpdateButtonDisabled(true);
    };
    

  return (
    <Box>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" marginTop={5} gutterBottom>
          Nueva Categoría
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="categoriaNombre"
            control={control}
            defaultValue={editingCategoria ? editingCategoria.categoriaNombre : ''}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ backgroundColor: ' #f6f6f6' }}
                variant="outlined"
                fullWidth
                margin="normal"
                label="Nombre"
                error={!!errors.categoriaNombre}
              />
            )}
          />
          <Controller
            name="categoriaTexto"
            control={control}
            defaultValue={editingCategoria ? editingCategoria.categoriaTexto : ''}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ backgroundColor: ' #f6f6f6'}}
                variant="outlined"
                fullWidth
                margin="normal"
                label="Descripción"
                multiline
                rows={5}
                error={!!errors.categoriaTexto}
              />
            )}
          />        
          <Controller
            name="categoriaColor"
            control={control}
            defaultValue={editingCategoria ? editingCategoria.categoriaColor || color : color}
            render={({ field }) => (
              <div>
                <label htmlFor="colorPicker">Elige el color para la categoría: </label>
                <input
                  type="color"
                  id="colorPicker"
                  value={field.value}
                  title="Choose your color"
                  onChange={(e) => {
                    field.onChange(e);
                    handleColorChange(e); // Asegúrate de llamar a handleColorChange aquí si es necesario
                  }}
                  style={{ width: '5%', margin: '2px', display:'flex' }}
                />
              </div>
            )}
          />
          {/* Otros campos de formulario aquí */}
          <ButtonGroup
            variant="outlined"
            size="large"
            // aria-label="small button group"
            orientation="vertical"
            aria-label="vertical outlined button group"
            sx={{
              // display: 'flex', // Aplica display flex
              // justifyContent: 'space-around', // Espacia los botones horizontalmente
              // marginTop: '18px', // Agrega margen superior
            }}
          >
      <Button variant="contained" color="success" style={{ marginTop: '8px' }} onClick={handleSubmit(onSubmit)} disabled={isEditing}>
        Crear Categoría
      </Button>
      <Button variant="contained" color="primary" style={{ marginTop: '8px' }} onClick={onSubmit} disabled={isUpdateButtonDisabled}>
        Actualizar
      </Button>
      <Button variant="contained" color="secondary" style={{ marginTop: '8px' }}onClick={resetForm}>
        Limpiar
      </Button>
          </ButtonGroup>
        </form>
      </Container>

      <Container maxWidth="md">
        <TableContainer component={Paper} sx={{ marginTop: '4rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categorias.map((categoria) => (
                <TableRow key={categoria.id}>
                  <TableCell>{categoria.categoriaNombre}</TableCell>
                  <TableCell>{categoria.categoriaTexto}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => editarCategoria(categoria)}>
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="secondary" onClick={() => eliminarCategoria(categoria.id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

