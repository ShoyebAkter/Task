import { gql } from '@apollo/client';
import React, { Component } from 'react';
import { Query } from 'react-apollo'
import './ClothDetails.css'
import { withParams } from '../../customhook/HOC';



class ClothDetails extends Component {
  state = {
    productData: [],
    isActive: false
  };

  componentDidMount() {
    this.fetchProduct();
    console.log(this.props)
  }

  fetchProduct = async () => {
    const productId = this.props.params.id;
    //  console.log(productId);

    const PRODUCT_QUERY = `
query getproduct($id: String!){
  product(id:$id){
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
  },
  attributes{
    id,
    name,
    type,
    items{
      displayValue,
      value,
      id
    }
  }
} 
}
`

    await fetch('http://localhost:4000/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PRODUCT_QUERY, variables: { id: productId } })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        this.setState({ productData: result.data.product })
        console.log(this.state.productData)
        // console.log(this.state.categoryName)
      })
  }

  render() {
    console.log(this.state.productData)
    const regex = /(<([^>]+)>)/ig;
    // const {id} = this.state.productData[0];
    // console.log(id);
    return (
      <div className='clothcontainer'>
        <div >
          <img style={{"height":"500px"}}  alt='' ></img>
        </div>
        <div className='detailsgroup'>
          <div className="nametext">{this.state.productData.brand} </div>
          <div className='brandtext'>{this.state.productData.name}</div>
          {/* <div className="nametext">Brand: </div>
          <div className='brandtext'>Name: </div> */}
          <div >
            {
              this.state.productData.attributes?.map((attribute => {
                return (
                  <div style={{"marginBottom":"24px"}}>
                    <div className='sizetext'>{attribute.name}:</div>
                    <div className='valuetag'>

                      {
                        attribute.type === "swatch" ?
                          attribute.items.map((size, index) => {
                            // console.log(size.value);
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
                            // console.log(size.value);
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
          <div className='pricetext'>Price</div>
          <div className='totalprice'>$50</div>
          <div className='descriptiontext' >{this.state.productData.description}</div>
          <div><button className='cartbutton'>Add to Cart</button></div>
          
        </div>
      </div>

    )
  }
}

export default withParams(ClothDetails)