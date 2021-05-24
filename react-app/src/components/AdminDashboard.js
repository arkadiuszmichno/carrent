import React, {Component} from 'react';
import Header from "./Header";
import LeftSide from "./LeftSide";
import {NavLink} from "react-router-dom";
import Footer from "./Footer";
import AdministrationPanel from "./AdministrationPanel";

class AdminDashboard extends Component{
    render(){
        return(
            <React.Fragment>
                <div id="container">
                    <Header />
                    <div id="content">
                        <LeftSide />
                        <div id="right-side">
                            <div id="right-side-inner">
                                <AdministrationPanel />
                                Witaj w panelu administracyjnym
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
export default AdminDashboard;