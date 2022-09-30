import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Cartdetails.css'
import plus from '../../assets/plus-square2.png'
import minus from '../../assets/minus-square2.png'
import { ADD, REMOVE,DLTONE } from '../../redux/action/action'

class CartDetails extends Component {
  state = {
    cartDetails: [],
    currencyIndex: null,
    isActive: null,
    total: 0
  }

  add = (ele) => {
    this.props.ADD(ele);
  }
  remove = (ele) => {
    this.props.REMOVE(ele)
  }
  deleteOne=(id)=>{
    this.props.DLTONE(id)
}

  render() {
    let total=0;
    let quantity=0;
    let symbol;
    let tax;
    console.log(this.state.cartDetails)
    return (
      <div className='cartcontainer'>
        <div className='carttext'>Cart</div>
        {
          this.props.cartDetails.map((product, index) => {
            quantity=quantity+product.qnty;
            total=total+product.prices[this.props.currencyIndex].amount*product.qnty;
            symbol=product.prices[this.props.currencyIndex].currency.symbol;
            tax=0.21*total;
            return (
              <div key={index}>
                <div className='line'></div>
                <div className='container'>

                  <div className='detailscontainer'>
                    <div className='details'>
                      <div className='nametag'>{product.name}</div>
                      <div className='pricetag'>{product.prices[this.props.currencyIndex].currency.symbol} {product.prices[this.props.currencyIndex].amount}</div>
                      <div >
                        {
                          product.attributes.map((attribute => {
                            return (
                              <div>
                                <div className='sizetext'>{attribute.name}:</div>
                                <div className='valuetag'>
                                  {
                                    attribute.type === "swatch" ?
                                      attribute.items.map((size, index) => {
                                        console.log(size.value);
                                        return (
                                          <div>
                                            {
                                              <div key={index}
                                                style={{
                                                  "color": "#FFFFFF",
                                                  "background": `${size.value}`
                                                }}
                                                className='colorarea'
                                              ></div>
                                            }
                                          </div>
                                        )
                                      }) :
                                      attribute.items.map((size, index) => {
                                        console.log(size.value);
                                        return (
                                          <div>
                                            {
                                              <div key={index}
                                                style={{
                                                  "background": (product.attribute===size.value)? "#1D1F22" : "",
                                                  "color":  (product.attribute===size.value)&& "#FFFFFF",
                                                }}
                                                className='valuearea'
                                              >{size.value}</div>
                                            }
                                          </div>
                                        )
                                      })
                                  }
                                </div>
                              </div>
                            )
                          }))
                        }
                      </div>
                    </div>
                    <div className='buttongroup'>
                      <div onClick={() => this.add(product)}><img style={{ "height": "45px", "width": "45px", "border": " 1px solid #1D1F22", "cursor": "pointer" }} src={plus} alt="" /></div>
                      <div>{product.qnty}</div>
                      <div onClick={product.qnty<=1?()=>this.deleteOne(product.id):() => this.remove(product)}><img style={{ "height": "45px", "width": "45px", "border": " 1px solid #1D1F22", "cursor": "pointer" }} src={minus} alt="" /></div>
                    </div>
                  </div>
                  <div style={{ "margin-left": "24px" }} className='imagecontainer' >
                    <img style={{ "width": "200px", "height": "288px" }} src={product.gallery[0]} alt='' />
                    
                  </div>
                </div>
              </div>
            )
          })
        }
        <div>
          <div className='line'></div>
          <div className='totalarea'>

            <div className='taxarea'>
              <div >Tax 21% : {symbol}{tax}</div>
              <div>Quantity : {quantity}</div>
              <div>Total: {symbol} {total}</div>
            </div>
            <div className='orderbutton'>
              <div className='ordertext'>Order</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cartDetails: state.cartreducer.carts,
    currencyIndex: state.cartreducer.priceIndex
  }
}


export default connect(mapStateToProps, { ADD, REMOVE,DLTONE })(CartDetails)