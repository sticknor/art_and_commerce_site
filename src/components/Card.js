// React
import React, { useState, useEffect } from "react";

// Assets 
import CardDefault from "./../assets/shop_card_default.svg";

export default function Card(props) {

  const {
    title,
    images,
    price,
    sold
  } = props;

  return (
    <div style={{ width: '300px', position: 'relative', margin: '24px' }}>
        <div className={"card-container"}>
        { /* Buy now button */ }
        {/* <div 
            style={{ cursor: 'pointer', fontWeight: 'bold' }} 
            onClick={() => { addToCart(product.variants[0].id)}}
        >
            ADD TO CART
        </div> */}
        <img className={"card-image-underlay"} alt={title} style={{ width: 300 }} src={images[0].src} />
        <img className={"card-graphic-overlay"} src={CardDefault} />
        <div className={"card-text-overlay"}>
            <div className={"card-title"}>{title}</div>
            <div className={"card-price"}>${price.split('.')[0]}</div>
        </div>
        </div>
    </div>
  );
}