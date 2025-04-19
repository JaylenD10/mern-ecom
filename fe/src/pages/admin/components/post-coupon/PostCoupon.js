import { Discount } from '@mui/icons-material';
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
import { postCoupon } from '../../service/admin';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const defaultTheme = createTheme();

export default function PostCoupon() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    name: '',
    code: '',
    discount: 0,
    expiredAt: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postCoupon(formData);
      if (response.status === 201) {
        enqueueSnackbar('Coupon posted successfully!', {
          variant: 'success',
          autoHideDuration: 5000,
        });
        navigate('/admin/dashboard');
      }
    } catch (error) {
      enqueueSnackbar('Error posting coupon!', {
        variant: 'error',
        autoHideDuration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updateValue = name === 'discount' ? parseInt(value, 10) : value;
    setFormdata({
      ...formData,
      [name]: updateValue,
    });
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <Discount />
            </Avatar>
            <Typography component="h1" variant="h5">
              Post Coupon
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Enter name"
                name="name"
                type="text"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label="Enter code"
                name="code"
                type="text"
                autoComplete="code"
                autoFocus
                value={formData.code}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="discount"
                label="Enter Discount"
                name="discount"
                type="text"
                autoComplete="discount"
                autoFocus
                value={formData.discount}
                onChange={handleInputChange}
              />
              <DatePicker
                sx={{ mt: 3, width: '70ch' }}
                label="Expiration Date"
                value={formData.expiredAt ? dayjs(formData.expiredAt) : null}
                onChange={(date) =>
                  setFormdata({ ...formData, expiredAt: date })
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  !formData.name ||
                  !formData.discount ||
                  !formData.code ||
                  !formData.expiredAt
                }
              >
                {loading ? (
                  <CircularProgress color="success" size={24} />
                ) : (
                  'Post Coupon '
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
