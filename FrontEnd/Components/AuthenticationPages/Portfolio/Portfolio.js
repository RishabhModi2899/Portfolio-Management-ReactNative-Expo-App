import React, { Component } from 'react'

import { AppBar } from "@material-ui/core"
import { IconButton, Typography } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import AutoCompleteTextField from "./AutoCompleteTextField"
import investmentsInstruments from "../Portfolio/investmentsInstruments"

import firebase from 'firebase';

import HoldingsTable from "./HoldingsTable"

import './stylePortfolio.css';

class Portfolio extends Component {
    
    constructor(props) {

        super(props);

    }

    onlogOut = () => {

        firebase.auth().signOut();

        this.props.navigation.navigate("mainPage")

    }

    render() {
        
        return (
                   
            <div className = "mainContainer">
                
                {/* AppBar Container */}
                <AppBar position = "static">

                    <div className = "appbarContents">
                        
                        <div className = "userNameStyles">

                            <div className = "userIconContainer">
                                
                                <AccountCircleIcon fontSize = "large"/>

                            </div>

                        </div>

                        <div className = "typographyContainer">

                            <Typography variant = "h6">

                                PORTFOLIO

                            </Typography>

                        </div>

                        <div className = "logoutButtonContainer">

                            <IconButton edge = "start" color = "inherit" aria-label = "Logout Buttom" onClick = { this.onlogOut }>

                                <ExitToAppIcon fontSize = "large"/>

                            </IconButton>

                        </div>

                    </div>

                </AppBar>
                {/* AppBar Component End */}

                {/* Middle Section */}

                <div className = "MiddleSectionContainer">

                    <div className = "middlesSectionSecondaryContainer">

                        <div className = "searchBarContainer">
                                
                                <AutoCompleteTextField items = { investmentsInstruments }/>

                        </div>

                        <div className = "HoldingsContainer">

                            <HoldingsTable />

                        </div>

                    </div>

                </div>

                {/* Middle Section End */}
                
            </div>

        );
    }
}

export default Portfolio;