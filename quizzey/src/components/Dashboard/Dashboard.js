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


const Dashboard = () => {

    const variant = "Success";
    let myCourses = courseListHandler();
    let recentSets = localStorage.getItem('recent_opened_sets') ? JSON.parse(localStorage.getItem('recent_opened_sets')) : [];
    const [show, setShow] = useState(false); //show state for "Add Course Form" modal
    const [showB, setShowB] = useState(false); //show state for success toast
    const [showC, setShowC] = useState(false); //show state for "Courses list" modal
    const [name, setName] = useState("");
    const [org, setOrg] = useState("");
    const [textBook, setTextBook] = useState("");
    const [courses, setCourses] = useState(myCourses);
    const [userName, setUserName] = useState("");
    const count = courses.length;
    var today = new Date();
    var currentHour = today.getHours();
    const userInfo = useSelector(state => state.userInfo.getUserInfo);

    useEffect(() => {
        if (userInfo.user_metadata) {
            console.log('user info:', userInfo);
            setUserName(userInfo.user_metadata.nickname);
        }
    }, [userInfo])

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
        e.preventDefault();
        console.log(name);
        console.log(org);
        console.log(textBook);
        
        hideAddCourseForm();
        setShowB(true);
        
        // TODO: ADD MORE HERE WHEN WE DO SAVE COURSES 
    }

    const handleCourseDelete = (e, courseId) => {
        
        //run the delete process
        let filterResults = courses.filter((element) => element.courseId !== courseId);
        setCourses(filterResults);

        //TODO: ADD MORE HERE FOR SOFT DELETING COURSE
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
                                        <div className="fw-bold">{element.name} </div>
                                        {element.org}
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
                <Row>                  
                    <p id="coursesTitle">Your courses:</p>
                </Row>
                <Row>
                    <Col sm={{span:6, offset:0}} md={{span:3, offset:0}} lg={{span:1, offset:0}}>
                        <p id="item">Courses listed: {count}</p>
                    </Col>
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
                    {
                     courses.map((element, index) => {
                        if(index < 2)
                        {
                            return(
                                <Col  key={element.courseId} xs={{span:10, offset:0}} sm={{span:6, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                                    <ReusableCard title={element.name} 
                                                  subtitle={element.org} 
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
                                    <ReusableCard title={element.name} 
                                                  text={element.userName} image={handleUserIcon()} 
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