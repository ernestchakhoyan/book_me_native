import * as types from "../constants/actionTypes";
import {
    removeItemFromStorage,
    setItemToStorage
} from "../services/storage";

export const signin = (dispatch) => async (token) => {
    console.log(token,666);
    await setItemToStorage("access_token", token);
    dispatch({ type: types.SIGN_IN, token });
};

export const signout = (dispatch) => async () => {
    await removeItemFromStorage("access_token");
    dispatch({ type: types.SIGN_OUT });
};