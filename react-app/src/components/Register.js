import React, {Component} from 'react';
import Footer from "./Footer";
import Header from "./Header";
import LeftSearch from "./LeftSearch";
import {Redirect} from "react-router-dom";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            pictures: [],
            username: "",
            password: "",
            email: "",
            name: "",
            registered: false
        };
    }

    componentDidMount() {

    }

    addUser() {
        const url = `http://localhost:8080/api/signup`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                name: this.state.name
            })
        }).then(results => {
            if (results.ok) {
                this.setState({registered: true})
            }
            return results.json();
        });
    }

    handleSubmit =
        event => {
            event.preventDefault();
            this.addUser();

        }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        if (this.state.registered) {
            const url = "/signin";
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
                                    Zarejestruj sie:
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
                                        <div>
                                            <label htmlFor="mail">email:</label>
                                            <input type="text" required id="email" name="email" value={this.state.email}
                                                   onChange={(e) => this.handleChange(e)}/>
                                        </div>
                                        <div>
                                            <label htmlFor="mail">Imie i nazwisko:</label>
                                            <input type="text" required id="name" name="name" value={this.state.name}
                                                   onChange={(e) => this.handleChange(e)}/>
                                        </div>
                                        <button className="button">Zarejestruj</button>

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

export default Register;
