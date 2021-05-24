import React, {Component} from 'react';
import Footer from "./Footer";
import Header from "./Header";
import LeftSide from "./LeftSide";
import Popup from './Popup';
import ImageUploader from 'react-images-upload';
import AdministrationPanel from "./AdministrationPanel";

class AddApartment extends Component {

    constructor() {
        super();
        this.state = {
            pictures: [],
            showPopup: false,
            nameApartment: "",
            city: "",
            street: "",
            code: "",
            priceDay: "",
            numberPeople: "",
            description: "",
        };

        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {

    }

    onDrop(picture) {
            console.log(picture);
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    addApartment() {
        const url = `http://localhost:8080/apartments/add`;
        fetch(url, {
            method: 'POST',
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
        }).then(results => {
            console.log(results);
            return results.json();
        });
    }
    uploadPhoto(data) {
        console.log(data);
        const url = `http://localhost:8080/apartments/upload-photo`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: this.state.pictures[0],
                city: this.state.idApartment
            })
        });
    }

    handleSubmit =
         event => {
            event.preventDefault();
            this.togglePopup();
            this.addApartment();
            this.uploadPhoto();

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
                                <AdministrationPanel />
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
                                        <ImageUploader
                                            withIcon={true}
                                            buttonText='Choose images'
                                            onChange={this.onDrop}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                            withPreview={true}
                                        />
                                        <button className="button">Dodaj apartament</button>
                                        {this.state.showPopup ?
                                            <Popup
                                                text='Apartament został zarezerwowan'
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

export default AddApartment;
