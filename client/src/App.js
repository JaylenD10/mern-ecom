import { Route, Routes } from 'react-router-dom';
import Header from './pages/header/Header';
import Signup from '../src/pages/auth/components/signup/Signup';
import Signin from '../src/pages/auth/components/signin/Signin';
import AdminDashboard from './pages/admin/components/dashboard/AdminDashboard';
import CustomerDashboard from './pages/customer/components/dashboard/CustomerDashboard';
import PostCategory from './pages/admin/components/post-category/PostCategory';
import PostProduct from './pages/admin/components/post-product/PostProduct';
import UpdateProduct from './pages/admin/components/update product/UpdateProduct';
import PostFAQ from './pages/admin/components/post-faq/PostFAQ';
import Analytics from './pages/admin/components/analytics/Analytics';
import ViewOrders from './pages/admin/components/view-orders/ViewOrders';
import PostCoupon from './pages/admin/components/post-coupon/PostCoupon';
import ViewCoupons from './pages/admin/components/view-coupon/ViewCoupon';
import Cart from './pages/customer/components/cart/Cart';
import MyOrders from './pages/customer/components/my-orders/MyOrders';
import TrackOrder from './pages/auth/components/track-order/TrackOrder';
import ViewWishlist from './pages/customer/components/view-wishlist-products/ViewWishlist';
import ViewOrderedProducts from './pages/customer/components/view-ordered-products/ViewOrderedProducts';
import PostReview from './pages/customer/components/post-review/PostReview';
import ViewProductDetails from './pages/customer/components/view-product-details/ViewProductDetails';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Auth Components */}
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/track-order" element={<TrackOrder />} />
        {/* Admin component */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/category/post" element={<PostCategory />} />
        <Route path="/admin/product/post" element={<PostProduct />} />
        <Route path="/admin/product/:id/edit" element={<UpdateProduct />} />
        <Route path="/admin/faq/:productId/post" element={<PostFAQ />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/orders" element={<ViewOrders />} />
        <Route path="/admin/coupon/post" element={<PostCoupon />} />
        <Route path="/admin/coupons" element={<ViewCoupons />} />
        {/* Customer component */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/cart" element={<Cart />} />
        <Route path="/customer/orders" element={<MyOrders />} />
        <Route path="/customer/wishlist" element={<ViewWishlist />} />
        <Route
          path="/customer/view-ordered-products/:orderId"
          element={<ViewOrderedProducts />}
        />
        <Route path="/customer/review/:productId" element={<PostReview />} />
        <Route
          path="/customer/view-product-details/:productId"
          element={<ViewProductDetails />}
        />
      </Routes>
    </>
  );
}

export default App;
