// React
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Shopify
import Client from "shopify-buy";

// Screens
import Shop from "./components/Shop";
import Cart from "./components/Cart";

// Assets 
import Background from "./assets/background_default.png";
import Logo from "./assets/keith_logo.svg";
import CartIcon from "./assets/shopping_bag_icon.svg";

// Style 
import "./App.css"

export default function App() {

  // Site-Wide State
  const [shopClientTimestamp, setShopClientTimestamp] = useState(Date.now());
  const [shopClient, setShopClient] = useState(undefined);
  const [checkoutID, setCheckoutID] = useState(localStorage.getItem("checkoutID"));
  const [checkoutURL, setCheckoutURL] = useState(localStorage.getItem("checkoutURL"));
  const [cartSize, setCartSize] = useState(undefined);

  useEffect(() => {
    const shopClient = Client.buildClient({
      domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
      storefrontAccessToken: process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN
    });
    setShopClient(shopClient);
    setShopClientTimestamp(Date.now());

    if (!checkoutID || !checkoutURL) {
      shopClient.checkout.create().then((checkout) => {
        setCheckoutID(checkout.id);
        setCheckoutURL(checkout.webUrl);
        updateShopClient();
        // Persist the cart
        localStorage.setItem("checkoutID", checkout.id);
        localStorage.setItem("checkoutURL", checkout.webUrl);
      });
    }

    // Get size of cart
    if (checkoutID) {
      shopClient?.checkout.fetch(checkoutID).then((_checkout) => { 
        if (_checkout === null) return;
        var _cartSize = 0;
        _checkout.lineItems.map((lineItem) => {
          _cartSize += lineItem.quantity;
        });
        setCartSize(_cartSize);
      });
    }
  
  }, []);

  const updateShopClient = () => {
    setShopClientTimestamp(Date.now());
  }

  return (
      <Router>
        <div>
          <div style={{ backgroundImage: `url(${Background}` }} className="background" />
          <nav>
            <img src={Logo} alt="Logo" />
            <div className="header-links">
              <Link to="/shop">Shop</Link>
            </div>
            <Link to="/cart" class="header-cart-link">
              <img src={CartIcon} alt="Cart Icon" />
              {cartSize && `(${cartSize})`}
            </Link>
          </nav>
          <div className="page">
            <Switch>
              <Route path="/cart">
                <Cart 
                  key={shopClientTimestamp}
                  shopClient={shopClient}
                  checkoutID={checkoutID}
                  checkoutURL={checkoutURL}
                  updateShopClient={updateShopClient}
                />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/">
                <Shop 
                  key={shopClientTimestamp}
                  shopClient={shopClient}
                  checkoutID={checkoutID}
                  updateShopClient={updateShopClient}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}