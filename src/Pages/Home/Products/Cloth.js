import React, { Component } from 'react'
import { ADD } from '../../../redux/action/action'
import './Cloth.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import Cartbutton from '../../../assets/Empty Cart.png'

class Cloth extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
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
    // console.log(this.state.total)
    return (
      <div className='product'>
        <div style={{ "position": "relative" }}>
          <NavLink to={`/product/${this.state.product.id}`}>
            {
              this.state.product.inStock ?
                <div>
                  <img src={this.state.product.gallery[0]} alt=""></img>
                  <div style={{
                    "background": "#5ECE7B", "height": "41px", "width": "41px",
                    "cursor": "pointer", "borderRadius": "50%",
                    "position": "absolute",
                    "right": "5px",
                    "bottom": "-15px"
                  }} onClick={() => {
                    this.send(this.state.product);

                  }}>
                    <img style={{ "height": "24px", "width": "24px", "display": "flex", "justifyContent": "center", "paddingTop": "7px" }} src={Cartbutton} alt='' />
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
            <div className='textarea'>
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
    currencyIndex: state.cartreducer.priceIndex
  }
}

export default connect(mapStateToProps, { ADD })(Cloth)