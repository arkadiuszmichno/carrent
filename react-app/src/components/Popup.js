import React from 'react';
import '../App.css';
import {NavLink} from "react-router-dom";

class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <NavLink className="button" onClick={this.props.closePopup} to={this.props.url}>Zamknij</NavLink>
                </div>
            </div>
        );
    }
}

export default Popup;