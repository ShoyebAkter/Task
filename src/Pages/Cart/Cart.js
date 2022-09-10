import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux/es/exports'
import './Cart.css'
import plus from '../../assets/plus-square.png'
import minus from '../../assets/minus-square.png'

class Cart extends Component {
    state = {
        cart: [],
        currencyIndex: null
    }

    render() {
        console.log(this.props.getdata)
        console.log(this.props)
        return (
            <div className='cartcontainer'>

                {
                    this.props.cart.length ?
                        <div className='itemcontainer' >
                            <div className='totalitem'>My Bag: {this.props.cart.length}items</div>
                            <div className='itembox'>
                                {
                                    this.props.cart.map((element => {
                                        return (
                                            <div>


                                                <div className='singleitem'>
                                                    <div className='itemdetails'>
                                                        <div className='itemtext'>
                                                            <div className='nameprice'>
                                                                <div className='productname'>{element.name}</div>
                                                                <div className='productprice'>{element.prices[this.props.currencyIndex].amount}</div>
                                                            </div>
                                                            <div className='title'>{element.attributes[0].name}:
                                                                <div className='sizeframe'>
                                                                    {
                                                                        element.attributes[0].items.map(attribute => {
                                                                            return (
                                                                                <div className='sizevalue'>{attribute.value}</div>

                                                                            )
                                                                        })
                                                                    }
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className='buttonarea'>
                                                            <div><img className='plusclass' src={plus} alt="" /></div>
                                                            <div>1</div>
                                                            <div><img className='plusclass' src={minus} alt="" /></div>
                                                        </div>

                                                    </div>
                                                    <div  >
                                                        <img className='imagecontainer' src={element.gallery[0]} alt="" />
                                                    </div>
                                                </div>
                                            </div>


                                        )
                                    }))
                                }
                            </div>
                            <div className='total'>
                                <div> Total </div>
                                <div> Price </div>
                            </div>

                        </div>
                        :
                        <div>Cart is empty</div>
                }
                <div className='buttoncontainer'>
                    <NavLink className='bagbutton' to={`/cart`}>View Bag</NavLink>
                    <NavLink className='checkoutbutton' to={`/cart`}>Checkout</NavLink>
                </div>
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

export default connect(mapStateToProps)(Cart);