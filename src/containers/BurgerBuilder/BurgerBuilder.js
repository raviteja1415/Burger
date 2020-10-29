import React, { Component } from 'react';

import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICS= {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredient : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing : false
    }

    updatePurchasable = (ingredients) => {
        const sumOfIngredients = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((currSum, el) => {
                return currSum + el;
            },0);

        this.setState({purchasable : sumOfIngredients > 0});
    }

    addIngredientHandler = (type) => {
        this.setState((prevState) => {
            const oldcount = prevState.ingredient[type];
            const updatedcount = oldcount + 1;
            const updatedIngredients = {...prevState.ingredient};
            updatedIngredients[type] = updatedcount;
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + INGREDIENT_PRICS[type];
            
            return {
                    ingredient : updatedIngredients,
                    totalPrice : newPrice
                };
        }, () => {
            this.updatePurchasable({...this.state.ingredient})
        });

        // this.updatePurchasable({...this.state.ingredient});

    }

    purchasingHandler = () => this.setState({purchasing: true});

    purchaseCancelHandler = () => this.setState({purchasing : false});

    purchaseContiueHandler = () => alert("Continue your order !!");

    removeIngredientHandler = (type) => {
        this.setState( (prevState) => {
            const oldCount = prevState.ingredient[type];
            if(oldCount <= 0) return;

            const updatedCount = oldCount - 1;
            const updatedIngredients = {...prevState.ingredient};
            updatedIngredients[type] = updatedCount;
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - INGREDIENT_PRICS[type];
            return {
                ingredient : updatedIngredients,
                totalPrice : newPrice
            };
        }, () => {
            this.updatePurchasable({...this.state.ingredient})
        });

        // this.updatePurchasable({...this.state.ingredient});
    }

    render() {
        let disabledInfo = {
            ...this.state.ingredient
        };

        for (let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (    
            <Auxilary>
                <Modal show={this.state.purchasing} remove={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredient} 
                        total={this.state.totalPrice}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContiueHandler}
                        />
                </Modal>

                <Burger 
                    ingredient={this.state.ingredient}
                    // price={this.state.totalPrice} 
                    />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchasable ={this.state.purchasable}
                    ordered={this.purchasingHandler}
                    />
            </Auxilary>
        );
    }
}


export default BurgerBuilder;