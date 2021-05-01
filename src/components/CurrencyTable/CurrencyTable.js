import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';

import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TextField from "@material-ui/core/TextField";
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

import {Box, Button, InputAdornment, Typography} from "@material-ui/core";
import AddEditDialog from "../AddEditDialog/AddEditDialog";

import RemoveDialog from "../RemoveDialog/RemoveDialog";
import {fetchCurrencies} from "../../store/actions";
import firebase from "../../firebase";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    search: {
        margin: '20px 0',
        minWidth: 350,
    },
});


const CurrencyTable = () => {
    const classes = useStyles();

    // Get store state
    const dispatch = useDispatch()
    const {currencies} = useSelector(state => state.currencies)

    // Component state
    const [isOpenAddEditDialog, setIsOpenAddEditDialog] = useState(false);
    const [isOpenRemoveDialog, setIsOpenRemoveDialog] = useState(false);
    const [currencyItem, setCurrencyItem] = useState(null);
    const [isCreateDialog, setIsCreateDialog] = useState(true);
    const [search, setSearch] = useState('');

    // Firebase collection path
    const ref = firebase.firestore().collection('Currencies')

    console.log("Currencies", currencies)
    console.log("Currency Item", currencyItem)


    // Get Currencies from firebase
    useEffect(() => {
        getCurrencies()
    }, [])

    // Search currency by Currency name
    useEffect(() => {
        const searchedData = currencies.filter((item) => {
            return item.name.includes(search)
        })
        dispatch(fetchCurrencies(searchedData))
    }, [search])


    const getCurrencies = async () => {
        await ref.onSnapshot((query) => { // watch for changes in Currencies doc in firebase
            const currenciesList = [];
            query.forEach((doc) => {
                currenciesList.push({ ...doc.data(), id:doc.id}) // id generated from firebase
            })
            dispatch(fetchCurrencies(currenciesList))
        })
    }

    // Add/Edit Currency from firebase
    const confirmAddEditCurrency = async (formData) => {
        if (isCreateDialog) {
            await ref.add(formData)
        } else {
            if (JSON.stringify(formData) === JSON.stringify(currencyItem)) return
            await ref.doc(currencyItem.id).set(formData, { merge: true })
        }
    }

    // Remove Currency from firebase
    const confirmRemoveCurrency = async () => {
        await ref.doc(currencyItem.id).delete()
    };

    //open Add/Edit Dialog
    const handleClickOpen = (item, isDialogTypeCreate) => {
        setIsOpenAddEditDialog(true)
        setCurrencyItem(item)
        setIsCreateDialog(isDialogTypeCreate)
    };

    //open Remove Dialog
    const handleRemoveOpen = (item) => {
        setIsOpenRemoveDialog(true)
        setCurrencyItem(item)
    }

    const handleSearch = ({target: {value}}) => {
        setSearch(value)
    }

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography
                    gutterBottom
                    color="textPrimary"
                    variant="h4"
                >
                    Custom Currencies
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClickOpen({name: "", rate: "" }, true)}
                >
                    Add Currency
                </Button>
            </Box>
            <Box display="flex" justifyContent="flex-end">
                <TextField
                    className={classes.search}
                    value={search}
                    variant="outlined"
                    size="small"
                    placeholder="Search currency by Currency name"
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Currency Name</TableCell>
                            <TableCell>Rate(1$ = X rate)</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currencies.length ? currencies.map(currencyItem => (
                            <TableRow key={currencyItem.id}>
                                <TableCell component="th" scope="row">
                                    {currencyItem.id}
                                </TableCell>
                                <TableCell>{currencyItem.name}</TableCell>
                                <TableCell>{currencyItem.rate}</TableCell>
                                <TableCell align="right">
                                    <EditIcon
                                        color="primary"
                                        onClick={() => handleClickOpen(currencyItem, false)}
                                    />
                                    <DeleteIcon
                                        color="error"
                                        onClick={() => handleRemoveOpen(currencyItem)}
                                    />
                                </TableCell>
                            </TableRow>
                        )) :
                            <TableRow>
                                <TableCell />
                                <TableCell>
                                    <Typography
                                        align="right"
                                        color="textPrimary"
                                        variant="h6"
                                    >
                                        No Currencies
                                    </Typography>
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {currencyItem &&
                <>
                    <AddEditDialog
                        currencyItem={currencyItem}
                        setCurrencyItem={setCurrencyItem}
                        isCreateDialog={isCreateDialog}
                        isOpenAddEditDialog={isOpenAddEditDialog}
                        setIsOpenAddEditDialog={setIsOpenAddEditDialog}
                        confirmAddEditCurrency={confirmAddEditCurrency}
                    />
                    <RemoveDialog
                        isOpenRemoveDialog={isOpenRemoveDialog}
                        setIsOpenRemoveDialog={setIsOpenRemoveDialog}
                        confirmRemoveCurrency={confirmRemoveCurrency}
                    />
                </>
            }
        </>
    )
}

export default CurrencyTable