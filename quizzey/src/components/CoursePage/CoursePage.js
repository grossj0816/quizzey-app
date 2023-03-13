import { useParams } from "react-router-dom";



const MyCourse = () => {
    let { id } = useParams();
    return ( <h1>Course id:  {id}</h1> );
}
 
export default MyCourse;