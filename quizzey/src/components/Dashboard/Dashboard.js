import Header from "../LandingPage/Header";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./css/Dashboard.css"
import ReusableButton from "../common/reusableButton";
import React from 'react';
import { courseListHandler, quizzeySetHandler } from "../../services/jsonService";
import ReusableCard from "../common/reusableCard";


const Dashboard = (props) => {

    const myCourses = courseListHandler();
    const recentSets = quizzeySetHandler();

    const count = myCourses.length;
    const {origin} = props;

    const handleUserIcon = () => {
        return(
            <img
            src="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=Felix&flip=true&rotate=0&size=30&eyes=roundFrame02,robocop,eva"
            style={{borderRadius: "50%"}}
            alt="avatar"
            />
        );
    }

    const handleCourseLink = (id) => {
        switch (origin) {
            case "http://localhost:3000":
                return `/courses/${id}`;
        
            default:
                return `/index.html/courses/:${id}`;
        }
    }

    const handleSetLink = (id) => {
        switch (origin) {
            case "http://localhost:3000":
                return `/quizzey-set/${id}`;
        
            default:
                return `/index.html/quizzey-set/${id}`;
        }
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
                                <Col xs={{span:10, offset:0}} sm={{span:6, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                                    <ReusableCard title={element.name} subtitle={element.org} text={element.textbook} courseLink={handleCourseLink(element.courseId)}/> 
                                </Col> 
                            );
                        }
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
                            <Col xs={{span:10, offset:0}} sm={{span:6, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
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