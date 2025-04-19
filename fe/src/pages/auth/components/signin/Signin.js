import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  Link,
  Backdrop,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSnackbar } from 'notistack';
import { signin } from '../../../../services/auth/auth';
import {
  isAdminLoggedIn,
  isCustomerLoggedIn,
  saveToken,
} from '../../../../utils/common';

const defaultTheme = createTheme();

export default function Signin() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signin(formData);
      if (response.status === 200) {
        console.log(response);
        const token = response.data.token;
        saveToken(token);
        if (isAdminLoggedIn()) {
          navigate('/admin/dashboard');
        } else if (isCustomerLoggedIn()) {
          navigate('/customer/dashboard');
        }
      }
    } catch (error) {
      enqueueSnackbar('Invalid credentials!', {
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

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 7,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                autoComplete="email"
                name="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                sx={{ mt: 3 }}
                autoComplete="new-password"
                name="password"
                required
                fullWidth
                id="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!formData.email || !formData.password}
              >
                {loading ? (
                  <CircularProgress color="success" size={24} />
                ) : (
                  'Sign In '
                )}
              </Button>
              <Grid>
                <Grid>
                  <Link variant="body2" onClick={handleSignUpClick}>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
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
