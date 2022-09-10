import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Cartdetails.css'
import plus from '../../assets/plus-square2.png'
import minus from '../../assets/minus-square2.png'

class CartDetails extends Component {
  state = {
    cartDetails: [],
    currencyIndex: null,
    isActive: null
  }


  render() {
    console.log(this.state.cartDetails)
    return (
      <div className='cartcontainer'>
        {
          this.props.cartDetails.map((product, index) => {
            return (
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
                                                "background": this.state.isActive === size.value ? "#1D1F22" : "",
                                                "color": this.state.isActive === size.value && "#FFFFFF",
                                              }}
                                              className='valuearea'
                                              onClick={() => { this.setState({ isActive: size.value }) }}
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
                    <div><img style={{ "height": "45px", "width": "45px", "border": " 1px solid #1D1F22" }} src={plus} alt="" /></div>
                    <div>1</div>
                    <div><img style={{ "height": "45px", "width": "45px", "border": " 1px solid #1D1F22" }} src={minus} alt="" /></div>
                  </div>
                </div>
                <div style={{ "margin-left": "24px" }} className='imagecontainer' >
                  <img style={{ "width": "200px", "height": "288px" }} src={product.gallery[0]} alt='' />
                </div>
              </div>
            )
          })
        }
        <div className='totalarea'>
          <div className='taxarea'>
            <div >Tax 21% : $42</div>
            <div>Quantity : 3</div>
            <div>Total: 200</div>
          </div>
          <div className='orderbutton'>
            <div className='ordertext'>Order</div>
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


export default connect(mapStateToProps)(CartDetails)