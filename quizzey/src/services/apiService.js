var endpoint_url = process.env.REACT_APP_QUIZZEY_API_ENDPOINT;



// Courses API invoker functions
export const getAllActiveCourses = () => {
    console.log('GET ALL ACTIVE COURSES....');
    fetch(`${endpoint_url}/courses`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
    })
    .then(res => res.json())
    .then(courses => console.log(courses));
    return null;
}

export const getCourseDetail = () => {
    console.log('GET ALL COURSES....');
    return null;
}

export const createNewCourse = () => {
    console.log('GET ALL COURSES....');
    return null;
}

export const updateExistingCourse = () => {
    console.log('GET ALL COURSES....');
    return null;
}