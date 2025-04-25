import instance from '../../../environment/axiosInstance';

export const postCategory = async (categoryDto) => {
  try {
    const response = await instance.post('/api/admin/category', categoryDto);
    return response;
  } catch (error) {
    console.error('Error posting category: ', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await instance.get('/api/admin/category');
    return response;
  } catch (error) {
    console.error('Error getting category: ', error);
    throw error;
  }
};

export const postProduct = async (productDto) => {
  try {
    const response = await instance.post('/api/admin/product', productDto);
    return response;
  } catch (error) {
    console.error('Error posting product: ', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await instance.get('/api/admin/product');
    return response;
  } catch (error) {
    console.error('Error getting product: ', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await instance.delete(`/api/admin/product/${productId}`);
    return response;
  } catch (error) {
    console.error('Error deleting product: ', error);
    throw error;
  }
};

export const getProductByID = async (productId) => {
  try {
    const response = await instance.get(`/api/admin/product/${productId}`);
    return response;
  } catch (error) {
    console.error('Error fetching product: ', error);
    throw error;
  }
};

export const updateProduct = async (id, productDto) => {
  try {
    const response = await instance.put(`/api/admin/product/${id}`, productDto);
    return response;
  } catch (error) {
    console.error('Error posting product: ', error);
    throw error;
  }
};

export const searchProduct = async (name) => {
  try {
    const response = await instance.get(`/api/admin/product/search/${name}`);
    return response;
  } catch (error) {
    console.error('Error fetching product: ', error);
    throw error;
  }
};

export const postFAQ = async (productId, faqDto) => {
  try {
    const response = await instance.post(`/api/admin/faq/${productId}`, faqDto);
    return response;
  } catch (error) {
    console.error('Error posting category: ', error);
    throw error;
  }
};

export const postCoupon = async (couponDto) => {
  try {
    const response = await instance.post('/api/admin/coupon', couponDto);
    return response;
  } catch (error) {
    console.error('Error posting coupon: ', error);
    throw error;
  }
};

export const getCoupons = async () => {
  try {
    const response = await instance.get('/api/admin/coupon');
    return response;
  } catch (error) {
    console.error('Error getting coupons: ', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await instance.get('/api/admin/order');
    return response;
  } catch (error) {
    console.error('Error getting orders: ', error);
    throw error;
  }
};

export const updateOrderStatus = async (obj) => {
  try {
    const response = await instance.post('/api/admin/order', obj);
    return response;
  } catch (error) {
    console.error('Error updateing order status: ', error);
    throw error;
  }
};
