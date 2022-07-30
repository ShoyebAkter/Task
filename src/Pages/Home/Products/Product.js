import React, { Component } from 'react'
import Cloth from './Cloth'
import './Product.css'
import {withParams} from '../../customhook/HOC'



 class Product extends Component {

  state={
    category: [],
    categoryName: "all"
  }

    componentDidMount(){
      this.fetchCategory()
      // console.log(this.props)
      // console.log(this.props.params.nameId)
      
    }

    async fetchCategory(){
      const name="all";
      const CATEGORY_QUERY= `       
        query getcategory($title: String!){
          category(input: {title: $title}){
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

      
      fetch('http://localhost:4000/',{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({query:CATEGORY_QUERY,variables:{title: name}})
      })
      .then(res=> res.json())
      .then(result=>
        {
          
          // this.setState({category: result.data.category.products})
          // this.setState({categoryName: this.props.params.nameId})
          console.log(result)
          // console.log(this.state.categoryName)
        })
    }
  render()
  {
    // const { name } = this.props.match.params['name'];
    return (
      <div>
        {/* <div>Name: {name} </div> */}
        <div>Name</div>
        {/* <div className='products'>
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
        </div> */}
      </div>

    )
  }
}
export default withParams(Product)