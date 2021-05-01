import {FETCH_CURRENCIES} from "./types";

export function fetchCurrencies (data) {
    console.log("FETCH_CURRENCIES", data)
    return {
        type: FETCH_CURRENCIES,
        payload: data
    }
}