import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';

import { useQuery, gql } from "@apollo/client";
import { useDispatch, useSelector } from 'react-redux';
import { Routes,Route, useNavigate, useParams } from 'react-router-dom';
import Product from './Pages/Home/Products/Product';
import ClothDetails from './Pages/Home/Products/ClothDetails';
import { PRODUCTS_QUERY, SINGLEPRODUCT_QUERY } from './Pages/queries/queries';
import CartDetails from './Pages/Cart/CartDetails';
import Header from './Pages/Home/Header';


function App() {
  const dispatch = useDispatch();
  const getdata = useSelector((state) => state.cartreducer.carts);
  
  return (
    <>
    <Header  getdata={getdata}/>
    <Routes>
     <Route path='/product/:id' element={<ClothDetails  />} />
     <Route path='/:nameId' element={<Product  dispatch={dispatch}/>}/>
     <Route path='/cart' element={<CartDetails getdata={getdata}/>}/>
   </Routes>
    </>
  );
}

export default App;
