const Wishlist = require('../../models/Wishlist');

const addProductToWishlist = async (userId, productId) => {
  const existingWishlistProduct = await Wishlist.findOne({
    user: userId,
    product: productId,
  });

  if (existingWishlistProduct)
    return { status: 404, data: 'Product already in wishlist' };

  const wishlist = await new Wishlist({
    product: productId,
    user: userId,
  }).save();

  return { status: 201, data: wishlist };
};

const fetchWishlistProducts = async (userId) => {
  const wishlistProducts = await Wishlist.find({
    user: userId,
  }).populate({ path: 'product', populate: { path: 'category' } });

  if (wishlistProducts.length < 0)
    return { status: 404, data: 'No wishlist products for user' };

  const wishlists = wishlistProducts.map((wishlist) => {
    const product = wishlist.product;
    const imgBase64 = product.img ? product.img.toString('base64') : null;
    return {
      ...wishlist._doc,
      product: {
        ...product._doc,
        img: imgBase64,
      },
    };
  });

  return { status: 200, data: { wishlists } };
};

module.exports = { addProductToWishlist, fetchWishlistProducts };
