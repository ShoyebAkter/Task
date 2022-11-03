import './App.css';
import { Routes,Route } from 'react-router-dom';
import Product from './Pages/Home/Products/Product';
import ClothDetails from './Pages/Home/Products/ClothDetails';
import CartDetails from './Pages/Cart/CartDetails';
import Header from './Pages/Home/Header';
import React, { Component } from 'react';
import Home from './Pages/Home/Home';

export default class App extends Component {
  

 render(){
  return (
    <div >
    <Header />
    <Routes>
      <Route path='/' element={<Home/>}/>
    <Route exact path='/:nameId' element={<Product/>}/>
     <Route  path='/product/:id' element={<ClothDetails  />} />
     <Route path='/cart' element={<CartDetails />}/>
   </Routes>
    </div>
  );
 }
}

