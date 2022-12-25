import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { useThemeHook } from './GlobalComponents/ThemeProvider';
import { Router } from "@reach/router";
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import { GlobalProvider } from "./context/orderContext";
import MyAccount from './pages/MyAccount';
import Cart from './pages/Cart';
import ProductList from './pages/ProductList';
import AddnewProduct from './pages/AddnewProduct';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
function App() {
  const [theme] = useThemeHook();
  return (
    <main className={theme? 'bg-black': 'bg-light-2'} style={{ height: '100vh', overflowY: 'auto'}}>
      <GlobalProvider>
      <Header/>
      <Router>
        <Home path="/" />
        <MyAccount path="my-account" />
        {/* <AdminAllProducts path="all-product"/> */}
        <ProductList path ="admin/all-product"/>
        <AddnewProduct path="admin/new-product"/>
        {/* <AdminPage path="admin"/> */}
        <SignIn path="sign-in"/>
        <SignUp path="sign-up"/>
        {/* <Register path="register"/> */}
        <SingleProduct  path="product-details/:productId"/>
       
        <Cart path="/cart" />
       
      </Router>
      </GlobalProvider>
      
    </main>
  );
}

export default App;
