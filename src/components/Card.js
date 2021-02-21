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

  const [imageIndex, setImageIndex] = useState(0);
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const handlePrevClick = () => {
    setImageIndex(imageIndex - 1);
  }

  const handleNextClick = () => {
    console.log('handle nxt lci')
    setImageIndex(imageIndex + 1);
  }

  useEffect(() => {
    setPrevEnabled(imageIndex - 1 >= 0);
    setNextEnabled(imageIndex + 1 < images.length);
  }, [imageIndex]);

  useEffect(() => {
    images.forEach((_image) => {
        const img = new Image();
        img.src = _image.src;
    });
  }, []);

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
            <img className={"card-image-underlay"} alt={title} style={{ width: 300 }} src={images[imageIndex].src} />
            <img className={"card-graphic-overlay"} src={CardDefault} />
            <div className={"card-text-overlay"}>
                <div className={"card-title"}>{title}</div>
                <div className={"card-price"}>${price.split('.')[0]}</div>
            </div>
            {prevEnabled && <div className={"prev-button"} onClick={handlePrevClick}></div>}
            {nextEnabled && <div className={"next-button"} onClick={handleNextClick}></div>}
        </div>
    </div>
  );
}