import React, { Component } from "react";

import Auxilary from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICS = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredient: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    isLoading: false,
    error: false
  };

  componentDidMount = () => {
    console.log(this.props);

    axios
      .get("https://burger-app-4bcc5.firebaseio.com/ingredients.json")
      .then((res) => {
        this.setState({ ingredient: res.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  };

  updatePurchasable = (ingredients) => {
    const sumOfIngredients = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((currSum, el) => {
        return currSum + el;
      }, 0);

    this.setState({ purchasable: sumOfIngredients > 0 });
  };

  addIngredientHandler = (type) => {
    this.setState(
      (prevState) => {
        const oldcount = prevState.ingredient[type];
        const updatedcount = oldcount + 1;
        const updatedIngredients = { ...prevState.ingredient };
        updatedIngredients[type] = updatedcount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICS[type];

        return {
          ingredient: updatedIngredients,
          totalPrice: newPrice
        };
      },
      () => {
        this.updatePurchasable({ ...this.state.ingredient });
      }
    );

    // this.updatePurchasable({...this.state.ingredient});
  };

  purchasingHandler = () => this.setState({ purchasing: true });

  purchaseCancelHandler = () => this.setState({ purchasing: false });

  purchaseContiueHandler = () => {
    // alert("Continue your order !!")

    const queryParms = [];
    for (let key in this.state.ingredient) {
      queryParms.push(
        encodeURIComponent(key) +
          "=" +
          encodeURIComponent(this.state.ingredient[key])
      );
    }
    queryParms.push("price=" + this.state.totalPrice);

    const queryString = queryParms.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  removeIngredientHandler = (type) => {
    this.setState(
      (prevState) => {
        const oldCount = prevState.ingredient[type];
        if (oldCount <= 0) return;

        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...prevState.ingredient };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICS[type];
        return {
          ingredient: updatedIngredients,
          totalPrice: newPrice
        };
      },
      () => {
        this.updatePurchasable({ ...this.state.ingredient });
      }
    );

    // this.updatePurchasable({...this.state.ingredient});
  };

  render() {
    let disabledInfo = {
      ...this.state.ingredient
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner />;

    if (this.state.ingredient) {
      burger = (
        <Auxilary>
          <Burger
            ingredient={this.state.ingredient}
            // price={this.state.totalPrice}
          />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchasingHandler}
          />
        </Auxilary>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredient}
          total={this.state.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContiueHandler}
        />
      );
    }

    if (this.state.isLoading) {
      orderSummary = <Spinner />;
    }

    if (this.state.error) {
      burger = (
        <p style={{ textAlign: "center" }}>
          Error in <span>Loading</span> from server
        </p>
      );
    }

    return (
      <Auxilary>
        <Modal show={this.state.purchasing} remove={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxilary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
