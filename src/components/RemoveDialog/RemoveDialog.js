import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Typography} from "@material-ui/core";

export default function RemoveDialog({isOpenRemoveDialog, setIsOpenRemoveDialog, confirmRemoveCurrency}) {
    const handleClose = () => {
        setIsOpenRemoveDialog(false)
    };

    const handleConfirmRemove = () => {
        confirmRemoveCurrency()
        setIsOpenRemoveDialog(false)
    };

    return (
        <div>
            <Dialog
                open={isOpenRemoveDialog}
                onClose={()=> handleClose('')}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Remove Currency</DialogTitle>
                <DialogContent>
                    <Typography
                        gutterBottom
                        margin="normal"
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        Are you sure you want to remove this Currency
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> handleClose()} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={()=> handleConfirmRemove()} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}