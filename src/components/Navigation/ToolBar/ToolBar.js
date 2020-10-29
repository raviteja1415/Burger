import React from "react";

import classes from "./ToolBar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const ToolBar = props => {
    return (
            <header className={classes.ToolBar}>
                <DrawerToggle clicked={props.clicked} />
                <div className={classes.Logo}>
                    <Logo />
                </div>   
                <nav className={classes.DesktopOnly}>
                    <NavigationItems />
                </nav>
            </header>)
};

export default ToolBar;