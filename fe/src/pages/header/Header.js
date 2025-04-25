import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {
  isAdminLoggedIn,
  isCustomerLoggedIn,
  removeToken,
} from '../../utils/common';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const isAdmin = await isAdminLoggedIn();
        const isCustomer = await isCustomerLoggedIn();
        setIsAdmin(isAdmin);
        setIsCustomer(isCustomer);
      } catch (error) {
        console.error(`Error fetching: ${error}`);
      }
    };
    fetchUserRoles();
  }, [location]);

  const handleLogout = () => {
    navigate('/login');
    removeToken();
  };

  return (
    <>
      {!isAdmin && !isCustomer && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" compnent="div" sx={{ flexGrow: 1 }}>
                E-Commerce App
              </Typography>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/track-order" color="inherit">
                Track Order
              </Button>
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}

      {isAdmin && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" compnent="div" sx={{ flexGrow: 1 }}>
                Admin
              </Typography>
              <Button component={Link} to="/admin/dashboard" color="inherit">
                Dashboard
              </Button>
              <Button
                component={Link}
                to="/admin/category/post"
                color="inherit"
              >
                Post Category
              </Button>
              <Button component={Link} to="/admin/product/post" color="inherit">
                Post Product
              </Button>
              <Button component={Link} to="/admin/coupon/post" color="inherit">
                Post Coupon
              </Button>
              <Button component={Link} to="/admin/coupons" color="inherit">
                Coupons
              </Button>
              <Button component={Link} to="/admin/orders" color="inherit">
                Orders
              </Button>
              <Button component={Link} to="/admin/analytics" color="inherit">
                Analytics
              </Button>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}

      {isCustomer && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" compnent="div" sx={{ flexGrow: 1 }}>
                Customer
              </Typography>
              <Button component={Link} to="/customer/dashboard" color="inherit">
                Dashboard
              </Button>
              <Button component={Link} to="/customer/cart" color="inherit">
                Cart
              </Button>
              <Button component={Link} to="/customer/orders" color="inherit">
                Orders
              </Button>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  );
}
