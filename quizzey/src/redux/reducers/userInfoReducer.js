import { GET_USER_INFO } from "../actions/types";

const initialState = {
    getUserInfo: {}
};


export default function(state = initialState, action){
    switch (action.type) {
        case GET_USER_INFO:
            return{
                ...state,
                getUserInfo: action.payload
            }
        default:
            return state;
    }
}