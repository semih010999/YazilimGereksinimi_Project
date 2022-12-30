import './App.css';
import './bootstrap.min.css';
import './my.css';
import Header from './component/Header';
import Footer from './component/Footer';
import About from './screen/About';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import ProductsScreen from './screen/ProductsScreen';
import {Routes,Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CartScreen from './screen/CartScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import ProfileScreen from './screen/ProfileScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen'
import OrderScreen from './screen/PlaceOrderScreen'
import UserListScreen from './screen/UserListScreen'
import ProductListScreen from './screen/ProductListScreen';
import ProductEditScreen from './screen/ProductEditScreen';
import OrderListScreen from './screen/OrderListScreen';

function App() {
  return (
    <div>
      <Header/>
      <Container className='mt=50 mb=50 justify-content-center'>
      <Routes>
        <Route path="/" element={<HomeScreen/>}/>
        <Route path="/store" element={<ProductsScreen/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/product/:id" element={<ProductScreen/>}/> 
        <Route path="/cart/:id" element={<CartScreen/>}/>
        <Route path="/cart/:id?" element={<CartScreen/>}/> 
        <Route path="/cart" element={<CartScreen/>}/> 
        <Route path="/login" element={<LoginScreen/>}/> 
        <Route path="/register" element={<RegisterScreen/>}/>
        <Route path="/profile" element={<ProfileScreen/>}/>
        <Route path="/shipping" element={<ShippingScreen/>}/>
        <Route path="/payment" element={<PaymentScreen/>}/>
        <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
        <Route path="/order/:id" element={<OrderScreen/>}/>
        <Route path="/admin/userlist" element={<UserListScreen/>}/>
        <Route path="/admin/productlist" element={<ProductListScreen/>}/>
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
        <Route path="/admin/orderlist" element={<OrderListScreen/>}/>
        
      </Routes>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
