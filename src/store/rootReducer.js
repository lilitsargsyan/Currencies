import {combineReducers} from "redux";
import {currenciesReducer} from "./currencyReducer";

export const rootReducer = combineReducers({
    currencies: currenciesReducer
})