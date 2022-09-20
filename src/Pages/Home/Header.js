import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Cart from '../Cart/Cart'
import Currencies from '../currency/Currencies'
import './Header.css'
import cartImage from '../../assets/Vector.png'
import headerIcon from '../../assets/VSF.png'
import currencyIcon from '../../assets/currency.png'
import Product from './Products/Product'
import cart from '../../assets/cart.png'

export default class Header extends Component {

    state = {
        categories: [],
        price: null,
        showCart: false,
        showCurrency: false
    }
    componentDidMount() {
        this.fetchCategories()
        // this.changeCurrency()
    }



    fetchCategories() {
        const CATEGORY_QUERY = {
            query: `
            query{
                categories{
                  name
                }
            }
            `
        }
        fetch('http://localhost:4000/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(CATEGORY_QUERY)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                const categoryArray = [];
                categoryArray.push(result.data.categories)
                // console.log(categoryArray)
                this.setState({ categories: result.data.categories })
                console.log(this.state.categories)
            })
    }

    render() {
        // console.log(this.props)
        const showHideClassName = this.state.showCart ? "modal display-block" : "modal display-none"
        return (
            <div>
                <div class="topnav" id="myTopnav">
                    <div class="navsection">
                        {
                            this.state.categories.map(category => {
                                const nameId = category.name;
                                return (
                                    <NavLink className="linkText" to={`/${nameId}`}>{nameId}</NavLink>
                                )
                            })
                        }
                    </div>
                    <div>
                        <img style={{ "height": "41px", "width": "41px", "marginBlock": "auto" }} src={headerIcon} alt="" />
                    </div>
                    <div className='actionbox'>
                        {
                            <div>
                                {/* <button onClick={() => this.setState({ showCurrency: !this.state.showCurrency })} style={{ "background": "#FFFFFF", "border": "none", "cursor": "pointer" }}>
                                <img style={{ "height": "29px", "width": "32px" }} src={currencyIcon} alt='' />
                            </button> */}
                                {/* <div  >
                                {
                                    this.state.showCurrency &&

                                    <Currencies changeCurrency={this.props.changeCurrency} />

                                }
                            </div> */}


                            </div>
                        }
                        <div >
                            <button onClick={() => this.setState({ showCart: !this.state.showCart })} style={{ "background": "#FFFFFF", "border": "none","cursor":"pointer" }} >
                                <img style={{ "height": "20px", "width": "25px" }} src={cartImage} alt="" />
                                {/* currency */}
                            </button>
                            <div className={showHideClassName}>
                                <section className="modal-main">
                                    <Cart/>
                                    
                                </section>
                            </div>

                            {/* <button className='dropbtn'>Cart
                        </button>
                        <div class="dropdown-content">
                            <Cart />
                        </div> */}
                        </div>

                    </div>

                </div>
                {/* {
                this.state.showCurrency &&
                <div style={{"background": "rgba(57, 55, 72, 0.22)","height":"100%","height": "1435px"}}>
                    My currency
                </div>
            } */}
            </div>
        )
    }
}
