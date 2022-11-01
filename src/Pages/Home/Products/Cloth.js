import React, { Component } from 'react'
import { ADD } from '../../../redux/action/action'
import './Cloth.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import Cartbutton from '../../../assets/Empty Cart.png'

class Cloth extends Component {
  constructor(props) {
    super(props)
    // console.log(this.props)
    this.state = {
      cart:[],
      product: this.props.cloth,
      currencyIndex: null,
      total: 0
    }
    this.send = this.send.bind(this)
  }


  send = (ele) => {
    this.props.ADD(ele)
  }
  render() {
    console.log(this.props.cart.includes(this.state.product))
    return (
      <div className='product'>
        <div style={{ "position": "relative" }}>
          <NavLink to={`/product/${this.state.product.id}`}>
            {
              this.state.product.inStock ?
                <div>
                  <img src={this.state.product.gallery[0]} alt=""></img>
                  <div>
                  {
                    (this.state.product.attributes.length===0 && !this.props.cart.includes(this.state.product) ) &&
                    <div className='cartButton'
                     onClick={() => {
                      this.send(this.state.product);
                    }}>
                      
                        <div>
                          <img style={{ "height": "24px", "width": "24px", "display": "flex", "justifyContent": "center", "paddingTop": "7px" }} src={Cartbutton} alt='' />
                        </div>
                      
                    </div>
                  }
                  </div>
                </div>
                :
                <div>
                  <img src={this.state.product.gallery[0]} alt=""></img>
                  <div className='outOfStock'>OUT OF STOCK</div>
                </div>
            }

          </NavLink>

        </div>
        {
          this.state.product.inStock ?
            <div className='textarea'>
              <div className='productname'>{this.state.product.name}</div>
              <div className='pricearea'>
                {this.state.product.prices[this.props.currencyIndex].currency.symbol}
                {this.state.product.prices[this.props.currencyIndex].amount}</div>

            </div>
            :
            <div className='outofStocktextarea'>
              <div className='outProduct'>{this.state.product.name}</div>

              <div className='outpricearea'>{this.state.product.prices[this.props.currencyIndex].currency.symbol}{this.state.product.prices[this.props.currencyIndex].amount}</div>

            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartreducer.carts,
    currencyIndex: state.cartreducer.priceIndex
  }
}

export default connect(mapStateToProps, { ADD })(Cloth)