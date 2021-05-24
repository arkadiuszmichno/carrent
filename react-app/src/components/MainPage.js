import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import LeftSide from './LeftSide';
import ModalImage from "react-modal-image";


class MainPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            apartments: [],
            dateFrom: this.props.match.params.idApartment,
            dateTo: this.props.match.params.idApartment,
            numberPeople: this.props.match.params.idApartment,
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
        var url = "http://localhost:8080/apartments/show/all/"+this.state.dateFrom+"/"+this.state.dateTo+"/"+this.state.numberPeople;

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
        let apartments = this.state.apartments.map((apartment) => {
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
                            <p>Cena: {apartment.priceDay} zł (za 1 dzień)</p>
                        </div>
                        <div className="place-button">
                            <div className="button"><NavLink to={`apartment/details/${apartment.idApartment}`}>Zobacz
                                szczegóły</NavLink></div>
                        </div>
                    </div>
                </div>
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

export default MainPage;
