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
