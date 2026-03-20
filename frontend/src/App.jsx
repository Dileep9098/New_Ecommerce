// import './App.css'
// import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Home from './Pages/Home/Home'
// import Dashboard from './Pages/Admin/Dashboard/Dashboard'
// import Layout from './Pages/Layout/Layout'
// import Login from './Pages/User/Login'
// import Register from './Pages/User/Register'
// import { useDispatch, useSelector } from 'react-redux'
// import { loadUser } from './Store/Feature/auth/authSlice'
// import ProtectedRoute from './Helper/ProtectedRoute/ProtectedRoutes'
// import { useEffect } from 'react'
// import { Toaster } from 'sonner'
// import AdminLayout from './Pages/Admin/Layout/AdminLayout'


// function App() {

//  const { isLoading, isAuthentication, user } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();


//     useEffect(() => {
//         dispatch(loadUser());

//     }, [dispatch]);

//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path='/login' element={<Login />} />
//           <Route path='/sign-up' element={<Register />} />

//           <Route path='/' element={<Layout />}>

//             <Route path='/' element={<Home />} />
//           </Route>


//           {/* ---------------- Admin Dashboard ------------------ */}

//           <Route path='/admin' element={<AdminLayout />}>

//             <Route path="dashboard" element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             } />
//           </Route>

//         </Routes>
//         <Toaster position='top-center' richColors />


//       </BrowserRouter>


//     </>
//   )
// }

// export default App


// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import Layout from "./Pages/Layout/Layout";
// import Login from "./Pages/User/Login";
// import Register from "./Pages/User/Register";
// import ProtectedRoute from './Helper/ProtectedRoute/ProtectedRoutes'
// import AdminLayout from "./Pages/Admin/Layout/AdminLayout";
// import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
// import { Toaster } from "sonner";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/sign-up" element={<Register />} />

//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//         </Route>

//         {/* Admin routes */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminOnly={true}>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route
//             path="dashboard"
//             element={
//               <ProtectedRoute adminOnly={true}>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//       </Routes>
//       <Toaster position="top-center" richColors />
//     </BrowserRouter>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import Layout from "./Pages/Layout/Layout";
// import Login from "./Pages/User/Login";
// import Register from "./Pages/User/Register";
// import ProtectedRoute from './Helper/ProtectedRoute/ProtectedRoutes'
// import AdminLayout from "./Pages/Admin/Layout/AdminLayout";
// import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
// import { Toaster } from "sonner";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/sign-up" element={<Register />} />

//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//         </Route>

//         {/* Admin Routes */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminOnly={true}>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<Dashboard />} />
//         </Route>
//       </Routes>
//       <Toaster position="top-center" richColors />
//     </BrowserRouter>
//   );
// }

// export default App;




import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "sonner";

import Home from "./Pages/Home/Home";
import Layout from "./Pages/Layout/Layout";
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import AdminLayout from "./Pages/Admin/Layout/AdminLayout";
import ProtectedRoute from "./Helper/ProtectedRoute/ProtectedRoutes";
import { loadUser } from "./Store/Feature/auth/authSlice";
import TopbarManage from "./Pages/Admin/Theme/Layouts/TopbarManage";
import MainBanner from "./Pages/Admin/Theme/Banner/MainBanner";
import Product from "./Pages/Admin/Product/Product_Data/Product";
import AddProduct from "./Pages/Admin/Product/Product_Data/AddProduct";
import Category from "./Pages/Admin/Category/Category";
import ProductSize from "./Pages/Admin/ProductSize/ProductSize";
import Tax from "./Pages/Admin/Tax/Tax";
import Manufactures from "./Pages/Admin/Manufactures/Manufactures";
import PaymentsMethods from "./Pages/Admin/PaymentMethod/PaymentsMethods";
import DiscountDashboard from "./Pages/Admin/Discount/DiscountDashboard";
import ContactDashboard from "./Pages/Admin/Contact/ContactDashboard";
import SubscriberDashboard from "./Pages/Admin/Contact/SubscriberDashboard";
import BlogsDashboard from "./Pages/Admin/Blogs/BlogsDashboard";
import HotDealBannerDashboard from "./Pages/Admin/hotDealBanner/HotDealBannerDashboard";
import Compaingns from "./Pages/Admin/Compaingns/Compaingns";
import UpdateProductDetails from "./Pages/Admin/Product/Product_Data/UpdateProductDetails";
import AllProducts from "./Pages/Product/AllProducts";
import ProductDetails from "./Pages/Product/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import { fetchCurrency } from "./Store/Feature/currencySlice/currencySlice";
import WishList from "./Pages/Cart/WishList";
import About from "./Pages/About/About";
import Checkout from "./Pages/Checkout/Checkout";
import OrderList from "./Pages/Admin/Orders/OrderList";
import OrderDetails from "./Pages/Admin/Orders/OrderDetails";
import PayUFailResponse from "./Pages/Checkout/PayUFailResponse";
import Profile from "./Pages/User/Profile";
import SingleOrderDetails from "./Comoponant/Profie/SingleOrderDetails";
import Contact from "./Pages/Contact/Contact";
import BlogPage from "./Pages/Blog/BlogPage";
import RolePermission from "./Pages/RolePermission/RolePermission";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchCurrency())
  }, [dispatch]); // Only once on mount

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />

          {/* Website Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/all-product/:category_id/:category_name" element={<AllProducts />} />

            <Route path="product-details/:product_id/:category/:product_name" element={<ProductDetails />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/my-wishlist" element={<WishList />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/update-profile" element={<UpdateProfile />} /> */}
            <Route path="/order-response" element={<PayUFailResponse />} />
            {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
            {/* <Route path="/order-history" element={<OrderHistory />} /> */}
            <Route path="/single-order-details/:id" element={<SingleOrderDetails />} />

            <Route path="/checkout" element={<ProtectedRoute> <Checkout /></ProtectedRoute>} />
            {/* <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>} /> */}
          </Route>

          {/* Admin Protected Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product" element={<Product />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="update-product/:id" element={<UpdateProductDetails />} />
            {/* <Route path="update-product/:id" element={<UpdateProductDetails/>} /> */}

            <Route path="order-list" element={<OrderList />} />
            <Route path="order-details/:id" element={<OrderDetails />} />


            {/* ---------------------- Theme Customise -------------- */}

            <Route path="topbar-manage" element={<TopbarManage />} />
            <Route path="main-banner" element={<MainBanner />} />
            <Route path="category" element={<Category />} />



            {/* ======================== + + Category Management + + ================== */}
            <Route path="manufactures" element={<Manufactures />} />
            <Route path="payments-method" element={<PaymentsMethods />} />
            <Route path="discount-details" element={<DiscountDashboard />} />
            <Route path="contact-details" element={<ContactDashboard />} />
            <Route path="subscriber-details" element={<SubscriberDashboard />} />
            <Route path="product-size" element={<ProductSize />} />
            <Route path="tax" element={<Tax />} />


            {/* ======================== + + Home Banner Management + + ================== */}

            {/* <Route path="homeBanner-dashboard" element={<HomeBannerDashboard />} /> */}
            <Route path="Blogs-dashboard" element={<BlogsDashboard />} />
            <Route path="hot-deal-banner-dashboard" element={<HotDealBannerDashboard />} />
            <Route path="compaingns-dashboard" element={<Compaingns />} />
            {/* <Route path="siteLogo-dashboard" element={<SiteLogo />} />  */}
            <Route path="user-role" element={<RolePermission />} />

          </Route>

        </Routes>

        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </>
  );
}

export default App;
