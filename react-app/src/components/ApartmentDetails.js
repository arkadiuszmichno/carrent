import React, {Component} from 'react';
import Footer from "./Footer";
import Header from "./Header";
import LeftSide from "./LeftSide";
import ModalImage from "react-modal-image";
import { findDOMNode } from "react-dom";
import $ from "jquery";
import Popup from "./Popup";

class ApartmentDetails extends Component {

    constructor(props, context) {
        super(props, context);
        console.log(this.props.match.params.idApartment);
        console.log(this.props.match.params.dateFrom);
        this.state = {
            apartment: 0,
            showPopup: false,
            idApartment: this.props.match.params.idApartment,
            dateFrom: this.props.match.params.dateFrom,
            dateTo: this.props.match.params.dateTo,
        };
    }

    componentDidMount() {
        var url = "http://localhost:8080/apartments/show/"+this.state.idApartment;

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
            this.setState({apartment: results.result})
        })
    }

    bookApartment(idApartment, idUser, start, end) {
        const url = `http://localhost:8080/bookings/add`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idApartment: idApartment,
                idUser: idUser,
                start: start,
                end: end
            })
        });
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    postData = (event) => {
        event.preventDefault();
        console.log(this.state.apartment.idApartment);
        if(this.state.dateFrom != undefined) {
            this.bookApartment(this.state.apartment.idApartment, global.idUser, this.state.dateFrom, this.state.dateTo)
            this.togglePopup();
        } else {
            $("#error-booking").show(300);
        }
    }



    render() {
        let days = (new Date(this.state.dateTo) - new Date(this.state.dateFrom)) / (1000 * 3600 * 24);
        if (this.state.dateFrom == null) {
            days = 1;
        }
        const hide = {
            display: 'none'
        };
        console.log(this.state.dateFrom);
        return (
            <React.Fragment>
                <div id="container">
                    <Header />
                    <div id="content">
                        <LeftSide />
                        <div id="right-side">
                            <div id="right-side-inner">
                                <h1>
                                    Wybrany apartament:
                                </h1>
                                <div className="apartment" key={this.state.apartment.idApartment}>
                                    <div className="img">
                                        <ModalImage
                                            className="picture-apartment"
                                            small={"http://localhost:8080/uploads/"+this.state.apartment.filePath}
                                            large={"http://localhost:8080/uploads/"+this.state.apartment.filePath}
                                            hideDownload="true"
                                            alt={this.state.apartment.nameApartment+" ("+this.state.apartment.city+")"}
                                        />
                                    </div>
                                    <div className="description-content">
                                        <h3>{this.state.apartment.nameApartment}</h3>
                                        <p className="city">{this.state.apartment.city}</p>
                                        <div className="description">{this.state.apartment.description}</div>
                                        <p className="additional-info">Dodatkowe informacje</p>
                                        <div className="additional-description">{this.state.apartment.additionalDescription}</div>
                                        <div className="price">
                                            {this.state.dateFrom != null ?
                                                <p>Czas rezerwacji: {this.state.dateFrom}-{this.state.dateTo}</p> : ""
                                            }
                                            <p>Max. ilość osób: {this.state.apartment.numberPeople}</p>
                                            <p>Cena: {this.state.apartment.priceDay * days} zł (za {days} {days == 1 ? "dzień" : "dni"})</p>
                                        </div>
                                        <div className="place-button">
                                            <form onSubmit={this.postData}>
                                                <button className="button">Rezerwuje</button>
                                            </form>
                                            {this.state.showPopup ?
                                                <Popup
                                                    text='Nowy apartament został dodany'
                                                    url='/bookings'
                                                    closePopup={this.togglePopup.bind(this)}
                                                />
                                                : null
                                            }
                                            <div className="error" style={hide} id="error-booking">Nie można zarezerwować. Proszę wybrać termin w panelu bocznym</div>
                                        </div>
                                    </div>
                                </div>
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

export default ApartmentDetails;
