import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout"

function App() {

  const [product, setproduct] = useState({
    name: "React from FB",
    price: 10,
    productBy:"facebook"
  })

  const makePayment = token =>{
    const body = {
      token,
      product
    }
    const headers ={
      "Content-type": 'application/json'
    }

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(res => {
      console.log("Response", res)
      const {status} = res;
      console.log("status" , status)
    })
    .catch(err => console.log(err))

  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout 
          // stripeKey={process.env.REACT_APP_KEY}
          stripeKey="pk_test_51JYSXDSGlGZIYUSmsdUq0DCPIDYCU7ZaGKHGtcLiYCHtDQGBMN0RNGvW2J8gqP9hnR7BRbBCmchZLyJGiKcyTe2e00Vsj5kaau"
          token={makePayment}
          amount={product.price * 100}
        >
            <button className="btn-large pink">Buy React is just ${product.price}</button>
        </StripeCheckout>

      </header>
    </div>
  );
}

export default App;
