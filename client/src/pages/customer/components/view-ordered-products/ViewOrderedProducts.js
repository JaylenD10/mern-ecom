import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderedProducts } from '../../service/customer';
import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import { ReviewsOutlined } from '@mui/icons-material';

export default function ViewOrderedProducts() {
  const { orderId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrderedProducts(orderId);
      if (response.status === 200) setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  });

  return (
    <>
      {products.map((product) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: 5,
          }}
        >
          <Card
            sx={{ display: 'flex', alignItems: 'center', width: '40%', p: 2 }}
          >
            <CardMedia
              component="img"
              sx={{
                width: 300,
                height: '100%',
                objectFit: 'cover',
                borderRadius: 2,
              }}
              image={`data:image/jpeg;base64,${product.img}`}
              title={product.name}
            />
            <Box
              sx={{ flex: 1, display: 'flex', flexDirection: 'column', px: 2 }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" component="p" className="price">
                  Price: ${product.price}
                </Typography>
                <IconButton
                  onClick={() => navigate(`/customer/review/${product._id}`)}
                  sx={{ color: 'red', mt: 2 }}
                >
                  <ReviewsOutlined sx={{ fontSize: 30 }} />
                </IconButton>
              </CardContent>
            </Box>
          </Card>
        </Box>
      ))}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </>
  );
}
