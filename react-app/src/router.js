import React from 'react';
import {Route} from 'react-router-dom';
import MainPage from './components/MainPage';
import Reservations from './components/Reservations';
import EditReservation from './components/EditReservation';
import CarsSearch from './components/CarsSearch';
import Administration from "./components/Administration";
import Register from "./components/Register";
import Login from "./components/Login";

export default (
    <React.Fragment>​
        <Route exact path="/" component={MainPage} myname={"Main page"}/>
        <Route exact path="/cars" component={CarsSearch} myname={"Main page"}/>
        <Route path="/reservations" component={Reservations} name="Moje rezerwacje"/>
        <Route path="/admin/dashboard" component={Administration} name="Administracja rezerwacjami"/>
        <Route path="/admin/reservation/edit/:reservationId" component={EditReservation} name="Edytuj rezerwacje"/>
        <Route path="/signup" component={Register} name="Zarejestruj sie"/>
        <Route path="/signin" component={Login} name="Zaloguj sie"/>
    </React.Fragment>
);