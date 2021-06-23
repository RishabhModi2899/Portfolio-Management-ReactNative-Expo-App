import React, { Component } from 'react'

import { Dialog, TextField, DialogTitle, DialogContent } from "@material-ui/core"
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { Button } from "@material-ui/core"

const useStyles = theme => ({  

    dialogWrapper : {

        padding : "2%",
        position : "absolute"

    },

    TextFieldContainer : {

        paddingLeft : "1%",
        paddingRight : "5%",
        paddingTop : "2.5%",
        paddingBottom : "2.5%"

    },

    ButtonContainer : {

        padding : "1%",
        margin : "1%"

    },

})

class StockDialog extends Component {

    constructor(props) {

        super(props);
        
        this.state = {  

            StockQuantity : null,

            StockBuyPrice : null

        };

    }

    handleStockQuantity = (e) => {

        this.setState({

            StockQuantity : e.target.value

        })

    }

    handleStockBuyPrice = (e) => {

        this.setState({

            StockBuyPrice : e.target.value

        })

    }

    render() {

        const { classes } = this.props;

        return (    

            <Dialog 
                open = { this.props.open } 
                onClose = { this.props.onClose } 
                fullWidth
                maxWidth = "md" 
                className = {{ paper : classes.dialogWrapper }}>
    
                <DialogTitle onClose = { this.props.onClose }>
                    
                    <div> 
                        
                        <Typography variant = "h6" component = "div">
                            
                            BUY { this.props.companyName }

                        </Typography>
                        
                    </div> 
                
                </DialogTitle>


                <DialogContent dividers>    

                    <div className = { classes.TextFieldContainer }>
                    
                        <TextField
                            fullWidth
                            placeholder = "Enter the quantity"
                            label = "Quantity"
                            value = { this.state.StockQuantity }
                            onChange = { this.handleStockQuantity }
                            variant = "filled"
                            required
                        />
                    
                    </div>

                    <div className = { classes.TextFieldContainer }>
                        
                        <TextField
                            fullWidth
                            placeholder = "Enter the Average buying Price"
                            label = "Average Buy Price"
                            value = { this.state.StockBuyPrice }
                            onChange = { this.handleStockBuyPrice }
                            variant = "filled"
                            required
                        />
                    
                    </div>

                    <div className = { classes.ButtonContainer }> 
                        
                        <Button variant = "outlined" color = "primary"> SAVE </Button>

                        <Button onClick = { this.props.onClose } variant = "outlined" color = "secondary"> CLOSE </Button>

                    </div>

                </DialogContent>

            </Dialog>

        );
    
    }

}

export default withStyles(useStyles)(StockDialog);