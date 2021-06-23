import React, { Component } from 'react';

import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import StockDialog from "./StockDialog"

import "./AutoCompleteTextField.css"

class AutoCompleteTextField extends Component {
    
    constructor(props) {

        super(props);

        this.state = { 

            suggestions : [],

            text : '',

            stockInfoDialogOpen : false

        };

        this.suggestionSelected = this.suggestionSelected.bind(this);
        this.renderSuggestions = this.renderSuggestions.bind(this);
        this.AddButtonPressEvent = this.AddButtonPressEvent.bind(this);
        this.StockInfoDialogClose = this.StockInfoDialogClose.bind(this);

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

    suggestionSelected(value) {

        this.setState(() => ({

            text : value,

            suggestions : []

        }))

    }

    AddButtonPressEvent() {

        console.log("Add Button Pressed") // Working Properly

        this.setState({  

            stockInfoDialogOpen : true

        })

    }

    StockInfoDialogClose() {

        this.setState({

            stockInfoDialogOpen : false,

            text : ''

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

    render() {

        const { text } = this.state;

        return (

            <div className = "AutoCompleteTextField">

                <StockDialog  
                    open = { this.state.stockInfoDialogOpen } 
                    onClose = { this.StockInfoDialogClose }
                    companyName = { text } />


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