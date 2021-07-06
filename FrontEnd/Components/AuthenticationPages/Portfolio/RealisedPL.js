import React, { Component } from 'react'

import MaterialTable from 'material-table';
import { Paper , Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import firebase from 'firebase'

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


class RealisedPL extends Component {
    
    constructor(props) {
    
        super(props);
    
        this.state = { arr : [] , total : 0 };

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
        }
    
    }

    async componentDidMount() {

        let total = 0;
        const currentUser = firebase.auth().currentUser
        const uid = currentUser.uid
        const DataRef = firebase.firestore().collection('REALISED_P&L');
        const snapshot = await DataRef.where('UID' , '==' , uid).get();
        let temp = []
        snapshot.forEach(doc => {
            let company = (doc.id , '=>' , doc.data().STOCK_SELL_INFORMATION.STOCK_NAME)
            let quantity = (doc.id , '=>' , doc.data().STOCK_SELL_INFORMATION.STOCK_QUANTITY)
            let buyAverage = (doc.id , '=>' , doc.data().STOCK_SELL_INFORMATION.STOCK_BUY_AVERAGE)
            let sellAverage = (doc.id , '=>' , doc.data().STOCK_SELL_INFORMATION.STOCK_SELL_VALUE)
            let result = (doc.id , '=>' , doc.data().STOCK_SELL_INFORMATION.STOCK_PL)
            let exitDate = (doc.id , '=>' , doc.data().STOCK_SELL_INFORMATION.EXITDATE)
            total = parseFloat(result) + total;
            temp.push({ company , quantity , buyAverage , sellAverage , result , exitDate })
        })
        this.setState({
            total : total,
            arr : temp
        })

    }

    redirectToPortfolio = () => {

        this.props.navigation.navigate("Portfolio")

    }

    render() {
    
        return (

            <div style = {{ marginTop : '5%' , marginRight : '5%' , marginLeft : '5%' , display : 'flex' , flex : 1 , flexDirection : 'column' , overflow : scroll }}>
            
                <Paper>

                    <MaterialTable 
                        icons = { this.tableIcons }
                        columns = {[

                            { title : 'COMPANY NAME' , field : 'company' },
                            { title : 'QTY' , field : 'quantity' },
                            { title : 'BUY VALUE' , field : 'buyAverage' },
                            { title : 'SELL VALUE' , field : 'sellAverage' },
                            { title : 'REALISED P&L' , field : 'result' },
                            { title : 'EXIT DATE' , field : 'exitDate' }

                        ]}
                        data = { this.state.arr }
                        title = "REALISED P&L"
                        options = {{
                            exportButton : true,
                            paging : false
                        }}
                    /> 

                </Paper>

                <div style = {{ boxShadow : 'box-shadow: 5px 10px #888888' , backgroundColor : 'aliceblue' , padding : '2%' , margin : '3%' , display : 'flex' ,justifyContent : 'center' , alignItems : 'center' }}>
                    
                        <Typography variant = "h6" color = "primary">  
                            Total Realised Profit/Loss : { this.state.total }
                        </Typography>
                    
                </div>

                <div style = {{ margin : '5%' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                    <IconButton onClick = { this.redirectToPortfolio }>
                        <ArrowBackIcon fontSize="md"/>
                    </IconButton>
                    <Typography color = "secondary" variant = "h6"> Back to Portfolio </Typography>
                </div>
            
            </div>

        );
    
    }

}

export default RealisedPL;