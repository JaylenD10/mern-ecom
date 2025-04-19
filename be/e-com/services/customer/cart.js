const Order = require('../../models/Order');
const Product = require('../../models/Product');
const User = require('../../models/User');
const CartItem = require('../../models/CartItem');

const addProductToCart = async (userId, productId) => {
  const activeOrder = await Order.findOne({
    user: userId,
    orderStatus: 'PENDING',
  }).populate('cartItem');

  if (!activeOrder) return { status: 404, data: 'Active order not found' };
  if (
    activeOrder.cartItem.some((item) => item.product.toString() === productId)
  )
    return { status: 409, data: 'Product already exist in cart' };

  const [product, user] = await Promise.all([
    Product.findById(productId),
    User.findById(userId),
  ]);

  if (!product || !user)
    return { status: 404, data: 'Product or user not found' };

  const savedCartItem = await new CartItem({
    product,
    user,
    price: product.price,
    quantity: 1,
    order: activeOrder,
  }).save();

  Object.assign(activeOrder, {
    totalAmount: activeOrder.totalAmount + product.price,
    amount: activeOrder.amount + product.price,
    cartItem: [...activeOrder.cartItem, savedCartItem],
  });

  await activeOrder.save();

  return { status: 201, data: 'Product added to cart successfully' };
};

const fetchCartByUser = async (userId) => {
  const activeOrder = await Order.findOne({
    user: userId,
    orderStatus: 'PENDING',
  })
    .populate({ path: 'cartItem', populate: { path: 'product' } })
    .populate({ path: 'coupon' });

  if (!activeOrder) return { status: 404, data: 'Active order not found' };

  const cartItems = activeOrder.cartItem.map((item) => {
    return {
      id: item._id,
      product: {
        ...item.product._doc,
        img: item.product.img ? item.product.img.toString('base64') : null,
      },
      price: item.price,
      quantity: item.quantity,
    };
  });

  return { status: 200, data: { order: { ...activeOrder._doc, cartItems } } };
};

module.exports = { addProductToCart, fetchCartByUser };
