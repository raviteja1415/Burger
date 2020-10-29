import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    { label : "Salad" , ingredientType : "salad"},
    { label : "Cheese" , ingredientType : "cheese"},
    { label : "Bacon" , ingredientType : "bacon"},
    { label : "Meat" , ingredientType : "meat"}
];

const BuildControls = props => (
    <div className={classes.BuildControls} >
        <p> 
            Current Price: <strong> {props.price.toFixed(2)} </strong>
        </p>

        {controls.map( ctrl => <BuildControl 
                                    label={ctrl.label}
                                    key={ctrl.label}
                                    added={() => props.ingredientAdded(ctrl.ingredientType)}
                                    removed={() => props.ingredientRemoved(ctrl.ingredientType)}
                                    disabled={props.disabled[ctrl.ingredientType]}
                                    />)}

        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.ordered}
            >
            ORDER NOW
        </button>
    </div>
);


export default BuildControls;