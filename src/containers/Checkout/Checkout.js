import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);

    const ingredient = {};
    let price = 0;
    for (let param of query.entries()) {
      // ["salad", "1"]
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredient[param[0]] = +param[1]; // + converts to integer
      }
    }
    console.log(ingredient);
    console.log("from checkout.js");
    this.state = { ingredient: ingredient, totalPrice: price };
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack(); //goes back to last page
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredient={this.state.ingredient}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredient={this.state.ingredient}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
