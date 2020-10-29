import React, { Component } from 'react';

import Auxilary from "../Auxilary/Auxilary";
import classes from './Layout.module.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    SideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    SideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true});
    }

    render() {
        return (
            <Auxilary>
                <ToolBar clicked={this.SideDrawerOpenHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    clicked={this.SideDrawerCloseHandler}
                    />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilary>
        );
    }
}

export default Layout;