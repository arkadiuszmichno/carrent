import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {NavLink} from "react-router-dom";

export default class Authentication extends Component {
    static propTypes = {
        authenticated: PropTypes.bool.isRequired
    };

    render() {
        const {authenticated} = this.props;
        console.log("Status auth " + authenticated);
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }
}
