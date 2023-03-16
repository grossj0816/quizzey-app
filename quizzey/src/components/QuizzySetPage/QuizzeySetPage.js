import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useParams } from "react-router-dom";
import { listQuestionsHandler, quizzeySetHandler } from "../../services/jsonService";
import ReusableButton from "../common/reusableButton";
import ReusableCard from "../common/reusableCard";
import Header from "../LandingPage/Header";
import Card from 'react-bootstrap/Card';
import "./css/QuizzeySetPage.css";

const QuizzeySet = () => {
    let { id } = useParams();
    const [quizzeySet, setQuizzeySet] = useState({});
    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(1); //the number count of what question we are currently on.
    const [total, setTotal] = useState();
;
    useEffect(() => {
      let questions = [];
      let set = {};
      if (id) 
      {
        //get all questions-----------------------------------------------------------------
        const questionList = listQuestionsHandler();
        //filter through questions and get the q's under this quizzey set
        questions = questionList.filter((element) => element.setId === +id);
        //loop through questions and add a question number
        questions.forEach((element, index) => {
            element.questionNumber = index + 1;
        });
        console.log("Qs w/ count: ", questions);
        setQuestions(questions);

        //get all sets----------------------------------------------------------------------
        const sets =  quizzeySetHandler();
        //find the set with the same setID that we are getting from the url path param
        set = sets.find((set) => set.setId === +id);
        setQuizzeySet(set);

        //get total number of questions-----------------------------------------------------
        setTotal(questions.length);
      }
    },[id])
    

    const handleCountIncrement = () => {
        setCount(count => count + 1);
    }

    const handleCountDecrement = () => {
        setCount(count => count - 1);
    }

    const handleDisableOnIncrement = (count) => {
        if (count === total) 
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    const handleDisableOnDecrement = (count) => {
        if (count === 1) {
            return true;
        }
        else
        {
            return false;
        }
    }

    return ( 
    <>
        <Header />
        <Container id="container">
            <Row>
                <h3>{quizzeySet.name}</h3>
            </Row>
            <hr />
            <Row className="rowSpacing" id="cardRow">
                <Card id="cardMargin" style={{ width: '81rem', height: '50vh' }}>
                <Card.Body>
                    <Card.Text id="scardText">
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                </Card.Body>
                </Card>
            </Row>
            <Row className="rowSpacing justify-content-md-center">
                    <Col xs={{span:8, offset:3}} sm={{span:6, offset:0}} md={{span:6, offset:3}} lg={{span:4, offset:2}}>
                        <ReusableButton name="<" size="lg" event={handleCountDecrement} disable={handleDisableOnDecrement(count)}/>
                        <span id="buttonSpacing">{count}/{total}</span>
                        <ReusableButton name=">" size="lg" event={handleCountIncrement} disable={handleDisableOnIncrement(count)}/>
                    </Col>
            </Row>
        </Container>
    </> 
    );
}
 
export default QuizzeySet;