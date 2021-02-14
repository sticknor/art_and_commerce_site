import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Shop(props) {

  const {
    shopClient,
    checkoutID,
    updateShopClient
  } = props;

  const [products, setProducts] = useState([]);
  const [cartSize, setCartSize] = useState(undefined);

  useEffect(() => {
    // Fetch all products in your shop
    shopClient?.product.fetchAll().then((_products) => { setProducts(_products); });

    // Get size of cart
    if (checkoutID) {
      shopClient?.checkout.fetch(checkoutID).then((_checkout) => { 
        var _cartSize = 0;
        _checkout.lineItems.map((lineItem) => {
          _cartSize += lineItem.quantity;
        });
        setCartSize(_cartSize);
      });
    }
  }, []);

  const addToCart = (productID) => {
    const lineItemsToAdd = [{
      variantId: productID,
      quantity: 1
    }];

    shopClient?.checkout.addLineItems(checkoutID, lineItemsToAdd).then(() => {
      updateShopClient();
    })
  }

  return (
    <React.Fragment>
      <h2>About</h2>
      <CartIcon count={cartSize} />
      {products.map((product, index) => {
        return (
          <div key={index}>
            <div>{product.title}</div>
            <div>${product.variants[0].price}</div>
            { /* Buy now button */ }
            <div 
              style={{ cursor: 'pointer', fontWeight: 'bold' }} 
              onClick={() => { addToCart(product.variants[0].id)}}
            >
              ADD TO CART
            </div>
            <img alt={product.title} style={{ width: 300 }} src={product.images[0].src} />
          </div>
        );
      })}
    </React.Fragment>
  );
}

function CartIcon(props) {
  return (
    <div>{props.count}</div>
  );
}