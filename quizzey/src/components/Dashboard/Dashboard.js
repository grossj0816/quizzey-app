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


const Dashboard = () => {

    const variant = "Success";
    const myCourses = courseListHandler();
    const recentSets = quizzeySetHandler();
    const count = myCourses.length;
    const [show, setShow] = useState(false);
    const [showB, setShowB] = useState(false);
    const [name, setName] = useState("");
    const [org, setOrg] = useState("");
    const [textBook, setTextBook] = useState("");
    
    
    const handleCourseLink = (id) => {
        return `/courses/${id}`;
    }


    const handleSetLink = (id) => {
        return `/quizzey-set/${id}`;
    }


    const showModal = () => {
        setShow(true);
    }

    const hideModal = () => {
        setShow(false);
    }


    const handleCourseSave = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(org);
        console.log(textBook);
        
        hideModal();
        setShowB(true);
        
    }


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
        )
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
                    <Col sm={{span:6, offset:0}} md={{span:3, offset:0}} lg={{span:1, offset:0}}>
                        <ReusableButton name="Add Course"  event={showModal} />
                    </Col>
                    <ReusableModal show={show} 
                                   hide={hideModal} 
                                   title={"Add New Course:"}
                                   body={renderAddCourseForm}/>
                </Row>
                <hr />
                <Row className="rowSpacing">
                    {
                    myCourses.map((element, index) => {
                        if(index < 2)
                        {
                            return(
                                <Col  key={element.courseId} xs={{span:10, offset:0}} sm={{span:6, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                                    <ReusableCard title={element.name} 
                                                  subtitle={element.org} 
                                                  text={element.textbook} 
                                                  courseLink={handleCourseLink(element.courseId)} /> 
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