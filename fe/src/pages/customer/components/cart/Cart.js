import { useEffect, useState } from 'react';
import {
  applyCoupon,
  decreaseProductQuantity,
  getCartByUser,
  increaseProductQuantity,
  placeOrder,
} from '../../service/customer';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  AddCircleOutline,
  RemoveCircleOutline,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

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
  const [couponForm, setCouponForm] = useState({ code: '' });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    address: '',
    orderDescription: '',
  });
  const [open, setOpen] = useState(false);

  const handlInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const applyCouponOnCart = async () => {
    setLoading(true);
    try {
      const response = await applyCoupon(couponForm.code);
      if (response.status === 200) {
        enqueueSnackbar('Coupon applied successfully!', {
          variant: 'success',
          autoHideDuration: 5000,
        });
        fetchCartByUser();
      }
    } catch (error) {
      enqueueSnackbar('Getting error while applying coupon!', {
        variant: 'error',
        autoHideDuration: 5000,
      });
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await placeOrder(formData);
      if (response.status === 200) {
        setOpen(false);
        enqueueSnackbar('Order placed successfully!', {
          variant: 'success',
          autoHideDuration: 5000,
        });
        navigate('/customer/dashboard');
      }
    } catch (error) {
      enqueueSnackbar('Getting error while placing order!', {
        variant: 'error',
        autoHideDuration: 5000,
      });
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const decreaseQuantity = async (productId) => {
    setLoading(true);
    try {
      const response = await decreaseProductQuantity(productId);
      if (response.status === 200) {
        fetchCartByUser();
      }
    } catch (error) {
      enqueueSnackbar('Getting error while decreasing product quantity!', {
        variant: 'error',
        autoHideDuration: 5000,
      });
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = async (productId) => {
    setLoading(true);
    try {
      const response = await increaseProductQuantity(productId);
      if (response.status === 200) {
        fetchCartByUser();
      }
    } catch (error) {
      enqueueSnackbar('Getting error while increasing product quantity!', {
        variant: 'error',
        autoHideDuration: 5000,
      });
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

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
                    <Grid
                      container
                      spacing={1}
                      sx={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Grid>
                        <RemoveCircleOutline
                          sx={{
                            color: item.quantity === 1 ? 'gray' : 'black',
                            cursor:
                              item.quantity === 1 ? 'not-allowed' : 'pointer',
                          }}
                          onClick={() =>
                            item.quantity > 1 &&
                            decreaseQuantity(item.product._id)
                          }
                        />
                      </Grid>
                      <Grid>
                        <Typography variant="body1">{item.quantity}</Typography>
                      </Grid>
                      <Grid>
                        <AddCircleOutline
                          onClick={() => increaseQuantity(item.product._id)}
                          sx={{ cursor: 'pointer' }}
                        />
                      </Grid>
                    </Grid>
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
              <Grid size={{ xs: 12, md: 6 }}>
                {order.coupon == null && (
                  <Box
                    sx={{
                      pl: 5,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <TextField
                      label="Enter Coupon"
                      variant="outlined"
                      value={couponForm.code}
                      onChange={(e) => setCouponForm({ code: e.target.value })}
                      required
                      sx={{ width: 200 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, width: 125 }}
                      onClick={applyCouponOnCart}
                    >
                      Apply
                    </Button>
                  </Box>
                )}
              </Grid>
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
                  {order.coupon && (
                    <Typography
                      variant="h6"
                      sx={{ color: '#1976D2', fontWeight: 700 }}
                    >
                      Coupon Applied: {order.coupon.name}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpen(true)}
                    sx={{ mt: 2 }}
                  >
                    Place Order
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid
            container
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
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ component: 'form', onSubmit: handleSubmit }}
      >
        <DialogTitle>Place Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Place your order by adding address and any special instructions in
            the description
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="address"
            name="address"
            label="Address"
            type="text"
            multiline
            maxRows={4}
            fullWidth
            variant="standard"
            value={formData.address}
            onChange={handlInputChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="orderDescription"
            name="orderDescription"
            label="Description or Instructions"
            type="text"
            multiline
            maxRows={4}
            fullWidth
            variant="standard"
            value={formData.orderDescription}
            onChange={handlInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Place Order</Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </>
  );
}
