import React, { Component } from 'react'
import { ADD } from '../../../redux/action/action'
import './Cloth.css'
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux'

class Cloth extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        this.state={
            product: this.props.cloth,
            currencyIndex:null
        }
        this.send=this.send.bind(this)
    }


    send=(ele)=>{
        this.props.ADD(ele)
    }
  render()
  
  {
    console.log(this.props)
    return (
      <div className='product'>
        <div >
          <NavLink to={`/product/${this.state.product.id}`}>
          <img src={this.state.product.gallery[0]} alt=""></img>
          </NavLink>
          </div>
        <div>{this.state.product.name}</div>
        <div>{this.state.product.brand}</div>
        {this.state.product.description}
        <div>{this.state.product.prices[this.props.currencyIndex].amount}</div>
        <div><button onClick={()=> this.send(this.state.product)}>Add to cart</button></div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return{
    currencyIndex: state.cartreducer.priceIndex
  }
}

export default connect(mapStateToProps,{ADD})(Cloth)