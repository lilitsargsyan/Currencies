import {FETCH_CURRENCIES, IS_LOADING} from "./types";

const initialState = {
    currencies: [],
    loader: true,
}

export const currenciesReducer = ( state = initialState, action) => {
    switch (action.type) {
        case FETCH_CURRENCIES:
            return { ...state, currencies: action.payload}
        case IS_LOADING:
            return { ...state, loader: action.payload}
        default: return state
    }
}