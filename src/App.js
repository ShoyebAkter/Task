import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';

import { useQuery, gql } from "@apollo/client";
import { useDispatch, useSelector } from 'react-redux';
import { Routes,Route, useNavigate, useParams } from 'react-router-dom';
import Product from './Pages/Home/Products/Product';
import ClothDetails from './Pages/Home/Products/ClothDetails';
import { PRODUCTS_QUERY, SINGLEPRODUCT_QUERY } from './Pages/queries/queries';


function App() {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);
  const { singleData,sdLoading} = useQuery(SINGLEPRODUCT_QUERY);
  const dispatch = useDispatch();
  const getdata = useSelector((state) => state.cartreducer.carts);
  // const {id}=useParams();
  // const history = useNavigate();
  console.log(singleData)
  if (loading || sdLoading) return "Loading...";
  return (
    <>
    <Routes>
     <Route path='/' element={<Home 
    data={data}
    dispatch={dispatch}
    getdata={getdata}
    />} />
     <Route path='/cloth/:id' element={<ClothDetails singleData={singleData} />} />
   </Routes>
    </>
  );
}

export default App;
