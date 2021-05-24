import React, {Component} from 'react';
import * as moment from 'moment';
import ReactDOM from 'react-dom';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import {Route, Redirect, NavLink} from 'react-router-dom';
import DateTimePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
Moment.locale('pl');
new momentLocalizer(Moment);

ReactDOM.render(<DateTimePicker />, document.getElementById('root'));

class LeftSide extends Component {

    constructor(props, context) {
        super(props, context);
        console.log("props:")
        console.log(this.props)
        this.state = {
            dateFrom: this.props.dateFrom,
            dateTo: this.props.dateTo,
            city: this.props.city,
            numberPeople: this.props.numberPeople,
            auth: false,
        };
    }

    checkInvalidDates(date) {

        // return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
    }

    handleApply(event, picker) {
        // const startAt = picker.startDate.format('Y/MM/DD');
        // const endAt = picker.endDate.format('Y/MM/DD');
        // this.dateRef.current.value = startAt + ' to ' + endAt;

        // this.setState({
        //     proposedBooking: {
        //         ...this.state.proposedBooking,
        //         startAt,
        //         endAt
        //     }
        //
        // });

    }

    onChange() {
        console.log(this.state.dateFrom)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state.dateFrom)
    }

    handleSubmit =
        event => {
            event.preventDefault();
            // this.togglePopup();
            // this.addApartment();
            console.log("sfsdf");
            this.setState({auth: true})
        }

    render() {
        if(this.state.auth) {
            const url = "/apartments/"+this.state.dateFrom+"/"+this.state.dateTo+"/"+this.state.numberPeople+"/"+this.state.city;
            return <Redirect to={{pathname: url}}/>
        }
        console.log(this.state.dateFrom)
        const url = "/apartments/"+this.state.dateFrom+"/"+this.state.dateTo+"/"+this.state.numberPeople+"/"+this.state.city;
        return (
            <div id="left-side">
                <div id="search-box">
                    <div id="search-box-inner">
                        <form onSubmit={this.handleSubmit} action={url}>
                            <div className="row-search">
                                <label htmlFor="name">Miasto:</label>
                                <input className="input-search" type="text" required id="name" name="city" defaultValue={this.state.city} onChange={(e) => this.handleChange(e)} />
                            </div>
                            <div className="row-search">
                                <label htmlFor="name">Od:</label>
                                <DateTimePicker format={"dddd DD.MM.YYYY"}
                                                // value={!value ? this.state.currentTime : new Date(this.state.dateFrom)}
                                                onChange={value => this.setState({ dateFrom: moment(value).format('YYYY-MM-DD') })}
                                                time={false}
                                />
                            </div>
                            <div className="row-search">
                                <label htmlFor="name">Do:</label>
                                <DateTimePicker format={"dddd DD.MM.YYYY"}
                                                onChange={value => this.setState({ dateTo: moment(value).format('YYYY-MM-DD') })}
                                                time={false}
                                />
                            </div>
                            <div className="row-search">
                                <label htmlFor="name">Maksymalna ilość osób:</label>
                                <input className="input-search" type="number" required id="name" min="1" name="numberPeople" defaultValue={this.state.numberPeople} onChange={(e) => this.handleChange(e)} />
                            </div>
                            <div className="row-search">
                                <p onClick={this.handleSubmit}>Wyszukaj</p>
                                {/*<NavLink to={`/apartments/${this.state.dateFrom}/${this.state.dateTo}/${this.state.numberPeople}/${this.state.city}`}>Wyszukaj</NavLink>*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftSide;