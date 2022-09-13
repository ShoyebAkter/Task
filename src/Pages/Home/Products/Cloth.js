import React, { Component } from 'react'
import { ADD } from '../../../redux/action/action'
import './Cloth.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

class Cloth extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      product: this.props.cloth,
      currencyIndex: null,
      total:0
    }
    this.send = this.send.bind(this)
  }
  

  send = (ele) => {
    this.props.ADD(ele)
    // console.log(ele.prices[this.props.currencyIndex].amount);
    // console.log(ele);
    // let totalPrice=ele.qnty*ele.prices[this.props.currencyIndex].amount;
    // console.log(totalPrice);
    // this.setState({total:totalPrice})
  }
  render() {
    // console.log(this.state.total)
    return (
      <div className='product'>
        <div className='image'>
          <NavLink to={`/product/${this.state.product.id}`}>
            <img src={this.state.product.gallery[0]} alt=""></img>
          </NavLink>
        </div>
        <div className='textarea'>
          <div className='productname'>{this.state.product.name}</div>
          
          <div className='pricearea'>{this.state.product.prices[this.props.currencyIndex].currency.symbol}{this.state.product.prices[this.props.currencyIndex].amount}</div>
          <div><button onClick={() => {
            this.send(this.state.product);
            
          }}>Add to cart</button></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currencyIndex: state.cartreducer.priceIndex
  }
}

export default connect(mapStateToProps, { ADD })(Cloth)