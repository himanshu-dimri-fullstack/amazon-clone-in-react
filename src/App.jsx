import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/HomePage/HomePage'
import ProductPage from './pages/ProductPage'
import ProductDetail from './pages/ProductDetail'
import ScrollToTop from './components/ScrollToTop'
import Cart from './pages/Cart'
import Checkout from "./pages/Checkout";
import OrderSuccess from './pages/OrderSuccess'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import { AuthContext } from './context/AuthContext'
import Dashboard from './pages/dashboard/Dashboard'
import { useContext } from 'react'

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {

  return (
    <div className="">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<ProductPage />} />
        <Route path="/:categorySlug/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
