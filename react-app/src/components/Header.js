import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Menu from "./Menu";

class Header extends Component {
    render() {
        console.log("Global User "+global.idUser);
        console.log("Global Admin "+global.isAdmin);
        return (
            <React.Fragment>
            <div id="logo"><h1>
                Wynajem Zakwaterowania
            </h1></div>
            <Menu />
            </React.Fragment>
        );
    }
}

export default Header;