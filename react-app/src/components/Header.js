import React, {Component} from 'react';
import Menu from "./Menu";

class Header extends Component {
    render() {
        return (
            <React.Fragment>
            <div id="logo"><h1>
                Wynajem Samochodow
            </h1></div>
            <Menu />
            </React.Fragment>
        );
    }
}

export default Header;