import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class AdministrationPanel extends React.Component  {
    render(){
        return (
            <div id="nav-bar">
                <ul>
                    <li><NavLink to="/admin/apartments">Apartamenty</NavLink></li>
                    <li><NavLink to="/admin/bookings">Rezerwacje</NavLink></li>
                    <li><NavLink to="/admin/users">Użytkownicy</NavLink></li>
                </ul>
            </div>
        );
    }
}
export default AdministrationPanel;