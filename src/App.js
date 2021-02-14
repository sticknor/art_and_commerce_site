import React, { useState, useEffect } from "react";
import Client from 'shopify-buy';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Screens
import Shop from './screens/Shop';
import Cart from './screens/Cart';

export default function App() {

  // Site-Wide State
  const [shopClientTimestamp, setShopClientTimestamp] = useState(Date.now());
  const [shopClient, setShopClient] = useState(undefined);
  const [checkoutID, setCheckoutID] = useState(localStorage.getItem('checkoutID'));
  const [checkoutURL, setCheckoutURL] = useState(localStorage.getItem('checkoutURL'));

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
        localStorage.setItem('checkoutID', checkout.id);
        localStorage.setItem('checkoutURL', checkout.webUrl);
      });
    }
  
  }, []);

  const updateShopClient = () => {
    setShopClientTimestamp(Date.now());
  }

  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/shop">
              <Shop 
                key={shopClientTimestamp}
                shopClient={shopClient}
                checkoutID={checkoutID}
                updateShopClient={updateShopClient}
              />
            </Route>
            <Route path="/cart">
              <Cart 
                key={shopClientTimestamp}
                shopClient={shopClient}
                checkoutID={checkoutID}
                checkoutURL={checkoutURL}
                updateShopClient={updateShopClient}
              />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}