import { gql } from '@apollo/client';
import React, { Component } from 'react';
import {ADD} from '../../../redux/action/action'
import './ClothDetails.css'
import { withParams } from '../../customhook/HOC';
import { connect } from 'react-redux';
import { PRODUCT_QUERY } from '../../queries/productQuery';



class ClothDetails extends Component {
  state = {
    productData: [],
    currencyIndex:null,
    isActive: "",
    description:"",
    gallery:[],
    prices:[],
    symbol:"",
    galleryIndex:0
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const productId = this.props.params.id;
    // const priceAmount=this.state.productData.prices[this.props.currencyIndex].amount;
    //  console.log(priceAmount);

    

    await fetch('http://localhost:4000/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PRODUCT_QUERY, variables: { id: productId } })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        this.setState({ productData: result.data.product });
        const regex = /(<([^>]+)>)/ig
        const newString=result.data.product.description
        console.log(newString);
        this.setState({description:newString.replace(regex,'')})
        this.setState({gallery:result.data.product.gallery})
        this.setState({prices:result.data.product.prices})
        // console.log(this.state.productData)
        // console.log(this.state.categoryName)
      })
      
      // 
      // this.setState({description:newString});
  }
  send=()=>{
    this.props.ADD(this.state.productData,this.state.isActive)
  }

  render() {
    // const priceAmount=this.state.prices[this.props.currencyIndex]
    // console.log(priceAmount)
    // const {id} = this.state.productData[0];
    // console.log(id);
    return (
      <div className='clothcontainer'>
        <div className='imageContainer'>
          {
            this.state.gallery.map((singlepic,index)=>{
              return(
                <div className='detailsPic'>
                  <img key={index}
                onClick={()=>this.setState({galleryIndex:index})}
                 style={{}}
                  src={singlepic} alt=""/>
                </div>
              )
            })
          }
        </div>
        <div className='productImage'>
          <img  src={this.state.gallery[this.state.galleryIndex]}  alt='' ></img>
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
                        // ((attribute.id=== "Size")||(attribute.id==="Capacity")) &&
                        <div>{attribute.name}:</div>

                      }
                      
                      </div>
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
                                      "background": `${size.value}`,
                                      "border": this.state.isActive===size.value ? "1px solid #5ECE7B" : "1px solid #1D1F22"
                                    }}
                                    className='colorarea'
                                    onClick={() => { 
                                      this.setState({ isActive: size.value })
                                    }}
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
                                    onClick={() => { this.setState({ isActive: size.value }) 
                                    
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
          <div className='totalprice'>{this.state.prices[this.props.currencyIndex]?.currency?.symbol} {this.state.prices[this.props.currencyIndex]?.amount}</div>
          {
            (this.state.productData.attributes?.length>0) ? 
            <div><button disabled={!this.state.isActive} className='cartbutton' onClick={()=>this.send()}>Add to Cart</button></div>
            :
            <div><button className='cartbutton' onClick={()=>this.send()}>Add to Cart</button></div>
          }
          <div className='descriptiontext' >{this.state.description}</div>
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

export default  connect(mapStateToProps, { ADD })(withParams(ClothDetails))