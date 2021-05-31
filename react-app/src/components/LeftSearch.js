import React, {Component} from 'react';
import * as moment from 'moment';
import ReactDOM from 'react-dom';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import {Redirect} from 'react-router-dom';
import DateTimePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
import DatePicker from "react-widgets/DatePicker";

Moment.locale('pl');
new momentLocalizer(Moment);

ReactDOM.render(<DateTimePicker/>, document.getElementById('root'));

class LeftSearch extends Component {

    constructor(props, context) {
        super(props, context);
        console.log("props:")
        console.log(this.props)
        this.state = {
            dateFrom: this.props.dateFrom,
            dateTo: this.props.dateTo,
            gearbox: this.props.gearbox,
            seats: this.props.seats,
            segment: this.props.segment,
            auth: false,
        };
    }

    onChange() {
        console.log(this.state.dateFrom)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state.dateFrom)
    }

    handleSubmit =
        event => {
            event.preventDefault();
            this.setState({auth: true})
        }

    render() {
        let url = "/cars";
        if (this.state.auth) {
            let search = "?";
            let first = true;
            if (this.state.dateFrom) {
                search += (first ? '' : '&&') + 'dateFrom=' + this.state.dateFrom;
                first = false;
            }
            if (this.state.dateTo) {
                search += (first ? '' : '&&') + 'dateTo=' + this.state.dateTo;
                first = false;
            }
            if (this.state.gearbox) {
                search += (first ? '' : '&&') + 'gearbox=' + this.state.gearbox;
                first = false;
            }
            if (this.state.seats) {
                search += (first ? '' : '&&') + 'seats=' + this.state.seats;
                first = false;
            }
            if (this.state.segment) {
                search += (first ? '' : '&&') + 'segment=' + this.state.segment;
            }

            return <Redirect push to={{pathname: url, search: search}}/>
        }
        return (
            <div id="left-side">
                <div id="search-box">
                    <div id="search-box-inner">
                        <form onSubmit={this.handleSubmit} action={url}>
                            <div className="row-search">
                                <label htmlFor="name">Od:</label>
                                <DatePicker dateFormat={"YYYY-MM-DD"} id="dateFrom"
                                                onChange={value => this.setState({dateFrom: moment(value).format('YYYY-MM-DD')})}
                                                time={false}
                                />
                            </div>
                            <div className="row-search">
                                <label htmlFor="name">Do:</label>
                                <DateTimePicker format={"YYYY-MM-DD"} id="dateTo"
                                                onChange={value => this.setState({dateTo: moment(value).format('YYYY-MM-DD')})}
                                                time={false}
                                />
                            </div>
                            <div className="row-search">
                                <label htmlFor="name">Skrzynia biegow:</label>
                                <input className="input-search" type="text" required id="gearbox" name="gearbox"
                                       defaultValue={this.state.gearbox} onChange={(e) => this.handleChange(e)}/>
                            </div>
                            <div className="row-search">
                                <label htmlFor="name">Miejsca:</label>
                                <input className="input-search" type="number" required id="seats" min="1" name="seats"
                                       defaultValue={this.state.seats} onChange={(e) => this.handleChange(e)}/>
                            </div>
                            <div className="row-search">
                                <label htmlFor="name">Segment:</label>
                                <input className="input-search" type="text" required id="segment" name="segment"
                                       defaultValue={this.state.segment} onChange={(e) => this.handleChange(e)}/>
                            </div>
                            <div className="row-search">
                                <p onClick={this.handleSubmit}>Wyszukaj</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftSearch;