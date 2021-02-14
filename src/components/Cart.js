import React, { useState, useEffect } from "react";

export default function Cart(props) {

  const {
    shopClient,
    checkoutID,
    checkoutURL,
    updateShopClient
  } = props;

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Fetch all products in your cart
    if (checkoutID) {
        shopClient?.checkout.fetch(checkoutID).then((_checkout) => { 
            setCartProducts(_checkout.lineItems);
        });
    }

  }, []);

  const removeFromCart = (lineItemID) => {
    const lineItemIdsToRemove = [ lineItemID ];
    shopClient?.checkout.removeLineItems(checkoutID, lineItemIdsToRemove).then(() => {
        updateShopClient();
    });
  }

  return (
    <React.Fragment>
      <h2>Cart:</h2>
      <div>
        {cartProducts.map((lineItem, index) => {
            return (
            <div key={index}>
                <div>{lineItem.title}</div>
                <div>${lineItem.variant.price}</div>
                { /* Buy now button */ }
                <div 
                style={{ cursor: 'pointer', fontWeight: 'bold' }} 
                onClick={() => { removeFromCart(lineItem.id) }}
                >
                    Remove from cart
                </div>
                <img alt={lineItem.title} style={{ width: 300 }} src={lineItem.variant.image.src} />
            </div>
            );
        })}
      </div>
      <a 
        href={checkoutURL}
        target={'_blank'}
      >
        CHECKOUT
      </a>
    </React.Fragment>
  );
}