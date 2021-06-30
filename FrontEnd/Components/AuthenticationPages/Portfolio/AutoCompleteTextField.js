import React, { Component } from 'react';

import { IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { Snackbar, Dialog, TextField, Button, DialogTitle, DialogContent } from '@material-ui/core';

import "./AutoCompleteTextField.css"
import "./StockDialog.css"

import firebase from "firebase"

class AutoCompleteTextField extends Component {
    
    constructor(props) {

        super(props);

        this.state = { 

            suggestions : [],

            setStockDialog : false, // Stock dialog box state variable
            
            // State variables for stock Information  
            text : '',
            
            StockQuantity : '',

            StockBuyPrice : '',

            // Snackbar state variables
            SnackbarOpen : false,

            SnackbarMessage : ''

        };

        this.suggestionSelected = this.suggestionSelected.bind(this);
        this.renderSuggestions = this.renderSuggestions.bind(this);
        this.AddButtonPressEvent = this.AddButtonPressEvent.bind(this);

    }

    onTextChange = (e) => {

        const { items } = this.props;

        const value = e.target.value;
        
        let suggestions = []

        if(value.length > 0){

            const regex = new RegExp(`^${value}` , 'i')

            suggestions = items.sort().filter(v => regex.test(v))

        }
            
        this.setState(() => ({ suggestions , text : value }))

    } 
    
    // Function to close snackbar 
    snackbarClose = () => {

        this.setState({  

            SnackbarOpen : false

        })

    } 
    
    // To close the stock dialog box
    onCloseEvent = () => {

        this.setState({

            setStockDialog : false,

            StockBuyPrice : '',

            StockQuantity : ''

        })

    }
    
    // Function to handle the quantity Input 
    handleStockQuantity = (e) => {

        this.setState({

            StockQuantity : e.target.value

        })

    }

    // Function to handle the buy average price
    handleStockBuyPrice = (e) => {

        this.setState({

            StockBuyPrice : e.target.value

        })

    }

    suggestionSelected(value) {

        this.setState(() => ({

            text : value,

            suggestions : []

        }))

    }

    // To open the stock dialog box 
    AddButtonPressEvent() {

        this.setState({  

            setStockDialog : true

        })

    }

    renderSuggestions() {

        const { suggestions } = this.state;

        if (suggestions.length === 0) { 
            
            return null;
        
        }
        return (
                
                <ul>

                    { 
                    
                        suggestions.map((item) => 
                        
                            <li onClick = { () => this.suggestionSelected(item) }> 
                            
                                <div className = "alignmentContainer">
                                    
                                    <div className = "listNameContainer"> { item } </div>
                                
                                    <div className = "AddButtonContainer"> 
                                    
                                        <IconButton edge = 'center' onClick = { () => this.AddButtonPressEvent() }> <AddIcon fontSize = "small"/> </IconButton>
                                    
                                    </div>

                                </div>

                            </li>
                            
                        ) 
                    
                    }              
                
                </ul>

        )

    }  

    saveEventHandler = () => {

        console.log("Pressed Save Button")

        var user = firebase.auth().currentUser;

        var user_uid = user.uid;

        if( this.state.StockQuantity.length === 0 || this.state.StockBuyPrice.length === 0 ) {

            this.setState({  

                SnackbarOpen : true,

                SnackbarMessage : "Please Enter the values in the requiered fields"

            })

        } else {

            // Success and store values in the database             

            const STOCK_NAME_DB = this.state.text
            const STOCK_QTY_DB = this.state.StockQuantity
            const STOCK_BUY_VALUE_DB = this.state.StockBuyPrice

            firebase.firestore().collection('USER_PORTFOLIO').add({

                    UID : user_uid,
                    STOCK_INFORMATION : {
                        STOCK_NAME : STOCK_NAME_DB,
                        STOCK_QUANTITY : STOCK_QTY_DB,
                        STOCK_BUY_AVERAGE : STOCK_BUY_VALUE_DB
                    }
                
            })
                
            .then(() => {

                this.setState({ 

                    setStockDialog : false,

                    SnackbarOpen : true,

                    SnackbarMessage : "Added Successfully"

                })

            })
            .catch(error => {

                this.setState({  

                    SnackbarOpen : true,

                    SnackbarMessage : error.message

                })

            })

        }

    }

    render() {

        const { text } = this.state;

        return (

            <div className = "AutoCompleteTextField">

                <Snackbar 
                    anchorOrigin = {{ vertical:"top" , horizontal:"center" }}
                    open = { this.state.SnackbarOpen }
                    onClose = { this.snackbarClose }
                    message = { this.state.SnackbarMessage }
                    action = {[

                        <IconButton 
                            key = "close" 
                            color = "inherit" 
                            arial-label = "Close" 
                            onClick = { this.snackbarClose }>
                            X
                        </IconButton>
                        
                    ]}

                />

                <Dialog 
                    open = { this.state.setStockDialog } 
                    onClose = { this.onCloseEvent } 
                    fullWidth
                    maxWidth = "md" > 

                    <DialogTitle onClose = { this.onCloseEvent }>
                    
                        <div className = "headingDialogBox">

                            <Typography variant = "h6">

                                BUY { text }

                            </Typography>

                        </div>

                    </DialogTitle>

                    <DialogContent dividers>

                        <div className = "DialogBoxTextField">
                        
                            <TextField 
                            fullWidth
                            type = "number"
                            placeholder = "Enter the quantity"
                            label = "Quantity"
                            value = { this.state.StockQuantity }
                            onChange = { this.handleStockQuantity }
                            variant = "filled"
                            requiered
                            />
                        
                        </div>

                        <div className = "DialogBoxTextField">

                            <TextField 
                            fullWidth
                            type = "number"
                            placeholder = "Enter the Average buying Price"
                            label = "Average Buying Price"
                            value = { this.state.StockBuyPrice }
                            onChange = { this.handleStockBuyPrice }
                            variant = "filled"
                            requiered 
                            />

                        </div>

                        <div className = "ButtonsContainer">
                            
                            <div className = "buttonWrapper"> 
                        
                            <Button onClick = { this.saveEventHandler } variant = "outlined" color = "primary"> SAVE </Button> 
                        
                            </div>

                            <div className = "buttonWrapper">
                                
                                <Button onClick = { this.onCloseEvent } variant = "outlined" color = "secondary"> CLOSE </Button>

                            </div>
                        
                        </div>

                    </DialogContent>
                
                </Dialog>

                <div className = "inputSegment">

                    <div className = "alignmentContainer">
                        
                        <div className = "SearchButtonContainer"> 

                            <SearchIcon />                   
                
                        </div>
                    
                        <input value = { text } onChange = { this.onTextChange } type = "text"/>

                    </div>
                    
                    { this.renderSuggestions() }

                </div>

            </div>

        );

    }

}

export default AutoCompleteTextField;