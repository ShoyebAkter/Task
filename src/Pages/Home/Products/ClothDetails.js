import { gql } from '@apollo/client';
import React, { Component } from 'react';
import { ADD } from '../../../redux/action/action'
import './ClothDetails.css'
import { withParams } from '../../customhook/HOC';
import { connect } from 'react-redux';
import { PRODUCT_QUERY } from '../../queries/productQuery';
import styled from 'styled-components';
const Colorbox=styled.div`
background: ${props=>props.bg};
box-sizing: border-box;
    width: 32px;
    height: 32px;
`
class ClothDetails extends Component {
  state = {
    productData: [],
    currencyIndex: null,
    isActive: "",
    description: "",
    gallery: [],
    prices: [],
    symbol: "",
    galleryIndex: 0
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const productId = this.props.params.id;
    await fetch('http://localhost:4000/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PRODUCT_QUERY, variables: { id: productId } })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        this.setState({ productData: result.data.product });
        const newString = result.data.product.description
        this.setState({ description: newString })
        this.setState({ gallery: result.data.product.gallery })
        this.setState({ prices: result.data.product.prices })
      })
  }
  send = () => {
    this.props.ADD(this.state.productData, this.state.isActive)
  }
  
 
  render() {
    return (
      <div className='clothcontainer'>
        <div className='imageContainer'>
          {
            this.state.gallery.map((singlepic, index) => {
              return (
                <div className='detailsPic'>
                  <img key={index}
                    onClick={() => this.setState({ galleryIndex: index })}
                    src={singlepic} alt="" />
                </div>
              )
            })
          }
        </div>
        <div className='productImage'>
          <img src={this.state.gallery[this.state.galleryIndex]} alt='' ></img>
        </div>
        <div className='detailsgroup'>
          <div className="nametext ">{this.state.productData?.brand}</div>
          <div className='brandtext'>{this.state.productData?.name}</div>
          <div >
            {
              this.state.productData.attributes?.map((attribute => {
                return (
                  <div className='attribute'>
                    <div className='sizetext'>
                      {
                        <div>{attribute.name}:</div>

                      }

                    </div>
                    <div className='valuetag'>

                      {
                        attribute.type === "swatch" ?
                          attribute.items.map((size, index) => {
                            return (
                              <div id='myroot'>
                                {
                                  <Colorbox  bg={size.value} key={index}
                                    
                                    className={`${this.state.isActive === size.value?'activecolorarea':'colorarea'}`}
                                    onClick={() => {
                                      this.setState({ isActive: size.value })
                                      
                                    }}
                                  ></Colorbox >
                                }
                              </div>
                            )
                          }) :
                          attribute.items.map((size, index) => {
                            return (
                              <div>
                                {
                                  <div key={index}
                                    className={`${this.state.isActive===size.value? 'clothvaluearea':'clothsvaluearea'}`}
                                    
                                    onClick={() => {
                                      this.setState({ isActive: size.value })

                                    }}
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
          <div className='pricetext'>Price: </div>
          <div className='totalprice'>{this.state.prices[this.props.currencyIndex]?.currency?.symbol}
           {this.state.prices[this.props.currencyIndex]?.amount}</div>
          {
            (this.state.productData.attributes?.length>0) &&
            (this.state.productData?.inStock)?
              <div><button disabled={!this.state.isActive} onClick={() => this.send()}
                className='cartbutton'>Add to Cart</button></div>
              :
              <div><button disabled className='cartbutton' >Add to Cart</button></div>

          }
          <div className='descriptiontext' dangerouslySetInnerHTML={{ __html: this.state.description }}></div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    currencyIndex: state.cartreducer.priceIndex
  }
}

export default connect(mapStateToProps, { ADD })(withParams(ClothDetails))