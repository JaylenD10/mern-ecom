import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../../service/admin';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ShoppingBagOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrders();
      if (response.status === 200) setOrders(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatusClick = async (id, status) => {
    setLoading(true);
    try {
      const obj = { id, status };
      const response = await updateOrderStatus(obj);
      if (response.status === 200)
        enqueueSnackbar('Order status changed successfully!', {
          variant: 'success',
          autoHideDuration: 5000,
        });
      fetchOrders();
    } catch (error) {
      enqueueSnackbar('Error Updating order status!', {
        variant: 'error',
        autoHideDuration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatPlacedAtDate = (postedDate) => {
    const date = new Date(postedDate);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: orders.length === 0 ? '80vh' : 'auto',
          justifyContent: orders.length === 0 ? 'center' : 'flex-start',
        }}
      >
        {orders.length === 0 ? (
          <>
            <ShoppingBagOutlined
              sx={{ fontSize: 100, color: '#757575', opacity: 0.8 }}
            />
            <Typography
              variant="h5"
              sx={{ mt: 2, color: '#757575', fontWeight: 600 }}
            >
              No Orders Found
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => navigate('/customer/dashboard')}
            >
              Start Shopping
            </Button>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Orders
            </Typography>
            <TableContainer component={Paper} sx={{ width: '80%', mt: 3 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tracking ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">Placed On</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((row) => (
                    <TableRow
                      key={row.trackingId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.trackingId}
                      </TableCell>
                      <TableCell align="right">
                        {row.user.firstName + ' ' + row.user.lastName}
                      </TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">
                        {row.orderDescription}
                      </TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      <TableCell align="right">
                        {formatPlacedAtDate(row.updatedAt)}
                      </TableCell>
                      <TableCell align="right">{row.orderStatus}</TableCell>
                      <TableCell align="right">
                        <Grid container spacing={2} sx={{ cursor: 'pointer' }}>
                          <Grid>
                            <LocalShippingIcon
                              onClick={() =>
                                handleChangeStatusClick(row._id, 'SHIPPED')
                              }
                            ></LocalShippingIcon>
                          </Grid>
                          <Grid>
                            <CheckBoxIcon
                              sx={{ color: 'green' }}
                              onClick={() =>
                                handleChangeStatusClick(row._id, 'DELIVERED')
                              }
                            ></CheckBoxIcon>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
