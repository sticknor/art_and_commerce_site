import React, { useState, useEffect } from "react";

export default function Cart(props) {

  const {
    shopClient,
    checkoutID,
    checkoutURL,
    updateShopClient,
    closeBag
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
    <div style={{ display: 'flex', width: '100%' , flexDirection: 'column'}}>
      <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div>bag</div>
        <div onClick={closeBag}>close</div>
      </div>
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
        className={'checkoutButton'}
      >
        CHECKOUT
      </a>
      </div>
  );
}