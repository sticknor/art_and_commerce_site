// React
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Components 
import Card from './Card';

export default function Shop(props) {

  const {
    shopClient,
    checkoutID,
    updateShopClient
  } = props;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products in your shop
    shopClient?.product.fetchAll().then((_products) => { setProducts(_products); });
  }, []);

  // const addToCart = (productID) => {
  //   const lineItemsToAdd = [{
  //     variantId: productID,
  //     quantity: 1
  //   }];

  //   shopClient?.checkout.addLineItems(checkoutID, lineItemsToAdd).then(() => {
  //     updateShopClient();
  //   })
  // }

  return (
    <div className="products-grid">
      {products.map((product, index) => {
        return (
          <React.Fragment>
            <Card
              key={index}
              title={product.title}
              images={product.images}
              price={product.variants[0].price}
              sold={false}
            />
            <Card
              key={index}
              title={product.title}
              images={product.images}
              price={product.variants[0].price}
              sold={false}
            />
            <Card
              key={index}
              title={product.title}
              images={product.images}
              price={product.variants[0].price}
              sold={false}
            />
          </React.Fragment>
          // { /* Buy now button */ }
          // {/* <div 
          //   style={{ cursor: 'pointer', fontWeight: 'bold' }} 
          //   onClick={() => { addToCart(product.variants[0].id)}}
          // >
          //   ADD TO CART
          // </div> */}
        );
      })}
    </div>
  );
}