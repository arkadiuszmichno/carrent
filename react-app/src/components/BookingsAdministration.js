import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import LeftSide from "./LeftSide";
import AdministrationPanel from "./AdministrationPanel";

class BookingsAdministration extends Component{
    constructor() {
        super();
        this.state = {
            bookingsList: [],
        };
    }

    componentDidMount() {
        var url = "http://localhost:8080/bookings/show/all";

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
            this.setState({bookingsList: results.result})
        })
    }

    bookingCancel(idBooking) {
        const url = "http://localhost:8080/bookings/change/"+idBooking+"/cancel";
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    }

    handleBookingCancel (idBooking) {
        console.log("Get request to cancel id "+idBooking);
        return event => {
            event.preventDefault();
            this.bookingCancel(idBooking);
            this.setState(prevState => ({
                bookingsList: prevState.bookingsList.map(
                    obj => (obj.idBooking === idBooking ? Object.assign(obj, {status: "canceled"}) : obj)
                )
            }));
        }
    }
    bookingConfirm(idBooking) {
        const url = "http://localhost:8080/bookings/change/"+idBooking+"/confirm";
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    }
    handleBookingConfirm (idBooking) {
        console.log("Get request to confirm id "+idBooking);
        return event => {
            event.preventDefault();
            this.bookingConfirm(idBooking);
            this.setState(prevState => ({
                bookingsList: prevState.bookingsList.map(
                    obj => (obj.idBooking === idBooking ? Object.assign(obj, {status: "confirmed"}) : obj)
                )
            }));
        }
    }
    bookingDelete(idBooking) {
        const url = "http://localhost:8080/bookings/change/"+idBooking+"/delete";
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    }
    handleBookingDelete (idBooking) {
        console.log("Get request to delete id "+idBooking);
        return event => {
            event.preventDefault();
            this.bookingDelete(idBooking);
            let filteredArray = this.state.bookingsList.filter(item => idBooking != item.idBooking)
            this.setState({bookingsList: filteredArray})
        }
    }

    render(){
        let bookings = this.state.bookingsList.map((book) => {
            return (
                <tbody>
                <tr key={book.idBooking}>
                    <td>{book.idBooking}</td>
                    <td><NavLink className="no-decoration" to={"/apartment/details/"+book.apartment.idApartment}>{book.apartment.nameApartment} ({book.apartment.city})</NavLink><br />Rezerwujący: {book.User.name}</td>
                    <td>{book.startFormat}r - {book.endFormat}r<br /><br />
                        1 dzień - {book.apartment.priceDay} zł<br />
                        {book.rentingDays} dni - {book.rentingDays * book.apartment.priceDay} zł
                    </td>
                    <td>{book.status === "unconfirmed" ? (
                        <p>
                            <b className="bookings-unconfirmed">Niepotwierdzona</b><br />
                            <button className="button-details button-red" onClick={this.handleBookingCancel(book.idBooking)}>Anuluj</button>
                            <button className="button-details button-green" onClick={this.handleBookingConfirm(book.idBooking)}>Potwierdź</button>

                        </p>
                    ) : book.status === "confirmed" ? (
                        <p>
                            <b className="bookings-confirmed">Potwierdzona</b><br />
                            <button className="button-details button-red" onClick={this.handleBookingCancel(book.idBooking)}>Anuluj</button>
                        </p>
                    ) : book.status === "canceled" ? (
                        <p>
                            <b className="bookings-canceled">Anulowana</b><br />
                            <button className="button-details button-orange" onClick={this.handleBookingDelete(book.idBooking)}>Usuń</button>
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
                        <LeftSide />
                        <div id="right-side">
                            <div id="right-side-inner">
                                <AdministrationPanel />
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
                                    {bookings}
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
export default BookingsAdministration;