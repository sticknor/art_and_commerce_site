// React
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Components
import Card from './Card';
// Assets
import CardDefault from './../assets/shop_card_default.png';

export default function Detail(props) {
  const { id } = useParams();

  const {
    title,
    images,
    price,
    sold,
    rotation,
    products,
    onClickProduct,
    shopClient,
    checkoutID,
    updateShopClient,
    backgroundImage,
  } = props;

  const [imageIndex, setImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  useEffect(() => {
    for (var _product of products) {
      if (_product.handle === id) setProduct(_product);
    }
  }, [id, products]);

  useEffect(() => {
    if (product != null && product.images !== undefined) {
      product.images?.forEach((_image) => {
        const img = new Image();
        img.src = _image.src;
      });

      setPrevEnabled(imageIndex - 1 >= 0);
      setNextEnabled(imageIndex + 1 < product.images.length);
    }
  }, [product, imageIndex]);

  const addToCart = (productID) => {
    const lineItemsToAdd = [
      {
        variantId: productID,
        quantity: 1,
      },
    ];

    shopClient?.checkout.addLineItems(checkoutID, lineItemsToAdd).then(() => {
      updateShopClient();
    });
  };

  const handlePrevClick = () => {
    setImageIndex(imageIndex - 1);
    setPrevEnabled(imageIndex - 1 >= 0);
    setNextEnabled(imageIndex + 1 < product.images.length);
  };

  const handleNextClick = () => {
    setImageIndex(imageIndex + 1);
    setPrevEnabled(imageIndex - 1 >= 0);
    setNextEnabled(imageIndex + 1 < product.images.length);
  };

  if (product == null) return <div>loading...</div>;
  return (
    <>
      <div
        className="detailLeftCol"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="detail-card">
          <Card
            title={product.title}
            image={product.images[imageIndex]}
            price={product.variants[0].price}
            sold={false}
          />
        </div>
        {prevEnabled && (
          <div className={'prev-button'} onClick={handlePrevClick}></div>
        )}
        {nextEnabled && (
          <div className={'next-button'} onClick={handleNextClick}></div>
        )}
      </div>

      <div className="detail-right-col">
        <div className="menu-divider" />
        <div className="detail-section" style={{ fontWeight: 600 }}>
          {product.title}
        </div>
        <div className="detail-section">{product.description}</div>
        <div className="detail-section">${product.variants[0].price}</div>
        <div
          className="add-to-bag-button detail-section"
          onClick={() => {
            addToCart(product.variants[0].id);
          }}
        >
          {' '}
          Add to bag
        </div>
      </div>
    </>
    // <div style={{ width: '25vw', minWidth: '300px', position: 'relative', margin: '24px', transform: `rotate(${rotation}deg)` }}>
    //     <div className={"card-container"}>
    //         { /* Buy now button */ }
    //         {/* <div
    //             style={{ cursor: 'pointer', fontWeight: 'bold' }}
    //             onClick={() => { addToCart(product.variants[0].id)}}
    //         >
    //             ADD TO CART
    //         </div> */}
    //         <img className={"card-image-underlay"} alt={title} style={{ width: '81%', left: '7%' }} src={images[imageIndex].src} />
    //         <img className={"card-graphic-overlay"} src={CardDefault} />
    //         <div className={"card-text-overlay"}>
    //             <div className={"card-title"}>{title}</div>
    //             {sold
    //               ? <div className={"card-price card-sold-out"}>{'Sold\nout'}</div>
    //               : <div className={"card-price"}>{`$${price.split('.')[0]}`}</div>
    //             }
    //         </div>

    //     </div>
    // </div>
  );
}
