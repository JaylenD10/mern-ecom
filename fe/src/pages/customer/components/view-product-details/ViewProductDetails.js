import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../service/customer';
import { FavoriteBorder } from '@mui/icons-material';

export default function ViewProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [FAQS, setFAQS] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await getProductById(productId);
      if (response.status === 200) {
        setProduct(response.data.product);
        setFAQS(response.data.faqs);
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {product && (
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
                <Typography gutterBottom variant="h5">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: ${product.category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                {/* <IconButton
                  onClick={addToWishList}
                  sx={{ color: 'red', mt: 2 }}
                >
                  <FavoriteBorder sx={{ fontSize: 30 }} />
                </IconButton> */}
              </CardContent>
            </Box>
          </Card>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 3,
        }}
      >
        {reviews.length > 0 && (
          <Typography sx={{ mb: 2, fontWeight: 'bold' }} variant="h5">
            Customer Reviews
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '50%',
          }}
        >
          {reviews.map((review) => (
            <Card
              key={review._id}
              sx={{ display: 'flex', alignItems: 'center', p: 2 }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  mr: 2,
                }}
                image={`data:image/jpeg;base64,${review.img}`}
                alt="User Profile"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Rating
                  name="read-only"
                  value={review.rating}
                  readOnly
                  sx={{ mb: 1 }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                  <Box component="span" sx={{ color: 'black' }}>
                    {review.user.firstName}
                  </Box>{' '}
                  {review.description}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 3,
        }}
      >
        {FAQS.length > 0 && (
          <Typography sx={{ mb: 2, fontWeight: 'bold' }} variant="h5">
            Frequently Asked Questions
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '50%',
          }}
        >
          {FAQS.map((faq) => (
            <Card
              key={faq._id}
              sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
            >
              <CardContent>
                <Box
                  sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                  >
                    Question:
                  </Typography>
                  <Typography variant="body2">{faq.question}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 'bold', color: 'secondary.main' }}
                  >
                    Answer:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
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
