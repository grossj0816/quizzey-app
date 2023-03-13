import { useParams } from "react-router-dom";



const QuizzeySet = () => {
    let { id } = useParams();
    return ( <h1>Set id:  {id}</h1> );
}
 
export default QuizzeySet;