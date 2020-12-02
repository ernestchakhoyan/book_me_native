import createDataContext from "./index";
import authReducer, { initialState } from "../reducers/authorization";
import {
    signin,
    signout,
} from "../actions/Authorization";

export const { Provider, Context } = createDataContext(
    authReducer,
    {
        signin,
        signout,
    },
    initialState
);