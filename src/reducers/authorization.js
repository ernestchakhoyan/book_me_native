import * as types from "../constants/actionTypes";

export const initialState = {
    token: null,
    authorizationLoading: true
};

const authReducer = (state, action) => {
    switch (action.type) {
        case types.SIGN_IN:
            return {
                ...state,
                token: action.token,
                authorizationLoading: false
            };
        case types.SIGN_OUT:
            return {
                ...state,
                token: null,
                authorizationLoading: false
            };
        default:
            return state;
    }
};

export default authReducer;