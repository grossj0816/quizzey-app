import Header from "../LandingPage/Header";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./css/Dashboard.css"
import ReusableButton from "../common/reusableButton";
import React from 'react';
import { courseListHandler, quizzeySetHandler } from "../../services/jsonService";
import ReusableCard from "../common/reusableCard";


const Dashboard = () => {

    const myCourses = courseListHandler();
    const recentSets = quizzeySetHandler();

    const count = myCourses.length;


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
                                    <ReusableCard title={element.name} subtitle={element.org} text={element.textbook} /> 
                                </Col> 
                            )
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
                                <ReusableCard title={element.name} subtitle={element.count.toString()} text={element.userName} /> 
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