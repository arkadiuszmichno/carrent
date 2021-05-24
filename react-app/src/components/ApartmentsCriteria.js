import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import LeftSide from './LeftSide';
import ModalImage from "react-modal-image";


class ApartmentsCriteria extends Component {

    constructor(props, context) {
        super(props, context);
        console.log(this.state);
        this.state = {
            apartments: [],
            dateFrom: this.props.match.params.dateFrom,
            dateTo: this.props.match.params.dateTo,
            numberPeople: this.props.match.params.numberPeople,
            city: this.props.match.params.city,
        };

    }

    componentDidMount() {
        if(this.state.dateFrom != null) {
            this.getApartmentsByCriteria();
        } else {
            this.getAllApartments();
        }
    }

    getApartmentsByCriteria() {
        var url = "http://localhost:8080/apartments/show/"+this.state.dateFrom+"/"+this.state.dateTo+"/"+this.state.numberPeople+"/"+this.state.city;

        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                console.log(results);
                return results.json();
            }).then(results => {
            this.setState({apartments: results.result})
        })
    }

    getAllApartments() {
        var url = "http://localhost:8080/apartments/show/all/0/10";

        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                console.log(results);
                return results.json();
            }).then(results => {
            this.setState({apartments: results.result})
        })
    }

    render() {
        console.log(this.state.apartments);
        let days = (new Date(this.state.dateTo) - new Date(this.state.dateFrom)) / (1000 * 3600 * 24);
        if (this.state.dateFrom == null) {
            days = 1;
        }
        let apartments = "";
        if(this.state.apartments.length === 0) {
            apartments = <div>Brak apartamentów</div>

            ;

        } else
            {
                apartments = this.state.apartments.map((apartment) => {
                    return (
                        <div className="apartment" key={apartment.idApartment}>
                            <div className="img">
                                <ModalImage
                                    className="picture-apartment"
                                    small={"http://localhost:8080/uploads/"+apartment.filePath}
                                    large={"http://localhost:8080/uploads/"+apartment.filePath}
                                    hideDownload="true"
                                    alt={apartment.nameApartment+" ("+apartment.city+")"}
                                />
                            </div>
                            <div className="description-content">
                                <h3>{apartment.nameApartment}</h3>
                                <p className="city">{apartment.city}</p>
                                <div className="description">{apartment.description}</div>
                                <div className="price">
                                    {this.state.dateFrom != null ?
                                        <p>Czas rezerwacji: {this.state.dateFrom}-{this.state.dateTo}</p> : ""
                                    }
                                    <p>Cena: {apartment.priceDay * days} zł (za {days} {days == 1 ? "dzień" : "dni"})</p>
                                </div>
                                <div className="place-button">
                                    <div className="button"><NavLink to={`/apartment/details/${apartment.idApartment}/${this.state.dateFrom}/${this.state.dateTo}`}>Zobacz
                                        szczegóły</NavLink></div>
                                </div>
                            </div>
                        </div>
                    )
                });
            }
        return (
            <React.Fragment>
                <div id="container">
                    <Header />
                    <div id="content">
                        <LeftSide city={this.state.city} dateFrom={this.state.dateFrom} dateTo={this.state.dateTo} numberPeople={this.state.numberPeople}/>
                        <div id="right-side">
                            <div id="right-side-inner">
                                <h1>
                                    Wybierz apartament:
                                </h1>
                                {apartments}
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

export default ApartmentsCriteria;
