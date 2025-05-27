const Order = require('../../models/Order');
const Product = require('../../models/Product');
const User = require('../../models/User');
const CartItem = require('../../models/CartItem');
const Coupon = require('../../models/Coupon');

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

const increaseTheProductQuantity = async (userId, productId) => {
  const activeOrder = await Order.findOne({
    user: userId,
    orderStatus: 'PENDING',
  });
  const product = await Product.findById(productId);

  if (!activeOrder || !product)
    return { status: 404, data: 'Active order or product not found' };

  const cartItem = await CartItem.findOne({
    product: productId,
    order: activeOrder._id,
    user: userId,
  });

  if (!cartItem) return { status: 404, data: 'Cart item not found!' };

  activeOrder.amount += product.price;
  activeOrder.totalAmount += product.price;
  cartItem.quantity += 1;

  if (activeOrder.coupon) {
    const coupon = await Coupon.findById(activeOrder.coupon);

    if (!coupon) return { status: 404, data: 'Coupon not found!' };

    const discountAmount = (coupon.discount / 100) * activeOrder.totalAmount;
    const netAmount = activeOrder.totalAmount - discountAmount;

    activeOrder.amount = Math.round(netAmount);
    activeOrder.discount = Math.round(discountAmount);
  }

  await activeOrder.save();
  await cartItem.save();

  return { status: 200, data: activeOrder };
};

const decreaseTheProductQuantity = async (userId, productId) => {
  const activeOrder = await Order.findOne({
    user: userId,
    orderStatus: 'PENDING',
  });
  const product = await Product.findById(productId);

  if (!activeOrder || !product)
    return { status: 404, data: 'Active order or product not found' };

  const cartItem = await CartItem.findOne({
    product: productId,
    order: activeOrder._id,
    user: userId,
  });

  if (!cartItem) return { status: 404, data: 'Cart item not found!' };
  if (cartItem.quantity === 1)
    return { status: 404, data: "Quantity can't be decreased further!" };

  activeOrder.amount -= product.price;
  activeOrder.totalAmount -= product.price;
  cartItem.quantity -= 1;

  if (activeOrder.coupon) {
    const coupon = await Coupon.findById(activeOrder.coupon);

    if (!coupon) return { status: 404, data: 'Coupon not found!' };

    const discountAmount = (coupon.discount / 100) * activeOrder.totalAmount;
    const netAmount = activeOrder.totalAmount - discountAmount;

    activeOrder.amount = Math.round(netAmount);
    activeOrder.discount = Math.round(discountAmount);
  }

  await activeOrder.save();
  await cartItem.save();

  return { status: 200, data: activeOrder };
};

module.exports = {
  addProductToCart,
  fetchCartByUser,
  increaseTheProductQuantity,
  decreaseTheProductQuantity,
};
