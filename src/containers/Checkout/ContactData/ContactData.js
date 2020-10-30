import React, { Component } from "react";
import classes from "./ContactData.module.css";

import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    isLoading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredient);
    this.setState({
      isLoading: true
    });
    const order = {
      ingredients: this.props.ingredient,
      price: this.props.totalPrice,
      customer: {
        name: "Rtj",
        address: {
          street: "testStreet",
          zipCode: "352523",
          country: "India"
        },
        email: "test@test.com"
      }
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({
          isLoading: false
        });
        this.props.history.push("/");
      })
      .catch((error) =>
        this.setState({
          isLoading: false
        })
      );
  };

  render() {
    console.log(this.props);
    let form = (
      <form>
        <input
          className={classes.Input}
          name="name"
          type="text"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          name="email"
          type="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          name="street"
          type="text"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          name="postal"
          type="text"
          placeholder="Your PostalCode"
        />
      </form>
    );

    if (this.props.isLoading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
        <Button btnType="Success" onClick={this.orderHandler}>
          ORDER
        </Button>
      </div>
    );
  }
}

export default ContactData;
