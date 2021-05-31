import React, {Component} from 'react';
import Footer from "./Footer";
import Header from "./Header";
import LeftSearch from "./LeftSearch";
import ModalImage from "react-modal-image";
import moment from "moment";

class Reservations extends Component {

    constructor() {
        super();
        this.state = {
            reservations: [],
            apartmentsList: [],
        };
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        let url = "http://localhost:8080/api/reservations?userId=" + user._id;

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

    render() {

        let reservations = this.state.reservations.map((reservation) => {
            return (
                <div className="apartment" key={reservation._id}>
                    <div className="img">
                        <ModalImage
                            className="picture-apartment"
                            small={"data:image/jpeg;base64," + reservation.car.img.data}
                            large={"data:image/jpeg;base64," + reservation.car.img.data}
                            hideDownload="true"
                            alt={reservation._id + " (" + reservation.dayPrice + ")"}
                        />
                    </div>
                    <div className="description-content">
                        <h3>{reservation.car.mark} {reservation.car.model}</h3>
                        <div className="price">
                            <p>Status: {reservation.status === "NEW" ? (

                                <b className="new-reservation">Niepotwierdzona</b>

                            ) : reservation.status === "CONFIRMED" ? (

                                    <b className="reservation-confirmed">Potwierdzona</b>

                                )
                                : ""}</p>
                            <p>Od {moment(reservation.dateFrom).format('DD-mm-YYYY')} do {moment(reservation.dateTo).format('DD-mm-YYYY')}</p>
                            <p>Cena: {reservation.dayPrice} zł (1 dzień)</p>
                            <p>Cena calkowita: {reservation.totalPrice} zł</p>
                        </div>
                        <div className="place-button">
                            <form>
                                <button onClick={this.removeReservation(reservation._id)} className="button">Anuluj
                                    rezerwacje
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <React.Fragment>
                <div id="container">
                    <Header/>
                    <div id="content">
                        <LeftSearch/>
                        <div id="right-side">
                            <div id="right-side-inner">
                                <h1>
                                    Rezerwacje:
                                </h1>
                                {reservations}
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

export default Reservations;
