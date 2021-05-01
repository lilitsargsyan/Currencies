import React, {useEffect, useState} from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl, FormLabel} from "@material-ui/core";

export default function AddEditDialog(
    {
        currencyItem,
        isCreateDialog,
        isOpenAddEditDialog,
        setIsOpenAddEditDialog,
        confirmAddEditCurrency
    }) {

    const [currency, setCurrency] = useState({name: '', rate: ''})

    useEffect(() => {
        setCurrency(currencyItem)
    }, [currencyItem])

    //Dialog actions
    const handleClose = () => {
        setIsOpenAddEditDialog(false)
    };

    const handleConfirm = (currency) => {
        setIsOpenAddEditDialog(false)
        confirmAddEditCurrency(currency)
    };

    const handleChange = name => ({target: {value}}) => {
        setCurrency({
            ...currency,
            [name]: value,
        })
    }

    return (
        <div>
            <Dialog
                open={isOpenAddEditDialog}
                onClose={() => handleClose()}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{isCreateDialog ? 'Create' : 'Edit'} Currency</DialogTitle>
                <DialogContent>
                    <form>
                        <FormControl fullWidth component="fieldset" margin="normal">
                            <FormLabel component="legend">Name</FormLabel>
                            <TextField
                                fullWidth
                                margin="dense"
                                variant="outlined"
                                value={currency.name}
                                onChange={handleChange('name')}
                            />
                        </FormControl>
                        <FormControl fullWidth component="fieldset" margin="normal">
                            <FormLabel component="legend" >Rate</FormLabel>
                            <TextField
                                fullWidth
                                type="number"
                                margin="dense"
                                variant="outlined"
                                helperText="Enter only number"
                                value={currency.rate}
                                onChange={handleChange('rate')}
                            />
                        </FormControl>
                    </form>
                </DialogContent>


                <DialogActions>
                    <Button
                        onClick={() => handleClose()}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleConfirm(currency)}
                        color="primary"
                        disabled={!(currency.name && currency.rate)}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}