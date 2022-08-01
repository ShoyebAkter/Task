import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Cart from '../Cart/Cart'
import Currencies from '../currency/Currencies'
import './Header.css'
import Product from './Products/Product'

export default class Header extends Component {

    state={
        categories: [],
        price: null
    }
    componentDidMount(){
        this.fetchCategories()
        // this.changeCurrency()
    }

    

    fetchCategories(){
        const CATEGORY_QUERY={
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
            const categoryArray=[];
                categoryArray.push(result.data.categories)
            // console.log(categoryArray)
            this.setState({categories:result.data.categories})
            console.log(this.state.categories)
            })
    } 

    render() {
        console.log(this.props)
        return (
            <div class="topnav" id="myTopnav">
                <div>
                {
                    this.state.categories.map(category=>{
                        const nameId=category.name;
                        return(
                            <NavLink to={`/${nameId}`}>{nameId}</NavLink>
                        )
                    })
                }
                </div>
                {/* <div>
                    Button
                </div> */}
                <div class="dropdown">
                    <button class="dropbtn">Currency
                    </button>
                    <div class="dropdown-content">
                        <Currencies changeCurrency={this.props.changeCurrency}/>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Cart
                    </button>
                    <div class="dropdown-content">
                        <Cart />
                    </div>
                </div>
            </div>
        )
    }
}
