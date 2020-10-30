import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it taste delicious !!! </h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredient={props.ingredient} />
        <Button btnType="Danger" onClick={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" onClick={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
