import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import ApartmentDetails from './components/ApartmentDetails';
import Bookings from './components/Bookings';
import ApartmentAdministration from './components/ApartmentAdministration';
import AddApartment from './components/AddApartment';
import EditApartment from './components/EditApartment';
import ApartmentsCriteria from './components/ApartmentsCriteria';
import AdminDashboard from "./components/AdminDashboard";
import UsersAdministration from "./components/UsersAdministration";
import BookingsAdministration from "./components/BookingsAdministration";

export default (
    <React.Fragment>​
        <Route exact path="/" component={MainPage} myname={"Main page"}/>
        <Route path="/apartments/:dateFrom/:dateTo/:numberPeople/:city" component={ApartmentsCriteria} myname={"Main page"}/>
        <Route path="/apartment/details/:idApartment/:dateFrom/:dateTo" component={ApartmentDetails} name = "Szczegoly apartamentu" />
        <Route path="/apartment/details/:idApartment" component={ApartmentDetails} name = "Szczegoly apartamentu" />
        <Route path="/bookings" component={Bookings} name = "Moje rezerwacje" />
        <Route path="/admin/dashboard" component={AdminDashboard} name = "Panel administracyjny" />
        <Route path="/admin/apartments" component={ApartmentAdministration} name = "Administracja apartamentami" />
        <Route path="/admin/users" component={UsersAdministration} name = "Administracja uzytkownikami" />
        <Route path="/admin/bookings" component={BookingsAdministration} name = "Administracja rezerwacjami" />
        <Route path="/admin/apartment/add" component={AddApartment} name = "Dodaj apartament" />
        <Route path="/admin/apartment/edit/:idApartment" component={EditApartment} name = "Dodaj apartament" />
    </React.Fragment>
);