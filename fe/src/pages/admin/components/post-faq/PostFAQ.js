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
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { CategoryOutlined, Quiz } from '@mui/icons-material';
import { postFAQ } from '../../service/admin';

const defaultTheme = createTheme();

export default function PostFAQ() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    question: '',
    answer: '',
  });
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postFAQ(productId, formData);
      if (response.status === 201) {
        enqueueSnackbar('FAQ posted successfully!', {
          variant: 'success',
          autoHideDuration: 5000,
        });
        navigate('/admin/dashboard');
      }
    } catch (error) {
      enqueueSnackbar('Error posting FAQ!', {
        variant: 'error',
        autoHideDuration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <Quiz />
            </Avatar>
            <Typography component="h1" variant="h5">
              Post FAQ
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                rows={3}
                margin="normal"
                name="question"
                multiline
                required
                fullWidth
                id="question"
                label="Enter Question"
                type="text"
                autoFocus
                value={formData.question}
                onChange={handleInputChange}
              />
              <TextField
                rows={3}
                multiline
                name="answer"
                margin="normal"
                required
                fullWidth
                type="text"
                id="answer"
                label="Enter Answer"
                value={formData.answer}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!formData.question || !formData.answer}
              >
                {loading ? (
                  <CircularProgress color="success" size={24} />
                ) : (
                  'Post FAQ'
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
