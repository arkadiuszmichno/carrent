import React, {Component} from 'react';
import Footer from "./Footer";
import Header from "./Header";
import LeftSide from "./LeftSide";
import Popup from './Popup';

class EditApartment extends Component {

    constructor(props, context) {
        super(props, context);
        console.log(props)
        this.state = {
            showPopup: false,
            idApartment: this.props.match.params.idApartment,
            nameApartment: "",
            city: "",
            street: "",
            code: "",
            priceDay: "",
            numberPeople: "",
            description: "",
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
            this.setState({
                nameApartment: results.result.nameApartment,
                city: results.result.city,
                street: results.result.street,
                code: results.result.code,
                priceDay: results.result.priceDay,
                numberPeople: results.result.numberPeople,
                description: results.result.description,
            })
        })
    }


    addApartment(data) {
        console.log(data);
        const url = "http://localhost:8080/apartments/edit/"+this.state.idApartment;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nameApartment: this.state.nameApartment,
                city: this.state.city,
                street: this.state.street,
                code: this.state.code,
                priceDay: this.state.priceDay,
                numberPeople: this.state.numberPeople,
                description: this.state.description,
            })
        });
    }
    handleSubmit =
         event => {
            event.preventDefault();
            this.togglePopup();
            this.addApartment();

    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <React.Fragment>
                <div id="container">
                    <Header />
                    <div id="content">
                        <LeftSide />
                        <div id="right-side">
                            <div id="right-side-inner">
                                <h1>
                                    Dodaj apartament:
                                </h1>
                                <div>
                                    <form onSubmit={this.handleSubmit} className="addapartment" method="none">
                                        <div>
                                            <label htmlFor="name">Nazwa apartamentu:</label>
                                            <input type="text" required id="name" name="nameApartment" value={this.state.nameApartment} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                        <div>
                                            <label htmlFor="mail">Miasto:</label>
                                            <input type="text"  required id="city" name="city" value={this.state.city} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                        <div>
                                            <label htmlFor="mail">Ulica:</label>
                                            <input type="text" required id="street" name="street" value={this.state.street} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                        <div>
                                            <label htmlFor="mail">Kod pocztowy:</label>
                                            <input type="text" required id="code" name="code" value={this.state.code} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                        <div>
                                            <label htmlFor="mail">Cena za 1 dzień:</label>
                                            <input type="number" required  id="code" name="priceDay" value={this.state.priceDay} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                        <div>
                                            <label htmlFor="mail">Maksymalna ilość osób:</label>
                                            <input type="number" required  id="code" name="numberPeople" value={this.state.numberPeople} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                        <div>
                                            <label htmlFor="msg">Opis apartamentu:</label>
                                            <textarea id="msg" required  name="description" value={this.state.description} onChange={(e) => this.handleChange(e)} ></textarea>
                                        </div>
                                        <button className="button">Edytuj apartament</button>
                                        {this.state.showPopup ?
                                            <Popup
                                                text='Apartament został zedytowany'
                                                url='/admin/apartments'
                                                closePopup={this.togglePopup.bind(this)}
                                            />
                                            : null
                                        }
                                    </form>
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

export default EditApartment;
