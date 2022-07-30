import React, { Component } from 'react'
import Cloth from './Cloth'
import './Product.css'
import { withRouter } from "react-router-dom";



export default class Product extends Component {

  state={
    category: [],
    categoryName: ""
  }

    componentDidMount(){
      this.fetchCategory()
      // console.log(this.props)
      // console.log(this.props.match.params)
    }

    fetchCategory(){
      const CATEGORY_QUERY={
        query:`
        query {
          category(input: {title: "clothes"}){
            name,
            products{
              id,
              name,
              inStock,
              description,
              category,
              brand,
              gallery,
              prices{
                currency{
                  label,
                  symbol
                },
                amount
              }
            }
          }
      }
        `
      }

      fetch('http://localhost:4000/',{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(CATEGORY_QUERY)
      })
      .then(res=>res.json())
      .then(result=>
        {
          // console.log(result)
          this.setState({category: result.data.category.products})
          // console.log(this.state.category)
        })
    }
  render()
  {
    console.log(this.props)
    // const { name } = this.props.match.params['name'];
    return (
      <div>
        {/* <div>Name: {name} </div> */}
        <div>Name</div>
        <div className='products'>
        {
            this.state.category.map((cloth,index)=>{
                return(
                    <Cloth
                    key={index}
                    cloth={cloth}
                    dispatch={this.props.dispatch}
                    />
                )
            })
        }
        </div>
      </div>

    )
  }
}
