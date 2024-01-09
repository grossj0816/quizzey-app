import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from "../LandingPage/Header";
import ReusableButton from "../common/reusableButton";
import ReusableModal from "../common/reusableModal";
import { courseListHandler, quizzeySetHandler } from "../../services/jsonService";
import { useEffect, useState } from "react";
import "./css/CoursePage.css";
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import ReusableCard from "../common/reusableCard";
import {handleUserIcon} from "../../utils/utils.js";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';


const MyCourse = () => {

    let { id } = useParams(); //courseId
    const myCourses = courseListHandler(); //THIS VARIABLE WOULD BE GETTING STATE FROM REDUX
    const [myCourse, setMyCourse] = useState({});
    const [quizzeySets, setQuizzeySets] = useState([]);
    const [ddValues, setDdValues] = useState([]);
    const [name, setName] = useState("");
    const [org, setOrg] = useState("");
    const [textbook, setTextBook] = useState("");
    const [active, setActive] = useState(false);
    const [updateScreen, setUpdateScreen] = useState(false); // this is used to toggle the update course modal
    const [addScreen, setAddScreen] = useState(false); //this is used to toggle the add new set modal

    // TODO: CLEAN UP THE CODE HERE
    useEffect(() => {
        let course = {};
        let sets = quizzeySetHandler();
        // when the id value from useParams() is available
        if (id) 
        {
            // find the course that belonggs the course id being passed in as path param
            course = myCourses.find((course) => course.courseId === +id);
            setMyCourse(course);//set the course to our local state variable

            // Individual course information put into local state.
            setName(course.name);
            setOrg(course.org);
            setTextBook(course.textbook);
            setActive(course.active);

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



    // -------------TOGGLE FOR SHOWING/HIDING COURSE UPDATE FORM --------------
    const showCourseUpdateForm = () => {
        setUpdateScreen(true);
    } 


    const hideCourseUpdateForm = () => {
        setUpdateScreen(false);
    } 


    // -------------TOGGLE FOR SHOWING/HIDING ADD SET FORM --------------
    const showAddSetForm = () => {
        setAddScreen(true);
    }


    const hideAddSetForm = () => {
        setAddScreen(false);
    }

    //Rendering add new course modal
    const renderUpdateCourseForm = () => {
        return(
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Course Name:</Form.Label>
                        <Form.Control placeholder="Course Name" 
                                      onChange={(e) => setName(e.target.value)}
                                      value={name} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Organization:</Form.Label>
                        <Form.Control placeholder="Organization" 
                                      onChange={(e) => setOrg(e.target.value)} 
                                      value={org} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Textbook:</Form.Label>
                        <Form.Control placeholder="Textbook"  
                                      onChange={(e) => setTextBook(e.target.value)}
                                      value={textbook}/>
                    </Form.Group>
                    <Form.Check
                        type="switch"
                        label="Active Course?"
                        defaultChecked={active}
                    />
                    {/* <Button type="submit" onClick={(e) => handleCourseSave(e)}>Submit</Button> */}
            </Form>
        );
    }

    const renderAddSetForm = () => {
        return(
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Set Name:</Form.Label>
                    <Form.Control placeholder="Set Name:"/>
                </Form.Group>
                {/* <Button type="submit" onClick={(e) => handleCourseSave(e)}>Submit</Button> */}
            </Form>
        );
    }

    return ( 
    <>
        <Header />
        <Container id="container">
            <Row>
                <p id="coursetitle">{myCourse.name}</p>       
                <h5>
                    <Badge bg="secondary" pill>
                    {myCourse.org}
                    </Badge>
                </h5>
            </Row>
            <Row>
                <Link style={{margin: '5px'}} to={origin === "http://localhost:3000" ? '/' : '/index.html'} className="boldLink" id="navigateLink">View Dashboard</Link>
            </Row>
            <Row>
                <Dropdown>
                    <Dropdown.Toggle className="screenOptions">
                        Screen Options:
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={showCourseUpdateForm}>Update Course</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={showAddSetForm}>Add New Set</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <ReusableModal show={updateScreen}
                               hide={hideCourseUpdateForm}
                               title={"Update Existing Course:"}
                               body={renderUpdateCourseForm}/>                    
                <ReusableModal show={addScreen}
                               hide={hideAddSetForm}
                               title={"Add New Set:"}
                               body={renderAddSetForm}/>

            </Row>            
            <hr />      
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
                        {/* <ReusableButton name="Clear" event={}/> */}
                    </Form>
                </Col>
            </Row>
            <Row className="rowSpacing">
                {
                    quizzeySets.map((element, index) => {
                        return(
                            <Col xs={{span:10, offset:0}} sm={{span:6, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                                <ReusableCard title={element.name} text={element.userName} image={handleUserIcon()} setLink={handleSetLink(element.setId)}/> 
                            </Col>                             
                        )
                    })
                }
            </Row>
        </Container>
    </>);
}
 
export default MyCourse;