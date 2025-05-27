import { useEffect, useState } from 'react';
import { getWishlistProducts } from '../../service/customer';
import { useNavigate } from 'react-router-dom';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ViewWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await getWishlistProducts();
      if (response.status === 200) {
        setWishlist(response.data.wishlists);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);
  return (
    <>
      <Box
        sx={{
          width: '100%',
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        {wishlist.length === 0 ? (
          <>
            <FavoriteBorderOutlined
              sx={{ fontSize: 100, color: '#757575', opacity: 0.8 }}
            />
            <Typography
              variant="h5"
              sx={{ mt: 2, color: '#757575', fontWeight: 600 }}
            >
              No Wishlist Products Found
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => navigate('/customer/dashboard')}
            >
              Browse Products
            </Button>
          </>
        ) : (
          <>
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: 'center', mb: 3 }}
            >
              Wishlist
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{ width: '80%', justifyContent: 'center' }}
            >
              {wishlist.map((w) => (
                <Grid
                  key={w.product.id}
                  size={{ xs: 12, sm: 6, md: 4 }}
                  display="flex"
                  justifyContent="center"
                >
                  <Card
                    sx={{
                      p: 2,
                      maxWidth: 300,
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                  >
                    <Img
                      alt="complex"
                      src={`data:image/jpeg;base64,${w.product.img}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <strong>{w.product.name}</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {w.product.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${w.product.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {w.product.category.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
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
