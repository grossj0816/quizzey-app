import Header from "../LandingPage/Header";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./css/Dashboard.css"
import ReusableButton from "../common/reusableButton";
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
import Swal from 'sweetalert2';

const Dashboard = () => {

    const variant = "Success";
    let myCourses = courseListHandler();
    const recentSets = quizzeySetHandler();
    const [show, setShow] = useState(false); //show state for "Add Course Form" modal
    const [showB, setShowB] = useState(false); //show state for success toast
    const [showC, setShowC] = useState(false); //show state for "Courses list" modal
    const [name, setName] = useState("");
    const [org, setOrg] = useState("");
    const [textBook, setTextBook] = useState("");
    const [courses, setCourses] = useState(myCourses);
    const count = courses.length;

    

    
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
                        <Form.Select onChange={(e) => setOrg(e.target.value)}>
                        <option value={''}></option>
                        <option value={'SUNY Cobleskill'}>SUNY Cobleskill</option>
                        </Form.Select>
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
                                            <Button variant="link">                   
                                             <Link to={handleOpenCourseLink(element.courseId)} className="boldLink">Update</Link>
                                            </Button>
                                            &nbsp;&nbsp;
                                            <Button variant="link">                   
                                             <Link to={handleOpenCourseLink(element.courseId)} className="boldLink">View</Link>
                                            </Button>
                                            &nbsp;&nbsp;
                                            <ReusableButton name="Delete" variant="danger" event={event => Swal.fire({
                                                title: 'Deleting Course',
                                                text:  'Are you sure you want to continue?',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                showConfirmButton: true,
                                                confirmButtonColor: 'red',
                                                confirmButtonText: 'OK',
                                                cancelButtonColor: 'blue',
                                                cancelButtonText: 'CANCEL'
                                            }).then((result) => {
                                                result.isConfirmed && handleCourseDelete(event, element.courseId);
                                            })
                                            
                                            }/>
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
                    <p id="coursesTitle">Your courses:</p>
                </Row>
                <Row>
                    <Col sm={{span:6, offset:0}} md={{span:3, offset:0}} lg={{span:1, offset:0}}>
                        <p id="item">Courses listed: {count}</p>
                    </Col>
                    <Col sm={{span:3, offset:0}} md={{span:3, offset:0}} lg={{span:1, offset:0}}>
                        <ReusableButton name="View All Courses" variant="secondary"  event={showCourseList} />
                    </Col>
                    <Col sm={{span:3, offset:0}} md={{span:3, offset:0}} lg={{span:1, offset:0}}>
                        <ReusableButton name="Add Course"  event={showAddCourseForm} />
                    </Col>
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
                    <p id="coursesTitle">Recently Opened:</p>
                </Row>
                <Row>
                    {
                    recentSets.map((element) => {
                        return(
                            <Col key={element.setId} xs={{span:10, offset:0}} sm={{span:6, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                                <ReusableCard title={element.name} 
                                              badge={element.count.toString() + " Questions"} 
                                              text={element.userName} image={handleUserIcon()} 
                                              setLink={handleSetLink(element.setId)}/> 
                            </Col> 
                        )    
                    })
                    }
                </Row>
            </Container>
        </> 
    );
}
 
export default Dashboard;