import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import LeftSearch from './LeftSearch';
import ModalImage from "react-modal-image";


class MainPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            cars: [],
            dateFrom: this.props.match.params.dateFrom,
            dateTo: this.props.match.params.dateTo,
            seats: this.props.match.params.seats,
        };

    }

    componentDidMount() {
        if (this.state.dateFrom != null || this.state.dateTo != null || this.state.seats != null) {
            this.getCarsByCriteria();
        } else {
            this.getAllCars();
        }
    }

    getCarsByCriteria() {
        let url = "https://localhost:8080/api/cars?";

        if(this.state.dateFrom) {
            url += 'dateFrom=' + this.state.dateFrom + '&&';
        }
        if(this.state.dateTo) {
            url += 'dateTo=' + this.state.dateTo + '&&';
        }
        if(this.state.gearbox) {
            url += 'gearbox=' + this.state.gearbox + '&&';
        }
        if(this.state.seats) {
            url += 'seats=' + this.state.seats + '&&';
        }
        if(this.state.segment) {
            url += 'segment=' + this.state.segment + '&&';
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

    getAllCars() {
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

    render() {
        let cars = this.state.cars.map((car) => {
            return (
                <div className="apartment" key={car._id}>
                    <div className="img">
                        <ModalImage
                            className="picture-apartment"
                            small={"data:image/jpeg;base64," + car.img.data}
                            large={"data:image/jpeg;base64," + car.img.data}
                            hideDownload="true"
                            alt={car.mark + " (" + car.model + ")"}
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
                                    Wprowadz kryteria:
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

export default MainPage;
