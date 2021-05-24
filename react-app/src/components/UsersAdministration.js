import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import LeftSide from "./LeftSide";
import AdministrationPanel from "./AdministrationPanel";

class UsersAdministration extends Component {

    constructor() {
        super();
        this.state = {
            usersList: [],
        };
    }

    componentDidMount() {
        var url = "http://localhost:8080/authorization/show/all";

        fetch(url, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                console.log(results);
                return results.json();
            }).then(results => {
            this.setState({usersList: results.result})
        })
    }

    setPermission(idUser) {
        const url = "http://localhost:8080/authorization/admin-permission/set/user/"+idUser;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    }

    unsetPermission(idUser) {
        const url = "http://localhost:8080/authorization/admin-permission/unset/user/"+idUser;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    }

    handleSetPermission (idUser) {
        return event => {
            event.preventDefault();
            this.setPermission(idUser);
            //console.log("DEBUG "+JSON.stringify(this.state.usersList));
            //console.log("DEBUG2 "+JSON.stringify(this.state.usersList[0]));
            this.setState(prevState => ({
                usersList: prevState.usersList.map(
                    obj => (obj.idUser === idUser ? Object.assign(obj, { isAdmin: 1 }) : obj)
                )
            }));

        }
    }

    handleUnsetPermission (idUser) {
        return event => {
            event.preventDefault();
            this.unsetPermission(idUser);
            this.setState(prevState => ({
                usersList: prevState.usersList.map(
                    obj => (obj.idUser === idUser ? Object.assign(obj, { isAdmin: 0 }) : obj)
                )
            }));

        }
    }

    render() {
        let users = this.state.usersList.map((user) => {
            return (
                <tbody>
                    <tr key={user.idUser}>
                        <td>{user.provider == 'facebook' && <img src="/facebook_logo.png" /> }</td>
                        <td>{user.name}</td>
                        <td>{user.dateRegistrationFormat}</td>
                        <td>{user.dateLastLoginFormat}</td>
                        <td>{user.isAdmin == 1 ? (
                            <p><b>Administrator</b><br /><button className="button-details button-red" onClick={this.handleUnsetPermission(user.idUser)}>Odbierz uprawnienia</button></p>
                        ) : (
                            <p>Brak<br /><button className="button-details button-green" onClick={this.handleSetPermission(user.idUser)}>Nadaj uprawnienia</button></p>
                        )}</td>
                    </tr>
                </tbody>
            )
        });
        return (
            <React.Fragment>
                <div id="container">
                    <Header />
                    <div id="content">
                        <LeftSide />
                        <div id="right-side">
                            <div id="right-side-inner">
                                <AdministrationPanel />
                                <h1>
                                    Zarządzaj użytkownikami:
                                </h1>
                                <table id='details'>
                                    <thead>
                                        <tr>
                                            <th>Logowanie</th>
                                            <th>Nazwa</th>
                                            <th>Zarejestrowany</th>
                                            <th>Ostatnie logowanie</th>
                                            <th>Uprawnienia</th>
                                        </tr>
                                    </thead>
                                     {users}
                                </table>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <Footer />
                </div>
            </React.Fragment>
        );
    }
}

export default UsersAdministration;
