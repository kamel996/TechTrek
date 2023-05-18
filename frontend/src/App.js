import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./Pages/HomePage";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/ProfilePage";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import PlaceOrderPage from "./Pages/PlaceOrderPage";
import OrderPage from "./Pages/OrderPage";
import UserListPage from "./Pages/UserListPage";
import UserEditPage from "./Pages/UserEditPage";
import ProductListPage from "./Pages/ProductListPage";
import ProductEditPage from "./Pages/ProductEditPage";
import OrderListPage from "./Pages/OrderListPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/order/:id" Component={OrderPage} />
            <Route path="/placeorder" Component={PlaceOrderPage} />
            <Route path="/payment" Component={PaymentPage} />
            <Route path="/shipping" Component={ShippingPage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={RegisterPage} />
            <Route path="/profile" Component={ProfilePage} />
            <Route path="/product/:id" Component={ProductPage} />
            <Route path="/cart/:id?" Component={CartPage} />
            <Route path="/admin/orderlist" Component={OrderListPage} />
            <Route path="/admin/productlist" Component={ProductListPage} />
            <Route path="/admin/product/:id/edit" Component={ProductEditPage} />
            <Route path="/admin/userlist" Component={UserListPage} />
            <Route path="/admin/user/:id/edit" Component={UserEditPage} />
            <Route path="/search/:keyword" Component={HomePage}  />
            <Route path="/" Component={HomePage} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
