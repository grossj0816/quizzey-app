import Header from "../LandingPage/Header";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./css/Dashboard.css"
import React, { useState } from 'react';
import { courseListHandler, quizzeySetHandler } from "../../services/jsonService";
import ReusableCard from "../common/reusableCard";
import { handleUserIcon} from "../../utils/utils.js";
import ReusableModal from "../common/reusableModal";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from "react-redux";
import { getAllActiveCourses } from "../../redux/actions/courseActions";


const Dashboard = () => {

    const variant = "Success";
    let recentSets = localStorage.getItem('recent_opened_sets') ? JSON.parse(localStorage.getItem('recent_opened_sets')) : [];
    const [show, setShow] = useState(false); //show state for "Add Course Form" modal
    const [showB, setShowB] = useState(false); //show state for success toast
    const [showC, setShowC] = useState(false); //show state for "Courses list" modal
    const [name, setName] = useState("");
    const [org, setOrg] = useState("");
    const [textBook, setTextBook] = useState("");
    const [courses, setCourses] = useState([]);
    const [userName, setUserName] = useState("");
    const [courseSave, setCourseSave] = useState(false);
    var today = new Date();
    var currentHour = today.getHours();
    const userInfo = useSelector(state => state.userInfo.getUserInfo);
    const dispatch = useDispatch();


    //As soon as we have the user metadata stored in redux...
    useEffect(() => {
        // store value in local state in Dashboard component for saving new courses.
        if (userInfo.user_metadata) {
            console.log('user info:', userInfo);
            setUserName(userInfo.user_metadata.nickname);
        }
    });

    //On initial render of dasboard component call courses 'GET' endpoint.
    useEffect(() => {
        fetch(`${process.env.REACT_APP_QUIZZEY_API_ENDPOINT}/courses`,
        {
            method: 'GET'
        })
        .then(response => response.json())
        .then(courses => {
            setCourses(courses);
        })
    }, []);

    //On saving a new course call courses 'GET' endpoint to get refresh list of active courses.
    useEffect(() => {
            if (courseSave === true) 
            {
                fetch(`${process.env.REACT_APP_QUIZZEY_API_ENDPOINT}/courses`,
                {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(courses => {
                    setCourses(courses);
                })   
            }
    }, [courseSave]);

    const handleOpenCourseLink = (id) => {
        return `/courses/${id}`;
    }


    const handleSetLink = (id) => {
        return `/quizzey-set/${id}`;
    }

    // Show/hide course form event handlers -------------------------------- 
    const showAddCourseForm = () => {
        setShow(true);
    }

    const hideAddCourseForm = () => {
        setShow(false);
    }

    // Show/hide course list event handlers ---------------------------------
    const showCourseList = () => {
        setShowC(true);
    }

    const hideCourseList = () => {
        setShowC(false);
    }



    const handleCourseSave = (e) => {
        // e.preventDefault();
        // console.log(name);
        // console.log(org);
        // console.log(textBook);
        // console.log(userName);
        
        let newCourse = {courseName: name, organization: org, textbook: textBook, active: true, createdBy: userName};

        // console.log(JSON.stringify(newCourse));

        fetch(`${process.env.REACT_APP_QUIZZEY_API_ENDPOINT}/courses`,
        {
            method: 'POST',
            body: JSON.stringify(newCourse)
        })
        .catch(err => console.error(err));

        hideAddCourseForm();
        setShowB(true);
        setCourseSave(true);        
    }
    
    //Rendering add new course modal
    const renderAddCourseForm = () => {
        return(
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Course Name:</Form.Label>
                        <Form.Control placeholder="Course Name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Organization:</Form.Label>
                        <Form.Control placeholder="Organization" onChange={(e) => setOrg(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Textbook:</Form.Label>
                        <Form.Control placeholder="Textbook"  onChange={(e) => setTextBook(e.target.value)}/>
                    </Form.Group>
                    <Button type="submit" onClick={(e) => handleCourseSave(e)}>Submit</Button>
            </Form>
        );
    }

    // render course list modal
    const renderCourseList = () => {
        return(
            <ListGroup as="ol" numbered>
                {
                    courses.map((element, index) => {
                            return(
                                    <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto listGroupText">
                                        <div className="fw-bold">{element.courseName} </div>
                                        {element.organization}
                                        </div>
                                            &nbsp;&nbsp;
                                            <Button variant="link">                   
                                             <Link to={handleOpenCourseLink(element.courseId)} className="boldLink">View</Link>
                                            </Button>
                                    </ListGroup.Item>    
                            );
                    })
                }
            </ListGroup>
        );
    }






    return ( 
        <>
            <Header />
            <Container id="container">
                <Toast
                className="d-inline-block m-1"
                bg={variant.toLowerCase()}
                show={showB}
                delay={2000}
                autohide
                onClose={() => setShowB(false)}
                >
                    <Toast.Header>
                        <strong className="me-auto">Quizzey Notification</strong>
                    </Toast.Header>
                    <Toast.Body className={variant === 'Success' && 'text-white'}>
                            You have successfully added a course!
                    </Toast.Body>
                </Toast>
                <Row>
                    {
                        currentHour < 12 ? <h2><i>Good Morning {userName}! Lets Study!</i></h2> : currentHour < 18 ? <h2><i>Good Afternoon {userName}! You got this!</i></h2> : <h2><i>Good Evening {userName}! Finish strong!</i></h2>
                    }
                </Row>
                <br/>
                {/* <Row>                  
                    <p id="coursesTitle">Your courses:</p>
                </Row> */}
                <Row>
                    <Dropdown>
                            <Dropdown.Toggle className="screenOptions">
                                Screen Options:
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={showCourseList}>Show All Courses</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={showAddCourseForm}>Add New Course</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    <ReusableModal show={show} 
                                   hide={hideAddCourseForm} 
                                   title={"Add New Course:"}
                                   body={renderAddCourseForm}/>
                                   
                    <ReusableModal show={showC} 
                                   hide={hideCourseList} 
                                   title={"Course List:"}
                                   body={renderCourseList}/>                    
                </Row>
                <hr />
                <Row className="rowSpacing">
                <p id="coursesTitle">Your courses:</p>
                    {
                     courses.map((element, index) => {
                        if(index < 2)
                        {
                            return(
                                <Col  key={element.courseId} xs={{span:10, offset:0}} sm={{span:6, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                                    <ReusableCard title={element.courseName} 
                                                  subtitle={element.organization} 
                                                  text={element.textbook} 
                                                  courseLink={handleOpenCourseLink(element.courseId)}/> 
                                </Col> 
                            );
                        }

                        return(<></>);
                    })
                    }
                </Row>
                <Row className="rowSpacing">
                    <p id="coursesTitle">Recently opened:</p>
                </Row>
                <Row>
                    {
                    recentSets.map((element, index) => {
                        if (index < 10) {
                            return(
                                <Col key={element.setId} xs={{span:10, offset:0}} sm={{span:6, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                                    <ReusableCard title={element.setName} 
                                                  text={element.createdBy} image={handleUserIcon()} 
                                                  setLink={handleSetLink(element.setId)}/> 
                                </Col> 
                            )  
                        } 
                    })
                    }
                </Row>
            </Container>
        </> 
    );
}
 
export default Dashboard;