import React, { Component } from 'react'

import { AppBar , Menu , MenuItem , MenuList } from "@material-ui/core"
import { IconButton, Typography } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import AutoCompleteTextField from "./AutoCompleteTextField"
import investmentsInstruments from "../Portfolio/investmentsInstruments"

import firebase from 'firebase';

import HoldingsTable from "./HoldingsTable"

import './stylePortfolio.css';

class Portfolio extends Component {
    
    constructor(props) {

        super(props);

        this.state = { anchorEl : null }

    }

    onlogOut = () => {

        firebase.auth().signOut();

        this.props.navigation.navigate("mainPage")

    }

    handleMenuOpen = (event) => {

        this.setState({

            anchorEl : event.currentTarget

        })

    }

    handleMenuClose = () => {

        this.setState({

            anchorEl : null

        })

    }

    redirectToRealisedPL = () => {
        
        this.props.navigation.navigate("RealisedPL")
        this.handleMenuClose()

    }

    render() {
        
        return (
                   
            <div className = "mainContainer">

                {/* Menu for Menu button  */}
                <Menu id = 'simpleMenu' anchorEl = { this.state.anchorEl } keepMounted open = { Boolean(this.state.anchorEl) } onClose = { this.handleMenuClose }>

                    <MenuList>
                    
                        <MenuItem onClick = { this.redirectToRealisedPL }> View Realised P&L </MenuItem>
                    
                    </MenuList>
                
                </Menu>

                {/* AppBar Container */}
                <AppBar position = "static">

                    <div className = "appbarContents">
                        
                        <div className = "userNameStyles">

                            <div className = "userIconContainer">
                                
                                <IconButton onClick = { this.handleMenuOpen } color = 'inherit'>

                                    <MenuRoundedIcon fontSize = "large"/>
                                
                                </IconButton>

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