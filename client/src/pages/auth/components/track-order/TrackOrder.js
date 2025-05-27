import {
  CircularProgress,
  Grid,
  Typography,
  Backdrop,
  Paper,
  InputBase,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import { useState } from 'react';
import { trackOrder } from '../../services/auth/auth';
import SearchIcon from '@mui/icons-material/Search';

export default function TrackOrder() {
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [order, setOrder] = useState();

  const handleInputChange = async (e) => {
    setTrackingId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await trackOrder(trackingId);
      if (response.status === 200) {
        setOrder(response.data);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPlacedAtDate = (postedDate) => {
    const date = new Date(postedDate);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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
            placeholder="Enter Tracking ID"
            inputProps={{ 'aria-label': 'Enter Tracking ID' }}
            value={trackingId}
            onChange={handleInputChange}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon onClick={handleSubmit}></SearchIcon>
          </IconButton>
        </Paper>
        {order && (
          <Grid key={order._id} size={{ xs: 6 }} sx={{ mt: 12 }}>
            <Card
              sx={{
                p: 2,
                margin: 'auto',
                flexGrow: 1,
                maxWidth: 300,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Tracking ID: <strong>{order.trackingId}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Name:{' '}
                  <strong>
                    {order.user.firstName + ' ' + order.user.lastName}
                  </strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: <strong>{order.address}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Amount: <strong>{order.amount}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: <strong>{order.orderStatus}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: <strong>{formatPlacedAtDate(order.updatedAt)}</strong>
                </Typography>
              </CardContent>
            </Card>
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
