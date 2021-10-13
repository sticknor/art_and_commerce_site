// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Router, useParams } from 'react-router-dom';

// Components
import Card from './Card';

export default function Shop(props) {
  const { shopClient, checkoutID, updateShopClient, products, categories } =
    props;
  const { id } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (id !== undefined && categories[id] !== undefined) {
      setFilteredProducts(categories[id]);
    } else {
      setFilteredProducts(products);
    }
  }, [id, products, categories]);

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   // Fetch all products in your shop
  //   shopClient?.product.fetchAll().then((_products) => {
  //     console.log(_products);
  //     setProducts(_products);
  //   });
  // }, []);

  // const addToCart = (productID) => {
  //   const lineItemsToAdd = [{
  //     variantId: productID,
  //     quantity: 1
  //   }];

  //   shopClient?.checkout.addLineItems(checkoutID, lineItemsToAdd).then(() => {
  //     updateShopClient();
  //   })
  // }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <div className="products-grid">
      {filteredProducts.map((product, index) => {
        return (
          <Link to={`/product/${product.handle}`}>
            <div
              className={`product-card`}
              style={{
                transform: `rotate(${getRandomArbitrary(-0.8, 0.8)}deg)`,
              }}
            >
              <Card
                key={index}
                title={product.title}
                image={product.images[0]}
                price={product.variants[0].price}
                sold={index % 2 === 0}
              />
            </div>
          </Link>
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
