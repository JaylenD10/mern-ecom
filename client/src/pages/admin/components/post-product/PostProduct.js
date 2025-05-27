import { useEffect, useState } from 'react';
import { getCategories, postProduct } from '../../service/admin';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { ProductionQuantityLimits } from '@mui/icons-material';

const defaultTheme = createTheme();

export default function PostProduct() {
  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    img: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories();
      if (response.status === 200) setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newFormData = new FormData();
      newFormData.append('name', formData.name);
      newFormData.append('description', formData.description);
      newFormData.append('price', formData.price);
      newFormData.append('category', formData.categoryId);
      newFormData.append('img', formData.img);
      const response = await postProduct(newFormData);
      if (response.status === 201) {
        enqueueSnackbar('Product posted successfully!', {
          variant: 'success',
          autoHideDuration: 5000,
        });
        navigate('/admin/dashboard');
      }
    } catch (error) {
      enqueueSnackbar('Error posting product!', {
        variant: 'error',
        autoHideDuration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updateValue = name === 'price' ? parseInt(value, 10) : value;
    setFormdata({
      ...formData,
      [name]: updateValue,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormdata({
      ...formData,
      img: imageFile,
    });
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <ProductionQuantityLimits />
            </Avatar>
            <Typography component="h1" variant="h5">
              Post Product
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                {formData.img && (
                  <Avatar
                    src={URL.createObjectURL(formData.img)}
                    sx={{ width: 100, height: 100, mb: 0 }}
                  />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  fullWidth
                  id="image"
                  sx={{ display: 'none' }}
                />
                <label htmlFor="image">
                  <Button variant="contained" component="span" sx={{ mt: 2 }}>
                    Upload Image
                  </Button>
                </label>
              </Box>
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
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-label">Select Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  name="categoryId"
                >
                  <MenuItem value="">Select Category</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="Enter Price"
                name="price"
                type="number"
                autoComplete="price"
                value={formData.price}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  !formData.name ||
                  !formData.description ||
                  !formData.price ||
                  !formData.categoryId
                }
              >
                {loading ? (
                  <CircularProgress color="success" size={24} />
                ) : (
                  'Post Product '
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
