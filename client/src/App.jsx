import React, { useEffect } from "react";
import "./App.css";
import "./style.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadUser } from "./redux/actions/userActions";
import store from "./redux/store";

//components
import SignUp from "./components/user/SignUp";
import NavBar from "./components/layouts/NavBar";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import BookDetail from "./components/book/BookDetail";
import Books from "./components/Books";
import SignIn from "./components/user/SignIn";
import Profile from "./components/user/profile";
// import { useSelector } from "react-redux";
import ProtectedRoute from "./components/routes/protectedRoute";
// import axios from "axios";
import UpdateProfile from "./components/user/updateProfile";
import UpdatePassword from "./components/user/updatePassword";
import ForgotPassword from "./components/user/forgotPassword";
import NewPassword from "./components/user/newPassword";
import Cart from "./components/book/cart";
import Shipping from "./components/book/shipping";
import ConfirmOrder from "./components/book/ConfirmOrder";
import Payment from "./components/book/Payment";
import ListOrders from "./components/orders/ListOrders";
import OrderDetails from "./components/orders/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import BookList from "./components/admin/BookList";
import NewBook from "./components/admin/NewBook";
import UpdateBook from "./components/admin/UpdateBook";
import OrdersList from "./components/admin/ordersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import SellersList from "./components/admin/SellersList";
import UpdateUser from "./components/admin/UpdateUser";
import Seller from "./components/user/Seller";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/books" element={<Books />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<NewPassword />} />
          <Route path="/cart" element={<Cart />} />

          {/**Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/me" element={<Profile />} exact />
            <Route path="/update-profile" element={<UpdateProfile />} exact />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/confirm" element={<ConfirmOrder />} />

            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/books" element={<BookList />} />
            <Route path="/admin/newBook" element={<NewBook />} />
            <Route path="/admin/book/:id" element={<UpdateBook />} />
            <Route path="/admin/orders" element={<OrdersList />} />
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
            <Route path="/admin/users" element={<UsersList />} />
          </Route>
          <Route path="/orders/me" element={<ListOrders />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route path="/payment/verify" element={<Payment />} />
          <Route path="/me/seller" element={<Seller />} />
          <Route path="/admin/sellers" element={<SellersList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
