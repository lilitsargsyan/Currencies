import {FETCH_CURRENCIES, IS_LOADING} from "./types";

export function fetchCurrencies (data) {
    return {
        type: FETCH_CURRENCIES,
        payload: data
    }
}
export function isLoading (bool) {
    return {
        type: IS_LOADING,
        payload: bool
    }
}