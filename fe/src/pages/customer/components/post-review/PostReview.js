import { useSnackbar } from 'notistack';
import { useId, useState } from 'react';
import { useActionData, useNavigate, useParams } from 'react-router-dom';
import { postReview } from '../../service/customer';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Input,
  Rating,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { RateReview } from '@mui/icons-material';

const defaultTheme = createTheme();

export default function PostReview() {
  const { productId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [review, setReview] = useState({
    rating: '',
    description: '',
    img: null,
  });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setReview({ ...review, img: imageFile });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newFormData = new FormData();
      newFormData.append('rating', review.rating);
      newFormData.append('description', review.description);
      newFormData.append('product', productId);
      newFormData.append('img', review.img);
      newFormData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const response = await postReview(newFormData);
      if (response.status === 201) {
        enqueueSnackbar('Review posted successfully', {
          variant: 'success',
          autoHideDuration: 5000,
        });
        navigate('/customer/dashboard');
      }
    } catch (error) {
      enqueueSnackbar('Error posting review', {
        variant: 'error',
        autoHideDuration: 5000,
      });
    } finally {
      setLoading(false);
    }
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
              <RateReview />
            </Avatar>
            <Typography component="h1" variant="h5">
              Post Review
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
                {review.img && (
                  <Avatar
                    src={URL.createObjectURL(review.img)}
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
              <Rating
                sx={{ mt: 2 }}
                name="rating"
                id="rating"
                value={review.rating}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="description"
                autoComplete="description"
                value={review.description}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!review.img || !review.description || !review.rating}
              >
                {loading ? (
                  <CircularProgress color="success" size={24} />
                ) : (
                  'Post Review'
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
