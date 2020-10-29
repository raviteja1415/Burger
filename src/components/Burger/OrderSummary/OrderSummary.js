import React, {useEffect} from 'react';

import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
    
    useEffect(()=>{
        console.log("ordersummary ");
    })

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>{igKey}</span> : {props.ingredients[igKey]}
                </li>
            );
        })

    return (
        <Auxilary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price : {props.total.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" onClick={props.purchaseCanceled} >CANCEL</Button>
            <Button btnType="Success" onClick={props.purchaseContinued} >CONTINUE</Button>
        </Auxilary>
    );
}

export default React.memo(OrderSummary);