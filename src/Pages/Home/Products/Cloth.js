import React, { Component } from 'react'
import './Cloth.css'

export default class Cloth extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        this.state={
            cloth: this.props.cloth
        }
    }
  render() {
    return (
      <div className='product'>
        <div ><img src={this.state.cloth.gallery[2]} alt=""></img></div>
        <div>{this.state.cloth.name}</div>
        <div>{this.state.cloth.brand}</div>
        <div>{this.state.cloth.description}</div>
        <div>{this.state.cloth.prices[0].amount}</div>
        <div><button>Add to cart</button></div>
      </div>
    )
  }
}
