import React, { Component } from 'react'
import { ADD } from '../../../redux/action/action'
import './Cloth.css'
import { NavLink } from 'react-router-dom';

export default class Cloth extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        this.state={
            product: this.props.cloth,

        }
        this.send=this.send.bind(this)
    }

    componentDidMount(){
      
    }

    send=(ele)=>{
        this.props.dispatch(ADD(ele))
    }
  render()
  
  {
    return (
      <div className='product'>
        <div >
          <NavLink to={`/product/${this.state.product.id}`}>
          <img src={this.state.product.gallery[2]} alt=""></img>
          </NavLink>
          </div>
        <div>{this.state.product.name}</div>
        <div>{this.state.product.brand}</div>
        {this.state.product.description}
        <div>{this.state.product.prices[0].amount}</div>
        <div><button onClick={()=> this.send(this.state.product)}>Add to cart</button></div>
      </div>
    )
  }
}
