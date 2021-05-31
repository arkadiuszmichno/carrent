import React, {Component} from 'react';
import Footer from "./Footer";
import Header from "./Header";
import LeftSearch from "./LeftSearch";
import DatePicker from "react-widgets/DatePicker";
import DateTimePicker from "react-widgets/DatePicker";
import * as moment from "moment";
import {Redirect} from "react-router-dom";

class EditReservation extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            reservationId: this.props.match.params.reservationId,
            dateFrom: "",
            dateTo: "",
            dayPrice: "",
            edited: false
        };
    }

    componentDidMount() {
        let url = "http://localhost:8080/api/reservations/"+this.state.reservationId;

        fetch(url, {
            mode: 'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
                "authorization": JSON.parse(localStorage.getItem('token'))
            },
            method: 'GET',
        })
            .then(results => {
                console.log(results);
                return results.json();
            }).then(results => {
            this.setState({
                dateFrom: results.dateFrom,
                dateTo: results.dateTo,
                dayPrice: results.dayPrice
            })
        })
    }


    editReservation() {
        const url = "http://localhost:8080/api/reservations/"+this.state.reservationId;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000',
                "authorization": JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({
                dateFrom: this.state.dateFrom,
                dateTo: this.state.dateTo,
                dayPrice: this.state.dayPrice
            })
        }).then(result => {
            if (result.status === 200) {
                this.setState({edited: true})
            }
        });
    }
    handleSubmit =
         event => {
            event.preventDefault();
            this.editReservation();

    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        if(this.state.edited) {
            const url = "/admin/dashboard";
            return <Redirect to={{pathname: url}}/>
        }
        return (
            <React.Fragment>
                <div id="container">
                    <Header />
                    <div id="content">
                        <LeftSearch />
                        <div id="right-side">
                            <div id="right-side-inner">
                                <h1>
                                    Edytuj rezerwacje:
                                </h1>
                                <div>
                                    <form onSubmit={this.handleSubmit} className="carsForm" method="none">
                                        <div>
                                            <label htmlFor="name">Od:</label>
                                            <DatePicker dateFormat={"YYYY-MM-DD"} id="dateFrom"
                                                        onChange={value => this.setState({dateFrom: moment(value).format('YYYY-MM-DD')})}
                                                        time={false}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="name">Do:</label>
                                            <DateTimePicker format={"YYYY-MM-DD"} id="dateTo"
                                                            onChange={value => this.setState({dateTo: moment(value).format('YYYY-MM-DD')})}
                                                            time={false}
                                            />
                                        </div>
                                        <button className="button">Edytuj rezerwacje</button>
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

export default EditReservation;
