import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from "../LandingPage/Header";
import { courseListHandler, quizzeySetHandler } from "../../services/jsonService";
import { useEffect, useState } from "react";
import "./css/CoursePage.css";
import Badge from 'react-bootstrap/Badge';
// import Card from 'react-bootstrap/Card';
// import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import ReusableButton from "../common/reusableButton";
import ReusableCard from "../common/reusableCard";
import {handleUserIcon} from "../../utils/utils.js";


const MyCourse = () => {

    let { id } = useParams();
    const myCourses = courseListHandler();
    const [myCourse, setMyCourse] = useState({});
    const [quizzeySets, setQuizzeySets] = useState([]);
    const [ddValues, setDdValues] = useState([]);

    // TODO: CLEAN UP THE CODE HERE
    useEffect(() => {
        let course = {};
        //TODO: Make a way for quizzey sets to be stored remotely so I'm not making multiple local variables call from quizzeySetHandler();
        let sets = quizzeySetHandler();
        // when the id value from useParams() is available
        if (id) 
        {
            // find the course that belonggs the course id being passed in as path param
            course = myCourses.find((course) => course.courseId === +id);
            setMyCourse(course);//set the course to our local state var

            sets = sets.filter((element) => element.courseId === +id);
            setDdValues(sets);
            setQuizzeySets(sets);
        }
    }, [id])
    

    const handleDropdownSelect = (e) => {
        console.log("ID: ", e.target.value);
        // get setID from option value
        const setId = e.target.value;

        //get list of quizzey sets TODO: Make a way for quizzey sets to be stored remotely so I'm not making multiple local variables call from quizzeySetHandler();
        let sets = quizzeySetHandler();
        
        // if we reselect back on the placeholder option, this will show all sets fron our course
        if(+setId === 0) 
        {
            setQuizzeySets(sets.filter((element) => element.courseId === +id));
        } 
        else //we filter through the quizzey sets and update the screen with the set we selected in the dd.
        {
            //find the quizzey set
            setQuizzeySets( sets.filter((element, index) => element.setId === +setId));
        }
    }


    const handleSetLink = (id) => {
        return `/quizzey-set/${id}`;
    }


    return ( 
    <>
        <Header />
        <Container id="container">
            <Row>
                <p id="coursetitle">{myCourse.name}</p>       
                <h5>
                    <Badge bg="primary">
                    {myCourse.org}
                    </Badge>
                </h5>
                <hr />      
            </Row>
            <Row >
                <Col sm={{span: 6, offset: 0}} md={{span: 6, offset: 0}} lg={{span: 4, offset: 0}}>
                    <Form onChange={(e) => handleDropdownSelect(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label id="setstitle">All quizzey sets:</Form.Label>
                            <Form.Select>
                            <option value={0}></option>
                            {
                                ddValues.map((element, index) => {
                                    return(
                                        <option key={element.setId} value={element.setId}>{element.name}</option>
                                    )
                                })
                            }
                            </Form.Select>
                        </Form.Group>
                        <ReusableButton name="Clear"/>
                    </Form>
                </Col>
            </Row>
            <Row className="rowSpacing">
                {
                    quizzeySets.map((element, index) => {
                        return(
                            <Col xs={{span:10, offset:0}} sm={{span:6, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                                <ReusableCard title={element.name} badge={element.count.toString() + " Questions"} text={element.userName} image={handleUserIcon()} setLink={handleSetLink(element.setId)}/> 
                            </Col>                             
                        )
                    })
                }
            </Row>
        </Container>
    </>);
}
 
export default MyCourse;