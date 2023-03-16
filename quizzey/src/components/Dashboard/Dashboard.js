import Header from "../LandingPage/Header";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./css/Dashboard.css"
import ReusableButton from "../common/reusableButton";
import React from 'react';
import { courseListHandler, quizzeySetHandler } from "../../services/jsonService";
import ReusableCard from "../common/reusableCard";
import {handleUserIcon} from "../../utils/utils.js";

const Dashboard = () => {

    const myCourses = courseListHandler();
    const recentSets = quizzeySetHandler();

    const count = myCourses.length;

    
    const handleCourseLink = (id) => {
        return `/courses/${id}`;
    }



    const handleSetLink = (id) => {
        return `/quizzey-set/${id}`;
    }


    return ( 
        <>
            <Header />
            <Container id="container">
                <Row>
                    <p id="coursesTitle">Your courses:</p>
                </Row>
                <Row>
                    <Col sm={{span:6, offset:0}} md={{span:3, offset:0}} lg={{span:1, offset:0}}>
                        <p id="item">Courses listed: {count}</p>
                    </Col>
                    <Col sm={{span:6, offset:0}} md={{span:3, offset:0}} lg={{span:1, offset:0}}>
                        <ReusableButton name="Add Courses" />
                    </Col>
                </Row>
                <hr />
                <Row className="rowSpacing">
                    {
                    myCourses.map((element, index) => {
                        if(index < 2)
                        {
                            return(
                                <Col key={element.courseId} xs={{span:10, offset:0}} sm={{span:6, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                                    <ReusableCard title={element.name} subtitle={element.org} text={element.textbook} courseLink={handleCourseLink(element.courseId)}/> 
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
                                <ReusableCard title={element.name} badge={element.count.toString() + " Questions"} text={element.userName} image={handleUserIcon()} setLink={handleSetLink(element.setId)}/> 
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