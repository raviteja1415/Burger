import React from "react";

import burgerImg from "../../assests/burger-logo.png";
import classes from "./Logo.module.css";

const Logo = props => {
    return (
            <div className={classes.Logo} >
                <img src={burgerImg} alt="burger-img"/>
            </div>
            );
    }

export default Logo;