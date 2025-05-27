import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  Backdrop,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { CategoryOutlined } from '@mui/icons-material';
import { postCategory } from '../../service/admin';

const defaultTheme = createTheme();

export default function PostCategory() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postCategory(formData);
      if (response.status === 201) {
        enqueueSnackbar('Category posted successfully!', {
          variant: 'success',
          autoHideDuration: 5000,
        });
        navigate('/admin/dashboard');
      }
    } catch (error) {
      enqueueSnackbar('Error posting category!', {
        variant: 'error',
        autoHideDuration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <CategoryOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Post Category
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <TextField
                sx={{ mt: 3 }}
                autoComplete="description"
                name="description"
                required
                fullWidth
                type="text"
                id="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!formData.name || !formData.description}
              >
                {loading ? (
                  <CircularProgress color="success" size={24} />
                ) : (
                  'Post Category '
                )}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </>
  );
}
