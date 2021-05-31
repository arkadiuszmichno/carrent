import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import LeftSearch from "./LeftSearch";
import moment from "moment";

class Administration extends Component{
    constructor() {
        super();
        this.state = {
            reservations: [],
        };
    }

    componentDidMount() {
        let url = "http://localhost:8080/api/reservations";

        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                "authorization": JSON.parse(localStorage.getItem('token'))
            },
            method: 'GET'
        })
            .then(results => {
                return results.json();
            }).then(results => {
            this.setState({reservations: results})
        })
    }

    removeReservation(id) {
        return event => {
            const url = "http://localhost:8080/api/reservations/" + id;
            fetch(url, {
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    "authorization": JSON.parse(localStorage.getItem('token'))
                },
                method: 'DELETE'
            }).then(result => {
                if (result.status === 204) {
                    this.setState(prevState => ({
                        reservations: prevState.reservations.filter(obj => obj._id !== id)
                    }));
                }
            });
        }
    }

    confirmReservation(id) {
        return event => {
            const url = "http://localhost:8080/api/reservations/" + id + "/status";
            fetch(url, {
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    "authorization": JSON.parse(localStorage.getItem('token'))
                },
                method: 'PATCH'
            }).then(result => {
                if (result.status === 200) {
                    this.setState(prevState => ({
                        reservations: prevState.reservations.map(
                            obj => (obj._id === id ? Object.assign(obj, {status: "CONFIRMED"}) : obj)
                        )
                    }));
                }
            });
        }
    }

    render(){
        let reservations = this.state.reservations.map((reservation) => {
            return (
                <tbody>
                <tr key={reservation._id}>
                    <td>{reservation._id}</td>
                    <td><br />Rezerwujący: {reservation.userId}</td>
                    <td>{moment(reservation.dateFrom).format('YYYY-MM-DD')}r - {moment(reservation.dateTo).format('YYYY-MM-DD')}r<br /><br />
                        1 dzień - {reservation.dayPrice} zł<br />
                        {reservation.totalPrice} zł
                    </td>
                    <td>{reservation.status === "NEW" ? (
                        <p>
                            <b className="new-reservation">Niepotwierdzona</b><br />
                            <button className="button-details button-red" onClick={this.removeReservation(reservation._id)}>Anuluj</button>
                            <button className="button-details button-green" onClick={this.confirmReservation(reservation._id)}>Potwierdź</button>
                            <button className="button-details button-green"><NavLink to={`/admin/reservation/edit/${reservation._id}`}>Edytuj dane</NavLink></button>

                        </p>
                    ) : reservation.status === "CONFIRMED" ? (
                        <p>
                            <b className="reservation-confirmed">Potwierdzona</b><br />
                            <button className="button-details button-red" onClick={this.removeReservation(reservation._id)}>Anuluj</button>
                        </p>
                    )
                    : ""}</td>
                </tr>
                </tbody>

            )
        });

        return (
            <React.Fragment>
                <div id="container">
                    <Header />
                    <div id="content">
                        <LeftSearch />
                        <div id="right-side">
                            <div id="right-side-inner">
                                <h1>
                                    Zarządzaj rezerwacjami:
                                </h1>
                                <table id='details'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Apartament</th>
                                            <th>Termin</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    {reservations}
                                </table>
                                <br />
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <Footer />
                </div>
            </React.Fragment>
        )
    }

}
export default Administration;