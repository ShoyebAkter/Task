import './App.css';
import { Routes,Route } from 'react-router-dom';
import Product from './Pages/Home/Products/Product';
import ClothDetails from './Pages/Home/Products/ClothDetails';
import CartDetails from './Pages/Cart/CartDetails';
import Header from './Pages/Home/Header';
import { Component } from 'react';

export default class App extends Component {
 state={
  priceIndex: 0
 }

 changeCurrency=(index)=>{
  // this.setState({ priceIndex: index})
  // console.log(this.state.priceIndex)
  console.log(index)
}

 render(){
  return (
    <>
    <Header  changeCurrency={this.changeCurrency}/>
    <Routes>
     <Route path='/product/:id' element={<ClothDetails  />} />
     <Route path='/:nameId' element={<Product/>}/>
     <Route path='/cart' element={<CartDetails />}/>
   </Routes>
    </>
  );
 }
}

