import { useEffect, useState } from 'react';
import {
  addProductToCart,
  getProducts,
  searchProduct,
} from '../../service/customer';
import {
  Backdrop,
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  Typography,
  styled,
  Paper,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { AddShoppingCart, Preview } from '@mui/icons-material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  height: '250px',
  objectFit: 'cover',
});

export default function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      if (response.status === 200) setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchProduct = async (e) => {
    setLoading(true);
    const keyword = e.target.value;
    setKeyword(keyword);
    try {
      const response = await searchProduct(keyword);
      if (response.status === 200) setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePostProductToCart = async (productId) => {
    setLoading(true);
    try {
      const response = await addProductToCart(productId);
      if (response.status === 201) {
        enqueueSnackbar('Product added to cart successfully!', {
          variant: 'success',
          autoHideDuration: 5000,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 409)
        enqueueSnackbar('Product already exists in cart!', {
          variant: 'error',
          autoHideDuration: 5000,
        });
      else
        enqueueSnackbar('Getting error while adding product to cart!', {
          variant: 'error',
          autoHideDuration: 5000,
        });
    } finally {
      setLoading(false);
    }
  };
  const handleViewClick = async (productId) => {
    navigate(`/customer/view-product-details/${productId}`);
  };

  return (
    <>
      <Grid
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
          }}
        >
          <InputBase
            sx={{ m1: 1, flex: 1 }}
            placeholder="Enter keyword to search products"
            inputProps={{ 'aira-label': 'Enter keyword to search products' }}
            value={keyword}
            onChange={handleSearchProduct}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Box sx={{ width: '100%', mt: 3 }}>
        <Grid container rowSpacing={1} columnSpacing={{ sm: 2, md: 3 }}>
          {products.map((product) => (
            <Grid key={product._id}>
              <Card
                sx={{
                  p: 2,
                  pargin: 'auto',
                  flexGrow: 1,
                  maxWidth: 300,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <Img
                  alt="complex"
                  src={`data:image/jpeg;base64,${product.img}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <strong>{product.name}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>{product.description}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>{product.price}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>{product.category.name}</strong>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container spacing={2} sx={{ cursor: 'pointer' }}>
                    <Grid>
                      <Preview onClick={() => handleViewClick(product._id)} />
                    </Grid>
                    <Grid>
                      <AddShoppingCart
                        sx={{ color: 'green' }}
                        onClick={() => handlePostProductToCart(product._id)}
                      />
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </>
  );
}
