import React, {Component} from 'react';
import Footer from "./Footer";
import Header from "./Header";
import LeftSearch from "./LeftSearch";
import {AuthenticationService} from "./AuthenticationService";
import {Redirect} from "react-router-dom";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            loggedIn: false
        };
    }

    componentDidMount() {
        AuthenticationService.currentUser.subscribe(x => {
            return this.setState({loggedIn: x !== null})
        });
    }

    addUser() {
        AuthenticationService.login(this.state.username, this.state.password);
    }

    handleSubmit =
        event => {
            console.log("submit")
            event.preventDefault();
            this.addUser();
        }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        if (this.state.loggedIn) {
            const url = "/";
            return <Redirect to={{pathname: url}}/>
        }
        return (
            <React.Fragment>
                <div id="container">
                    <Header/>
                    <div id="content">
                        <LeftSearch/>
                        <div id="right-side">
                            <div id="right-side-inner">
                                <h1>
                                    Zaloguj sie:
                                </h1>
                                <div>
                                    <form onSubmit={this.handleSubmit} className="carsForm" method="none">
                                        <div>
                                            <label htmlFor="name">Login:</label>
                                            <input type="text" required id="username" name="username"
                                                   value={this.state.username} onChange={(e) => this.handleChange(e)}/>
                                        </div>
                                        <div>
                                            <label htmlFor="mail">Haslo:</label>
                                            <input type="password" required id="password" name="password"
                                                   value={this.state.password} onChange={(e) => this.handleChange(e)}/>
                                        </div>
                                        <button className="button">Zaloguj</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <Footer/>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
