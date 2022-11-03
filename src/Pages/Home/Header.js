import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Cart from '../Cart/Cart'
import Currencies from '../currency/Currencies'
import './Header.css'
import cartImage from '../../assets/Vector.png'
import headerIcon from '../../assets/VSF.png'
import currencyIcon from '../../assets/currency.png'
import { CHANGECATEGORY } from '../../redux/action/action'
import Product from './Products/Product'
import dropdown from '../../assets/dropdown.png'
import up from '../../assets/updown.png'
import { connect } from 'react-redux'

class Header extends Component {

    state = {
        currencies: [],
        currencyIndex: 0,
        categories: [],
        price: null,
        showCart: false,
        showCurrency: false,
        currency: "",
        category: "",
        active: ""
    }
    constructor(props){
        super(props);
        this.box = React.createRef();
    }
      componentDidMount() {
        this.fetchCategories();
        this.fetchCurrency()
        // Adding a click event listener
        document.addEventListener('click', this.handleOutsideClick);
      }
     
      handleOutsideClick = (event) => {
        // console.log(this.box);
        if (this.box && !this.box.current.contains(event.target)) {
            this.setState({showCurrency:false})
            this.setState({showCart:false});
          }
        
      }


    changeCategory=(nameId)=>{
        this.setState({ active: nameId })
        this.props.CHANGECATEGORY(nameId)
    }

    removeScroll() {
        this.setState({ showCart: !this.state.showCart })
        this.setState({showCurrency:false})
        if (this.state.showCart) {
            document.body.style.overflow = ' unset';
        }
        else {
            document.body.style.overflow = 'hidden'
        }
    }

    fetchCurrency() {
        const CURRENCY_QUERY = {
            query: `
            query{
            currencies{
            label,
            symbol
                }
            }`
        }

        fetch('http://localhost:4000/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(CURRENCY_QUERY)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                this.setState({ currencies: result.data.currencies })
                // console.log(this.state.currencies)
            })
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

        let currencySymbol = this.state.currencies[this.props.currencyIndex]
        const showHideClassName = (this.state.showCart) ? "modal display-block " : "modal display-none"
        const showHideCurrencyClassName = this.state.showCurrency ? "modalCurrency display-block " : "modalCurrency display-none"
        console.log(currencySymbol)
        return (
            <body >
                <div class="topnav" id="myTopnav">
                    <div class="navsection">
                        {
                            this.state.categories.map(category => {
                                const nameId = category.name;
                                return (
                                    <Link
                                        style={{
                                            color: this.state.active === nameId ? "#5ECE7B" : "#1D1F22",
                                            borderBottom: this.state.active === nameId ? "2px solid #5ECE7B" : ""
                                        }}
                                        onClick={() => {
                                            this.changeCategory(nameId)
                                        }}
                                        className="linkText" to={`/${nameId}`} >{nameId}</Link>
                                )
                            })
                        }
                    </div>
                    <div>
                        <img style={{ "height": "41px", "width": "41px", "marginBlock": "auto" }} src={headerIcon} alt="" />
                    </div>
                    <div ref={this.box} className='actionbox'>
                        {
                            <div   style={{ 'width': "38px" }}>
                                <div   style={{"display":"flex","alignItems":"center"}}>
                                    <button className='currencyAction'
                                     onClick={() =>{
                                         this.setState({ showCurrency: !this.state.showCurrency })
                                         this.setState({showCart:false});
                                        }
                                    }
                                     >
                                        {this.state.currencies[this.props.currencyIndex]?.symbol}
                                    </button>
                                    {
                                        this.state.showCurrency ?
                                       <img style={{ "width": "9px", "height": "6px" }} src={up} alt="" />
                                       :
                                       <img style={{ "width": "9px", "height": "6px" }} src={dropdown} alt="" />
                                    }
                                </div>
                                <div className={showHideCurrencyClassName} >
                                    <section className="Currencymodal-main">
                                        <Currencies changeCurrency={this.props.changeCurrency} />
                                    </section>
                                </div>


                            </div>
                        }
                        <div  >
                            <button onClick={() => this.removeScroll()} style={{ "background": "#FFFFFF", "border": "none", "cursor": "pointer" }} >
                                <img  style={{ "height": "20px", "width": "25px" }} src={cartImage} alt="" />
                                <span class="icon-button__badge">{this.props.cart.length}</span>
                            </button>
                            <div className={showHideClassName}>
                                <section className="modal-main">
                                    <Cart />

                                </section>
                            </div>
                        </div>

                    </div>

                </div>

            </body>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cart: state.cartreducer.carts,
        currencyIndex: state.cartreducer.priceIndex
    }
}

export default connect(mapStateToProps, { CHANGECATEGORY })(Header)