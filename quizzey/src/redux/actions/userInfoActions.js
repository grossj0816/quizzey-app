import { GET_USER_INFO } from "./types";



export const getUserInformation = (token) => dispatch => {
    console.log("FETCH CURRENT USER'S INFORMATION...");
    fetch(process.env.REACT_APP_AUTH0_USER_ENDPOINT, 
    {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }   
    })
    .then(res => res.json())
    .then(userInfoObj => {
        dispatch({
            type: GET_USER_INFO,
            payload: userInfoObj
        });
    });
}