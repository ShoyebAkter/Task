import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Cart from '../Cart/Cart'
import Currencies from '../currency/Currencies'
import './Header.css'
import Product from './Products/Product'

export default class Header extends Component {

    state={
        categories: []
    }
    componentDidMount(){
        this.fetchCategories()
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
        return (
            <div class="topnav" id="myTopnav">
                <div>
                {
                    this.state.categories.map(category=>{
                        const name=category.name;
                        return(
                            <NavLink to={`/${name}`} onClick={()=> <Product category={category}/>}>{name}</NavLink>
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
                        <Currencies />
                    </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Cart
                    </button>
                    <div class="dropdown-content">
                        <Cart getdata={this.props.getdata}/>
                    </div>
                </div>
            </div>
        )
    }
}
