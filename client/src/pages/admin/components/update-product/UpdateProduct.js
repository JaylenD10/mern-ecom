import { useEffect, useState } from 'react';
import {
  getCategories,
  getProductByID,
  updateProduct,
} from '../../service/admin';
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
  ButtonBase,
  Grid,
  styled,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { ProductionQuantityLimits } from '@mui/icons-material';

const defaultTheme = createTheme();

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  height: '250px',
  objectFit: 'cover',
});

export default function UpdateProduct() {
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
  const { id } = useParams();
  const [isUploaded, setIsUploaded] = useState(false);
  const [newImagePreview, setNewPreview] = useState(null);

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

  const fetchProductById = async () => {
    setLoading(true);
    try {
      const response = await getProductByID(id);
      if (response.status === 200) {
        const productData = response.data;
        console.log(response.data);
        setFormdata({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          categoryId: productData.category_id,
          img: productData.img,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProductById();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newFormData = new FormData();
      newFormData.append('name', formData.name);
      newFormData.append('description', formData.description);
      newFormData.append('price', formData.price);
      newFormData.append('category', formData.categoryId);
      if (isUploaded) newFormData.append('img', formData.img);

      const response = await updateProduct(id, newFormData);
      if (response.status === 200) {
        enqueueSnackbar('Product updated successfully!', {
          variant: 'success',
          autoHideDuration: 5000,
        });
        navigate('/admin/dashboard');
      }
    } catch (error) {
      enqueueSnackbar('Error updating product!', {
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

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormdata({
      ...formData,
      categoryId: value,
    });
  };

  const handleImageChange = (e) => {
    setIsUploaded(true);
    const imageFile = e.target.files[0];
    setNewPreview(imageFile);
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
              Update Product
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
                {formData.img && newImagePreview ? (
                  <Avatar
                    src={URL.createObjectURL(newImagePreview)}
                    sx={{ width: 100, height: 100, mb: 0 }}
                  />
                ) : formData.img ? (
                  <Grid>
                    <ButtonBase sx={{ width: 135, height: 80 }}>
                      <Img
                        alt="complex"
                        src={`data:image/jpeg;base64,${formData.img}`}
                      />
                    </ButtonBase>
                  </Grid>
                ) : null}
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
                  onChange={handleCategoryChange}
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
                  'Update Product'
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
