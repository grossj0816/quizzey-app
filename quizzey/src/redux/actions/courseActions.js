import { GET_ALL_ACTIVE_COURSES } from "./types";



export const getAllActiveCourses = (courses) => dispatch => {
    console.log("FETCH ALL ACTIVE COURSES....");
    console.log(courses);
    dispatch({
        type: GET_ALL_ACTIVE_COURSES,
        payload: courses
    });
}