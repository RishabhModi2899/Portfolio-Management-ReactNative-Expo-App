import React, { Component } from 'react'

import MaterialTable from "material-table";

import firebase from "firebase"

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { IconButton } from '@material-ui/core';
 
class HoldingsTable extends Component {

    constructor(props) {
        
        super(props);

        this.state = {

            data_display : []

        }

        this.data_db = []

        this.tableIcons = {

            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)

        };

        
    }

    async componentDidMount(){

        const user = firebase.auth().currentUser;

        const dataRef = firebase.firestore().collection('USER_PORTFOLIO');
        
        const snapshot = await dataRef.where('UID', '==', user.uid).get();
        
        if (snapshot.empty) {
        
            console.log('No matching documents.'); // Snackbar alert No data available 
        
            return;
        
        }  

        snapshot.forEach(doc => {
        
            const buy_average_value = ( doc.id , '=>' , doc.data().STOCK_INFORMATION.STOCK_BUY_AVERAGE ) 
            
            const quantity_value = ( doc.id , "=>" , doc.data().STOCK_INFORMATION.STOCK_QUANTITY )

            const company_name_value = ( doc.id , "=>" , doc.data().STOCK_INFORMATION.STOCK_NAME )            

            this.data_db.push( { company : company_name_value , qty : quantity_value , buyAverage : buy_average_value } ) 
                
        })

        console.log("DATA" , this.data_db)

        this.setState({

            data_display : this.data_db

        })

    }

    

    handleEditEvent = () => {

    }

    handleDeleteEvent = () => {

    }

    render() {

        return(

            <MaterialTable 
            icons = { this.tableIcons }
            title = "Your Holdings" 
            columns = {[
                { title : "COMPANY" , field : "company" },
                { title : "QUANTITY" , field : "qty" },
                { title : "BUY AVERAGE" , field : "buyAverage" }
            ]}
            data = { this.state.data_display }
            options = {{
                search : false,
                exportButton : true,
            }}      
            actions = {[
                
                {
                    icon : 'delete',
                    tooltip : 'Delete',
                    // onClick : (event, rowData) => alert("You saved " + rowData.name)
                },
                {
                    icon : 'edit',
                    tooltip : 'Edit Stock Info',
                    // onClick : (event, rowData) => confirm("You want to delete " + rowData.name)
                }
    
            ]}  />

        )

    }

}

export default HoldingsTable;