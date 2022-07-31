import React, { Component } from 'react'
import { ADD } from '../../../redux/action/action'
import './Cloth.css'
import { NavLink } from 'react-router-dom';

export default class Cloth extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        this.state={
            cloth: this.props.cloth
        }
        this.send=this.send.bind(this)
    }

    send=(ele)=>{
        this.props.dispatch(ADD(ele))
    }
  render()
  
  {
    return (
      <div className='product'>
        <div >
          <NavLink to={`/product/:${this.state.cloth.id}`}>
          <img src={this.state.cloth.gallery[2]} alt=""></img>
          </NavLink>
          </div>
        <div>{this.state.cloth.name}</div>
        <div>{this.state.cloth.brand}</div>
        {this.state.cloth.description}
        <div>{this.state.cloth.prices[0].amount}</div>
        <div><button onClick={()=> this.send(this.state.cloth)}>Add to cart</button></div>
      </div>
    )
  }
}
