import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import LeftSearch from './LeftSearch';
import ModalImage from "react-modal-image";
import queryString from 'query-string';

class CarsSearch extends Component {

    constructor(props, context) {
        super(props, context);
        let params = queryString.parse(this.props.location.search)
        this.state = {
            cars: [],
            booked: [],
            dateFrom: params['dateFrom'],
            dateTo: params['dateTo'],
            seats: params['seats'],
            gearbox: params['gearbox'],
            segment: params['segment']
        };
    }

    componentDidMount() {
        if (this.state.dateFrom != null || this.state.dateTo != null || this.state.gearbox != null
            || this.state.seats != null || this.state.segment != null) {
            this.getApartmentsByCriteria();
        } else {
            this.getAllApartments();
        }
    }

    getApartmentsByCriteria() {
        let url = "http://localhost:8080/api/cars?";
        let first = true;
        if (this.state.dateFrom) {
            url += (first ? '' : '&&') + 'dateFrom=' + this.state.dateFrom;
            first = false;
        }
        if (this.state.dateTo) {
            url += (first ? '' : '&&') + 'dateTo=' + this.state.dateTo;
            first = false;
        }
        if (this.state.gearbox) {
            url += (first ? '' : '&&') + 'gearbox=' + this.state.gearbox;
            first = false;
        }
        if (this.state.seats) {
            url += (first ? '' : '&&') + 'seats=' + this.state.seats;
            first = false;
        }
        if (this.state.segment) {
            url += (first ? '' : '&&') + 'segment=' + this.state.segment;
        }

        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                "authorization": JSON.parse(localStorage.getItem('token'))
            },
            method: 'GET',
        })
            .then(results => {
                return results.json();
            }).then(results => {
            this.setState({cars: results})
        })
    }

    getAllApartments() {
        let url = "http://localhost:8080/api/cars";

        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                "authorization": JSON.parse(localStorage.getItem('token'))
            },
            method: 'GET',
        })
            .then(results => {
                return results.json();
            }).then(results => {
            this.setState({cars: results})
        })
    }

    bookCar(car, dateFrom, dateTo) {
        let url = "http://localhost:8080/api/reservations";
        let user = JSON.parse(localStorage.getItem('currentUser'));
        let body = {
            userId: user['_id'],
            carId: car._id,
            dateFrom: dateFrom,
            dateTo: dateTo,
            dayPrice: car.price,
        }
        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                "authorization": JSON.parse(localStorage.getItem('token'))
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(results => {
                return results.json();
            }).then(results => {
        })
    }

    multiply(a, b) {
        return a * b;
    }

    postData = (event, car) => {
        event.preventDefault();
        if (this.state.dateFrom !== undefined && this.state.dateTo !== undefined) {
            this.bookCar(car, this.state.dateFrom, this.state.dateTo);
            let newBooked = this.state.booked;
            newBooked[car._id] = true;
            this.setState({booked: newBooked});
        }
    }

    render() {
        let days = (new Date(this.state.dateTo) - new Date(this.state.dateFrom)) / (1000 * 3600 * 24);
        if (this.state.dateFrom == null) {
            days = 1;
        }
        let cars = "";
        if (this.state.cars.length === 0) {
            cars = <div>Brak samochodow</div>
        } else {
            cars = this.state.cars.map((car) => {
                return (
                    <div className="apartment" key={car._id}>
                        <div className="img">
                            <ModalImage
                                className="picture-apartment"
                                small={"data:image/jpeg;base64," + car.img.data}
                                large={"data:image/jpeg;base64," + car.img.data}
                                hideDownload="true"
                                alt={car.nameApartment + " (" + car.city + ")"}
                            />
                        </div>
                        <div className="description-content">
                            <h3>{car.mark} {car.model}</h3>
                            <p className="seats">Liczba miejsc: {car.seats}</p>
                            <p className="productionYear">Rok: {car.productionYear}</p>
                            <div className="power">Moc: {car.power} KM</div>
                            <div className="gearbox">Skrzynia: {car.gearbox}</div>
                            <div className="segment">Segment: {car.segment}</div>
                            <div className="price">
                                <p>Cena: {car.price} zł (za 1 dzień)</p>
                            </div>
                            <div className="price">
                                <p>Cena: {this.multiply(car.price, days)} zł (za {days} dni)</p>
                            </div>
                            <div className="place-button">
                                <form onSubmit={event => this.postData(event, car)}>
                                    <button className="button"
                                            disabled={this.state.booked[car._id]}>{this.state.booked[car._id] ? 'Zarezerwowany' : 'Rezerwuje'}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            });
        }
        return (
            <React.Fragment>
                <div id="container">
                    <Header/>
                    <div id="content">
                        <LeftSearch gearbox={this.state.gearbox} dateFrom={this.state.dateFrom}
                                    dateTo={this.state.dateTo}
                                    seats={this.state.seats} segment={this.state.segment}/>
                        <div id="right-side">
                            <div id="right-side-inner">
                                <h1>
                                    Wybierz samochod:
                                </h1>
                                {cars}
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

export default CarsSearch;
