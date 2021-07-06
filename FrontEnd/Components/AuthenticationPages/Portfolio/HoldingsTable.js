import * as React from 'react'
import { Component } from 'react';

import { TableContainer , Table , TableHead , TableRow , TableCell , TableBody , TablePagination , Paper , Typography } from '@material-ui/core';
import { IconButton } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Dialog , DialogTitle , DialogContent , TextField , Button , Snackbar } from "@material-ui/core"

import firebase from "firebase"

import "./StockDialog.css"

class HoldingsTable extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            
            // For Pagination
            setPage : 0,

            setRowsPerPage : 10,

            arr : [], // Data Array

            // For stock edit dialog

            setStockDialog : false,

            // Variables for the update event

            updateQty : '',

            updateBuyAverage : '',

            documentId : null,

            referenceCompanyNameForUpdateStockDialog : '',

            // Delete Dailog variables
            
            setDeleteDialog : false,

            // Snackbar state variables

            SnackbarOpen : false,

            SnackbarMessage : '',

            // Exit Stock Dialog Variable

            setExitStockDialog : false,

            exitPrice : '',

        }

        this.columns = [

            { id : 'company_name_value' , label : 'COMPANY NAME' , minWidth : 170 , buttonBool : false },
            { id : 'quantity_value' , label : 'QUANTITY' , minWidth : 170 , buttonBool : false },
            { id : 'buy_average_value' , label : 'BUY AVERAGE' , minWidth : 170 , buttonBool : false },
            { 
                id : 'actions' , 
                label : "ACTIONS" , 
                minWidth : 170 ,
                buttonBool : true
            }

        ]
        
    }

    componentDidMount() {

        const user = firebase.auth().currentUser;

        const query = firebase.firestore().collection('USER_PORTFOLIO').where("UID", '==', user.uid)
        
        query.onSnapshot((querySnapshot) => {

            querySnapshot.docChanges().forEach((change) => {

                if (change.type === 'added') {

                    let buy_average_value = change.doc.data().STOCK_INFORMATION.STOCK_BUY_AVERAGE;

                    let quantity_value = change.doc.data().STOCK_INFORMATION.STOCK_QUANTITY;

                    let company_name_value = change.doc.data().STOCK_INFORMATION.STOCK_NAME;

                    let doc_id = change.doc.id;

                    let temp = { doc_id, company_name_value, quantity_value, buy_average_value }

                    this.setState( prevState => ({

                        arr : [...prevState.arr , temp]

                    }))
                
                } 

            });

        }) 

    }

    // To close the snackbar 
    snackbarClose = () => {

        this.setState({  

            SnackbarOpen : false

        })

    }

    // To Close the edit dialog
    onCloseEvent = () => {

        this.setState({

            setStockDialog : false,

            StockBuyPrice : '',

            StockQuantity : ''

        })

    }

    // To Close delete dialog
    onCloseDeleteDialog = () => {

        this.setState({

            setDeleteDialog : false

        })

    }

    // To Close Sell Dialog 
    onCloseExitStockDialog = () => {

        this.setState({

            exitPrice : '',

            setExitStockDialog : false

        })

    }

    // To handle the edit event
    handleEditEvent = async() => {

        if(this.state.updateQty === '' || this.state.updateBuyAverage === ''){

            this.setState({

                SnackbarOpen : true,

                setStockDialog : false,

                SnackbarMessage : 'Please enter UPDATED QUANTITY and Updated BUY AVERAGE'

            })

            return null

        }

        const queryRef = firebase.firestore().collection('USER_PORTFOLIO').doc(this.state.documentId);

        await queryRef.update({  

            STOCK_INFORMATION : {

                STOCK_NAME : this.state.referenceCompanyNameForUpdateStockDialog,

                STOCK_BUY_AVERAGE : this.state.updateBuyAverage,

                STOCK_QUANTITY : this.state.updateQty

            }

        })
        .then(async() => {

            let temp = []

            const currentUser = firebase.auth().currentUser;

            const collectionRef = firebase.firestore().collection('USER_PORTFOLIO')

            const dataRef = await collectionRef.where('UID' , '==' , currentUser.uid).get();

            if(!dataRef.empty) {

                dataRef.forEach(doc => {

                    let company_name_value = doc.data().STOCK_INFORMATION.STOCK_NAME;

                    let buy_average_value = doc.data().STOCK_INFORMATION.STOCK_BUY_AVERAGE;

                    let quantity_value = doc.data().STOCK_INFORMATION.STOCK_QUANTITY;

                    let doc_id = doc.id;

                    temp.push( { doc_id, company_name_value, quantity_value, buy_average_value } )

                })

                this.setState({

                    arr : temp,

                    setStockDialog : false,

                    updateQty : '',

                    updateBuyAverage : '',

                    SnackbarOpen : true,

                    SnackbarMessage : 'Updated Successfully'

                })
            }
        
        })
        .catch(error => {

            this.setState({

                setStockDialog : false,

                SnackbarOpen : true,
    
                SnackbarMessage : error.message

            })

        })
        
    }

    // To handle the delete event
    handleDeleteEvent = async() => {

        let temp = []

        const currentUser = firebase.auth().currentUser;
        
        await firebase.firestore().collection('USER_PORTFOLIO').doc(this.state.documentId).delete()

        .then(async () => {

            const collectionRef = firebase.firestore().collection('USER_PORTFOLIO')

            const dataRef = await collectionRef.where('UID' , '==' , currentUser.uid).get()
            
            dataRef.forEach(doc => {

                let company_name_value = doc.data().STOCK_INFORMATION.STOCK_NAME;

                let buy_average_value = doc.data().STOCK_INFORMATION.STOCK_BUY_AVERAGE;

                let quantity_value = doc.data().STOCK_INFORMATION.STOCK_QUANTITY;

                let doc_id = doc.id;

                temp.push( { doc_id, company_name_value, quantity_value, buy_average_value } )

            })

            this.setState({

                arr : temp,

                setDeleteDialog : false,

                SnackbarOpen : true,

                SnackbarMessage : "Deleted Successfully"

            })

        })
        .catch((error) => {

            this.setState({

                setDeleteDialog : false,

                SnackbarOpen : true,

                SnackbarMessage : error.message

            })

        })

    }

    // To handle Sell Event 
    handleSellEvent = async() => {

        let temp = []

        if (this.state.exitPrice === ''){

            this.setState({

                setExitStockDialog: false,

                SnackbarOpen: true,

                SnackbarMessage: 'Please Enter sell value.'

            })

            return null

        } else {

            // Get the information of the document to be deleted ( buy value, qty, company Name, sell value )
            const docRef = firebase.firestore().collection('USER_PORTFOLIO').doc(this.state.documentId);

            const doc = await docRef.get();

            let companyName = doc.data().STOCK_INFORMATION.STOCK_NAME;

            let buyAverage = doc.data().STOCK_INFORMATION.STOCK_BUY_AVERAGE;

            let quantity = doc.data().STOCK_INFORMATION.STOCK_QUANTITY;

            var b = parseFloat(buyAverage);
            var s = parseFloat(this.state.exitPrice);
            var q = parseFloat(quantity)
            let PL = (s - b) * q;

            let currentUser = firebase.auth().currentUser;

            let currentUserUid = currentUser.uid;

            // Delete the document from USER_PORTFOLIO Collection
            await firebase.firestore().collection('USER_PORTFOLIO').doc(this.state.documentId).delete()
            .then(async() => {

                // Delete from the state array as well
                const collectionRef = firebase.firestore().collection('USER_PORTFOLIO')

                const dataRef = await collectionRef.where('UID' , '==' , currentUser.uid).get()
                
                dataRef.forEach(doc => {

                    let company_name_value = doc.data().STOCK_INFORMATION.STOCK_NAME;

                    let buy_average_value = doc.data().STOCK_INFORMATION.STOCK_BUY_AVERAGE;

                    let quantity_value = doc.data().STOCK_INFORMATION.STOCK_QUANTITY;

                    let doc_id = doc.id;

                    temp.push( { doc_id, company_name_value, quantity_value, buy_average_value } )

                })

                // Delete from the state array as well
                this.setState({

                    arr : temp,

                    setExitStockDialog: false,

                    SnackbarOpen : true,

                    SnackbarMessage : 'Sell Successfull'

                })

            })
            .catch(error => {

               this.setState({

                    setExitStockDialog : false,

                    SnackbarOpen : true,

                    SnackbarMessage : error.message

               })

            })

            // Add the data to a new collection Array : [ companyName , buyAverage , quantity , exit Price , UID ]
            let date = [];
            const d = new Date();
            let day = d.getDate()
            let month = (d.getMonth() + 1);
            let year = d.getFullYear();
            date = [day , month , year]
            let exitDate = date.toString()
            
            await firebase.firestore().collection('REALISED_P&L').add({

                STOCK_SELL_INFORMATION : {
                    STOCK_NAME : companyName,
                    STOCK_QUANTITY : quantity,
                    STOCK_BUY_AVERAGE : buyAverage,
                    STOCK_SELL_VALUE : this.state.exitPrice,
                    STOCK_PL : PL,
                    EXITDATE : exitDate
                },
                UID : currentUserUid
                    
            })
            .then(() => {

                console.log('Sell Successfull')

            })
            .catch(error => {

                console.log(error.message)

            })

        }

    }

    // Pagination functions
    handleChangePage = (event , newPage) => {

        this.setState({

            setPage : newPage

        })

    }

    handleChangeRowsPerPage = (event) => {

        this.setState({

            setRowsPerPage : +event.target.value,

            setPage : 0

        })

    }

    // Input handler functions
    qtyHandler = (e) => {

        this.setState({

            updateQty : e.target.value

        })

    }

    buyAverageHandler = (e) => {

        this.setState({

            updateBuyAverage : e.target.value

        })

    }

    exitPriceHandler = (e) => {

        this.setState({

            exitPrice : e.target.value

        })

    }

    // Helper Functions
    fetchDocId = async (documentId) => {

        const docRef = firebase.firestore().collection('USER_PORTFOLIO').doc(documentId);

        const doc = await docRef.get();

        if(!doc.exists) {

            console.log('No such Document available')

        } else {

            let companyName = doc.data().STOCK_INFORMATION.STOCK_NAME
            
            this.setState({

                referenceCompanyNameForUpdateStockDialog : companyName,

                setStockDialog : true,

                documentId : documentId

            })

        }

    }

    fetchDocIdForDelete = async (documentId) => {

        const docRef = firebase.firestore().collection('USER_PORTFOLIO').doc(documentId);

        const doc = await docRef.get();

        let companyName = doc.data().STOCK_INFORMATION.STOCK_NAME;

        this.setState({

            referenceCompanyNameForUpdateStockDialog : companyName,

            setDeleteDialog : true,

            documentId : documentId

        })

    }

    sellEventHelperFunction = async (documentId) => {

        const docRef = firebase.firestore().collection('USER_PORTFOLIO').doc(documentId);

        const doc = await docRef.get();

        let companyName = doc.data().STOCK_INFORMATION.STOCK_NAME;

        this.setState({

            setExitStockDialog : true,

            referenceCompanyNameForUpdateStockDialog : companyName,

            documentId : documentId

        })

    }   

    render() {

        if(this.state.arr.length === 0) {

            return(

                <div style = {{ backgroundColor : '#F5F5F5' , boxShadow : '10px 10px 8px #888888' , minWidth : '500px' , maxHeight : '800px' , flexDirection : 'column' , display : 'flex' , padding : '5%' , justifyContent : 'center' , flex : 1 , margin : '1%' }}>
                    
                        <Typography color = 'textPrimary' align = 'center' variant = 'h6'>
                            No Records to Display!
                        </Typography>
                        <Typography color = 'textPrimary' align = 'center' variant = 'body1'>  
                            Add Data through the search bar.
                        </Typography>
                    
                </div>

            )

        } else{

            return(
    
                <div style = {{ margin : "1%" , boxShadow : '10px 10px 8px #888888' }}>

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
                        open = { this.state.setDeleteDialog }
                        close = { this.onCloseDeleteDialog }
                        maxWidth = "sm"
                    >

                        <DialogTitle onClose = { this.onCloseDeleteDialog }>

                            <Typography variant = "h6" align = "center"> Confirm Delete { this.state.referenceCompanyNameForUpdateStockDialog } ? </Typography>

                        </DialogTitle>

                        <DialogContent dividers>

                            <div className = "ButtonsContainer">
                                
                                <div className = "buttonWrapper"> 
                            
                                    <Button onClick = { this.handleDeleteEvent } variant = "outlined" color = "primary"> DELETE </Button> 
                            
                                </div>

                                <div className = "buttonWrapper">
                                    
                                    <Button onClick = { this.onCloseDeleteDialog } variant = "outlined" color = "secondary"> CANCEL </Button>

                                </div>
                            
                            </div>

                        </DialogContent>

                    </Dialog>

                    <Dialog 
                        open = { this.state.setExitStockDialog }
                        close = { this.onCloseExitStockDialog }
                        maxWidth = "md"
                    >

                        <DialogTitle onClose = { this.onCloseExitStockDialog }>

                                <Typography variant = "h6">

                                    SELL { this.state.referenceCompanyNameForUpdateStockDialog }

                                </Typography>
                            
                        </DialogTitle>

                        <DialogContent dividers>

                            <div className = "DialogBoxTextField">

                                <TextField
                                fullWidth
                                type = "number"
                                placeholder = "Enter Sell Price"
                                label = "Sell Price"
                                value = { this.state.exitPrice }
                                onChange = { this.exitPriceHandler }
                                variant = "filled"
                                requiered
                                />

                            </div>

                            <div className = "ButtonsContainer">
                                
                                <div className = "buttonWrapper"> 
                            
                                    <Button onClick = { this.handleSellEvent } variant = "outlined" color = "primary"> SELL </Button> 
                            
                                </div>

                                <div className = "buttonWrapper">
                                    
                                    <Button onClick = { this.onCloseExitStockDialog } variant = "outlined" color = "secondary"> CANCEL </Button>

                                </div>
                            
                            </div>

                        </DialogContent>

                    </Dialog>

                    <Dialog 
                        open = { this.state.setStockDialog } 
                        onClose = { this.onCloseEvent } 
                        fullWidth
                        maxWidth = "md" > 

                        <DialogTitle onClose = { this.onCloseEvent }>
                        
                            <div className = "headingDialogBox">

                                <Typography variant = "h6">

                                    EDIT { this.state.referenceCompanyNameForUpdateStockDialog }

                                </Typography>

                            </div>

                        </DialogTitle>

                        <DialogContent dividers>

                            <div className = "DialogBoxTextField">
                            
                                <TextField 
                                fullWidth
                                type = "number"
                                placeholder = "Update quantity"
                                label = "Quantity"
                                value = { this.state.updateQty }
                                onChange = { this.qtyHandler }
                                variant = "filled"
                                requiered
                                />
                            
                            </div>

                            <div className = "DialogBoxTextField">

                                <TextField 
                                fullWidth
                                type = "number"
                                placeholder = "Update Average buying Price"
                                label = "Average Buying Price"
                                value = { this.state.updateBuyAverage }
                                onChange = { this.buyAverageHandler }
                                variant = "filled"
                                required
                                />

                            </div>

                            <div className = "ButtonsContainer">
                                
                                <div className = "buttonWrapper"> 
                            
                                    <Button onClick = { this.handleEditEvent } variant = "outlined" color = "primary"> UPDATE </Button> 
                            
                                </div>

                                <div className = "buttonWrapper">
                                    
                                    <Button onClick = { this.onCloseEvent } variant = "outlined" color = "secondary"> CLOSE </Button>

                                </div>
                            
                            </div>

                        </DialogContent>
                    
                    </Dialog>
    
                    <TableContainer component = { Paper } style = {{ maxHeight : "800px" }}>
                    
                        <Table stickyHeader aria-label = "sticky-table">
    
                            <TableHead>
    
                                <TableRow>
    
                                    { this.columns.map((column) => (
    
                                        <TableCell
                                        key = { column.id }
                                        style = {{ minWidth: column.minWidth }}>
    
                                            { column.label }
    
                                        </TableCell>
                                    
                                    ))}
    
                                </TableRow>
    
                            </TableHead>
    
                            <TableBody>
    
                                { this.state.arr
                                    .slice( this.state.setPage * this.state.setRowsPerPage , this.state.setPage * this.state.setRowsPerPage + this.state.setRowsPerPage)
                                    .map((row) => {
    
                                    return(
                                        
                                        <TableRow hover tabIndex = { -1 } key = { row.doc_id }>
    
                                            { this.columns.map((column) => {
    
                                                const value = row[column.id];

                                                const buttonBool = column.buttonBool;

                                                { if(buttonBool){ 
                                                        return(
                                                            <TableCell key = {column.id}>    
                                                                <IconButton onClick = { () => { this.fetchDocId(row.doc_id) } } color = "primary" >
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton onClick = { () => { this.fetchDocIdForDelete(row.doc_id) } } color = 'default' >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                                <IconButton onClick = { () => { this.sellEventHelperFunction(row.doc_id) } } color = 'secondary' size = 'small'>
                                                                    SELL
                                                                </IconButton>
                                                            </TableCell>
                                                        )
                                                    } else { 
                                                        return( 
                                                            <TableCell key = {column.id}>
                                                                { value }
                                                            </TableCell> 
                                                        ) 
                                                    } 
                                                }                                          
                                            }) }
    
                                        </TableRow>
    
                                    )
    
                                }) }
    
                            </TableBody>
    
                        </Table>
                        
                        <TablePagination
                        rowsPerPageOptions = {[10, 25, 100]}
                        component = { Paper }
                        count = { this.state.arr.length }
                        rowsPerPage = { this.state.setRowsPerPage }
                        page = { this.state.setPage }
                        onChangePage = { this.handleChangePage }
                        onChangeRowsPerPage = { this.handleChangeRowsPerPage } />
                        
                    </TableContainer>
    
                </div>
    
            )
        
        }
            

    }

}

export default HoldingsTable;