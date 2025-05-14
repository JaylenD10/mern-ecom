import instance from '../../../environment/axiosInstance';

export const getProducts = async () => {
  try {
    const response = await instance.get('/api/customer/product');
    return response;
  } catch (error) {
    console.error('Error getting product: ', error);
    throw error;
  }
};

export const searchProduct = async (name) => {
  try {
    const response = await instance.get(`/api/customer/product/search/${name}`);
    return response;
  } catch (error) {
    console.error('Error fetching product: ', error);
    throw error;
  }
};

export const addProductToCart = async (productId) => {
  try {
    const response = await instance.post(`/api/customer/cart/${productId}`);
    return response;
  } catch (error) {
    console.error('Error posting product to cart: ', error);
    throw error;
  }
};

export const getCartByUser = async () => {
  try {
    const response = await instance.get('/api/customer/cart');
    return response;
  } catch (error) {
    console.error('Error getting cart: ', error);
    throw error;
  }
};

export const applyCoupon = async (code) => {
  try {
    const response = await instance.get(`/api/customer/coupon/${code}`);
    return response;
  } catch (error) {
    console.error('Error applying coupon: ', error);
    throw error;
  }
};

export const increaseProductQuantity = async (productId) => {
  try {
    const response = await instance.post(
      `/api/customer/cart/increase/${productId}`
    );
    return response;
  } catch (error) {
    console.error('Error increasing quantity: ', error);
    throw error;
  }
};

export const decreaseProductQuantity = async (productId) => {
  try {
    const response = await instance.post(
      `/api/customer/cart/decrease/${productId}`
    );
    return response;
  } catch (error) {
    console.error('Error increasing quantity: ', error);
    throw error;
  }
};

export const placeOrder = async (data) => {
  try {
    const response = await instance.post(`/api/customer/order`, data);
    return response;
  } catch (error) {
    console.error('Error placing order: ', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await instance.get('/api/customer/order');
    return response;
  } catch (error) {
    console.error('Error getting orders: ', error);
    throw error;
  }
};

export const getOrderedProducts = async (orderId) => {
  try {
    const response = await instance.get(
      `/api/customer/order/products/${orderId}`
    );
    return response;
  } catch (error) {
    console.error('Error getting orders: ', error);
    throw error;
  }
};

export const postReview = async (reviewData) => {
  try {
    console.log('Before sending: ', reviewData);
    const response = await instance.post(`/api/customer/review/`, reviewData);
    console.log(response);
    console.log('After sending: ', reviewData);
    return response;
  } catch (error) {
    console.log('Error sending: ', reviewData);
    console.error('Error posting review: ', error);
    throw error;
  }
};
