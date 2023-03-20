import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useParams } from "react-router-dom";
import { listQuestionsHandler, quizzeySetHandler } from "../../services/jsonService";
import ReusableButton from "../common/reusableButton";
import Header from "../LandingPage/Header";
import Card from 'react-bootstrap/Card';
import "./css/QuizzeySetPage.css";
import { adjustFlashCardMargins, adjustFlashCardWidth, adjustTextSize } from "../../utils/utils";
import ReactCardFlip from 'react-card-flip';
import { Link } from "react-router-dom";





const QuizzeySet = () => {
    let { id } = useParams();
    const origin = window.location.origin;
    const variant = "Light";
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [quizzeySet, setQuizzeySet] = useState({});
    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(1); //the number count of what question we are currently on.
    const [total, setTotal] = useState();
    const [flipped, setFlipped] = useState(false);


    useEffect(() => {
        const handleWindowResize = () => {
            setInnerWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);
        console.log(innerWidth);

        return() => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });



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

    
    
//----------------Functions for changing flashcards (START)-------------------------
    const handleCountIncrement = () => {
        //set the count state to the initial count plus 1
        setCount(count => count + 1);
        //when we go to the next card, set the state 
        //of the card being flipped to false so we see the next question.
        setFlipped(false);
    }

    const handleCountDecrement = () => {
        setCount(count => count - 1);
        setFlipped(false);
    }
//----------------Functions for changing flashcards (END)-------------------------



//----------------Functions for disabling counter buttons (START)-----------------
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
//----------------Functions for disabling counter buttons (START)-----------------

    //On button click we restart the flashcards by going back to the first one.
    const handleStartCountOver = () => {
        setCount(1);
        setFlipped(false);
    }


    const handleCardFlip = () => {
        if (flipped === true) 
        {
            setFlipped(false);
        } 
        else
        {
            setFlipped(true);
        }
    }


    return ( 
    <>
        <Header />
        <Container id="container">
            <Row>
                <Col sm={{span:6, offset:0}} md={{span:3, offset:0}} lg={{span:3, offset:0}}>
                    <h4>{quizzeySet.name}</h4>
                </Col>
                <Col sm={{span:6, offset:0}} md={{span:3, offset:0}} lg={{span:4, offset:0}}>
                    <ReusableButton name="Start Over" event={handleStartCountOver}/>
                </Col>
                <Col sm={{span:6, offset:0}} md={{span:3, offset:0}} lg={{span:2, offset:0}}>
                    <Link to={`/courses/${id}`} className="boldLink" id="navigateLink">View Course</Link>
                </Col>
                <Col sm={{span:6, offset:0}} md={{span:3, offset:0}} lg={{span:2, offset:0}}>
                    <Link to={origin === "http://localhost:3000" ? '/' : '/index.html'} className="boldLink" id="navigateLink">View Dashboard</Link>
                </Col>
            </Row>
            <hr />
            <Row className="rowSpacing" id="cardRow">
                {
                    questions.map((element, index) => {
                         
                        if ((index + 1) === count) {
                            return(
                                <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
                                    {/* FRONT SIDE */}
                                    <Card 
                                        className="flashcard" 
                                        style={{ width: adjustFlashCardWidth(innerWidth), height: '50vh', marginLeft: adjustFlashCardMargins(innerWidth) }}
                                        bg={variant.toLowerCase()}
                                        key={variant}
                                        text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                                        onClick={handleCardFlip}
                                    >
                                    <Card.Body>
                                        <Card.Text className="flashcardText" style={{fontSize: adjustTextSize(innerWidth)}}>
                                            {element.question}
                                        </Card.Text>
                                    </Card.Body>
                                    </Card>



                                    {/* BACK SIDE */}
                                    <Card 
                                    className="flashcard" 
                                    style={{ width: adjustFlashCardWidth(innerWidth), height: '50vh', marginLeft: adjustFlashCardMargins(innerWidth) }}
                                    bg={variant.toLowerCase()}
                                    key={variant}
                                    text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                                    onClick={handleCardFlip}
                                    >
                                    <Card.Body>
                                        <Card.Text className="flashcardText" style={{fontSize: adjustTextSize(innerWidth)}}>
                                        {element.answer}
                                        </Card.Text>
                                    </Card.Body>
                                    </Card>
                                </ReactCardFlip>
                            );
                        }
                        return(<></>);
                    })
                }
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