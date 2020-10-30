import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      amount: props.ingredients[ingredientName],
      name: ingredientName
    });
  }

  const ingredientOutput = ingredients.map((ingredient) => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 10px",
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "8px"
        }}
      >
        {" "}
        {ingredient.name} ({ingredient.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p> ingredients: {ingredientOutput} </p>
      <p>
        {" "}
        Total Price : <strong>{props.price.toFixed(2)} </strong>{" "}
      </p>
    </div>
  );
};

export default Order;
