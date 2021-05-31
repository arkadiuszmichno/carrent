import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {AuthenticationService} from './AuthenticationService';

export default class Menu extends Component {

    constructor() {
        super();
        this.state = {
            currentUser: null,
            authenticated: false
        };
    }

    componentDidMount() {
        AuthenticationService.currentUser.subscribe(x => {
            this.setState({currentUser: x})
            this.setState({authenticated: (x !== null)})
        });
    }

    render() {
        return (
            <div id="nav-bar">
                <ul>
                    <li><NavLink to="/">Strona Główna</NavLink></li>
                    {!this.state.authenticated ? (
                        <React.Fragment>
                            <li><NavLink to="/signin">Zaloguj</NavLink></li>
                            <li><NavLink to="/signup">Zarajestruj</NavLink></li>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <li><NavLink to="/reservations">Moje rezerwacje</NavLink></li>
                            {this.state.currentUser.admin === true ? (
                                <li><NavLink to="/admin/dashboard"><span>Panel Administracyjny</span></NavLink></li>
                            ) : ("")}
                            <li onClick={this._handleLogoutClick}><NavLink to="#">Wyloguj
                                ({this.state.currentUser.username})</NavLink></li>
                        </React.Fragment>
                    )}
                </ul>
            </div>
        );
    }

    _handleLogoutClick = () => {
        AuthenticationService.logout()
    };

}