import { useEffect, useState } from 'react';
import { getCartByUser } from '../../service/customer';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@mui/icons-material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  height: '250px',
  objectFit: 'cover',
});

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  const fetchCartByUser = async () => {
    setLoading(true);
    try {
      const response = await getCartByUser();
      if (response.status === 200) {
        setOrder(response.data.order);
        setCartItems(response.data.order.cartItems);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartByUser();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ p: 3, alignItems: 'center', justifyContent: 'center' }}
      >
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
                <Card
                  sx={{ maxWidth: 220, textAlign: 'center', mx: 'auto', p: 2 }}
                >
                  <CardContent>
                    <Img
                      alt="product"
                      src={`data:image/jpeg;base64,${item.product.img}`}
                    />
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                      {item.product.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'gray', mb: 1 }}>
                      ${item.product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid
              container
              spacing={2}
              sx={{
                mt: 3,
                px: 3,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Grid
                size={{ xs: 12, md: 6 }}
                container
                sx={{ pr: 5, justifyContent: 'flex-end' }}
              >
                <Box textAlign="right">
                  <Typography
                    variant="h6"
                    sx={{ color: 'rgba(0, 0, 0, 0.7)', fontWeight: 700 }}
                  >
                    Subtotal: ${order.totalAmount}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: '#D32F2F', fontWeight: 700 }}
                  >
                    Discount Applied: -${order.discount}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: '#2E7D32', fontWeight: 700 }}
                  >
                    Final Total: ${order.amount}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid
            contaier
            sx={{
              height: '80vh',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShoppingCartOutlined
              sx={{ fontSize: 80, color: '#757575', opacity: 0.8 }}
            />
            <Typography
              variant="h4"
              sx={{ mt: 2, color: '#757575', fontWeight: 600 }}
            >
              Your Cart is Empty
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => navigate('/customer/dashboard')}
            >
              Continue Shopping
            </Button>
          </Grid>
        )}
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </>
  );
}
