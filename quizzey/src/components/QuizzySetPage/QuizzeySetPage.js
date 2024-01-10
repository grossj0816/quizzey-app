import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useParams } from "react-router-dom";
import { listQuestionsHandler, quizzeySetHandler } from "../../services/jsonService";
import ReusableButton from "../common/reusableButton";
import ReusableModal from './../common/reusableModal';
import Header from "../LandingPage/Header";
import Card from 'react-bootstrap/Card';
import "./css/QuizzeySetPage.css";
import { adjustFlashCardMargins, adjustFlashCardWidth, adjustTextSize } from "../../utils/utils";
import ReactCardFlip from 'react-card-flip';
import { Link } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import React from "react";
// import { Scrollbars } from 'react-custom-scrollbars';



const QuizzeySet = () => {
    let { id } = useParams(); //setID
    const origin = window.location.origin;
    const variant = "Light";
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [quizzeySet, setQuizzeySet] = useState({});
    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(1); //the number count of what question we are currently on.
    const [total, setTotal] = useState();
    const [flipped, setFlipped] = useState(false);
    const [progress, setProgress] = useState(0);
    const [addScreen, setAddScreen] = useState(false); //this is used to toggle the add questions modal
    // const [updateScreen, setUpdateScreen] = useState(false); //this is used to toggle the update questions modal.
    const [inputFields, setInputFields] = useState([{question: '', answer: ''}]);



    useEffect(() => {
        const handleWindowResize = () => {
            setInnerWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);

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

        // TODO: Set up this in the dashboard at some point.
        handleRecentSets(set);
        //get total number of questions-----------------------------------------------------
        setTotal(questions.length);

        // //set the initial progress bar value------------------------------------------------
        // let initialProgress = (count / total) * 100;
        // console.log("Progress", initialProgress);
        // setProgress(Math.round(initialProgress));

      }
    },[id])


    //trigger for updating the progress bar on 
    useEffect(() => {
        if (count !== total) 
        {
            let progress = (count / total) * 100;
            console.log(progress);
            setProgress(Math.round(progress));
        } 
        else 
        {
            console.log(100);
            setProgress(100);
        }
    }, [count, total])
    

    
    
//----------------Functions for changing flashcards (START)-------------------------
    const handleCountIncrement = () => {
        //set the count state to the initial count plus 1
        setCount(count => count + 1);
        //when we go to the next card, set the state 
        //of the card being flipped to false so we see the next question.
        setFlipped(false);

    //     if (count !== total) 
    //     {
    //         let incrementProgress = (count / total) * 100;
    //         console.log(incrementProgress);
    //         // setProgress(100);
    //     } 
    //     else 
    //     {
    //         // setProgress(Math.round(incrementProgress));
    //     }
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
        let initialProgress = (count / total) * 100;


        setCount(1);
        setFlipped(false);
        setProgress(Math.round(initialProgress));
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


    const handleRecentSets = (set) =>  {
        let openedSetList = [];
        // let setObj = JSON.parse(set); TODO: use this for when I am using JSON data from api.
        let setObj = set;

        // if we have nothing in 'recent_opened_sets'
        if (localStorage.getItem('recent_opened_sets').length === 0) {
            console.log('We have nothing in session...');
            
            // add the set obj to the list
            openedSetList.unshift(setObj);

            // set session
            localStorage.setItem('recent_opened_sets', JSON.stringify(openedSetList));
        }
        else //TODO: Work on this next...
        {
            console.log('We have recent sets in session...')
            //store the current list in local storage to openedSetList.
            openedSetList = JSON.parse(localStorage.getItem('recent_opened_sets'));

            let isDupSet = openedSetList.filter((obj) => obj.setId === setObj.setId).length > 0 ? true : false;

            console.log('Duplicate set: ', isDupSet);

            if (!isDupSet) {
                console.log('opened set list: ', openedSetList.length)
                if (openedSetList.length === 10) {  
                    console.log('I need to remove something....')              
                    //move the recent set up to the top of the list.
                    openedSetList.unshift(setObj);

                    //remove the last set in the list.
                    openedSetList.pop();

                    // update session
                    localStorage.setItem('recent_opened_sets', JSON.stringify(openedSetList))
                }
                else
                {
                    //move the recent set up to the top of the list.
                    openedSetList.unshift(setObj);

                    // update session
                    localStorage.setItem('recent_opened_sets', JSON.stringify(openedSetList))
                }
            }
        }
    }

    const addFields = () => {
        let newField = {question: '', answer: ''};
        setInputFields([...inputFields, newField]);
    }


    // -------------TOGGLE FOR SHOWING/HIDING ADD QUESTIONS FORM -------------- 
    const showAddQuestionsForm = () => {
        setAddScreen(true);
    }

    const hideAddQuestionsForm = () => {
        let resetField = {question: '', answer: ''};
        setAddScreen(false);
        setInputFields([resetField]);
    }

    const renderAddQuestionsForm = () => {
        return(
            <React.Fragment>
                <ReusableButton name="Add Row"
                                type="button" 
                                variant="primary"
                                event={addFields}/>
                <br />
                <br />
                <Row>
                    {
                        inputFields.map((element, index) => {
                            return(
                                <React.Fragment key={index}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Question:</Form.Label>
                                            <Form.Control placeholder="Question:"
                                                        value={element.question} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Answer:</Form.Label>
                                            <Form.Control placeholder="Answer:"
                                                        value={element.answer} />
                                        </Form.Group>
                                        <hr className="hr-margin"/>
                                    </Form>
                                </React.Fragment>
                            );
                        })
                    }
                </Row>
            </React.Fragment>
        );
    }


    // -------------TOGGLE FOR SHOWING/HIDING ADD QUESTIONS FORM -------------- 
    // const showUpdateQuestionsForm = () => {
    //     setUpdateScreen(true);
    // }

    // const hideUpdateQuestionsForm = () => {
    //     setUpdateScreen(false);
    // }





    return ( 
    <>
        <Header />
        <Container id="container">
            <Row>
                <Col sm={{span:6, offset:0}} md={{span:3, offset:0}} lg={{span:3, offset:0}}>
                    <h4>{quizzeySet.name}</h4>
                </Col>
            </Row>
            <Row>
                {/* TODO: Put styling in css file */}
                <div style={{display:'inline-block'}}>
                    <Link style={{margin: '5px'}} to={origin === "http://localhost:3000" ? '/' : '/index.html'} className="boldLink" id="navigateLink">View Dashboard</Link>
                </div>
            </Row>
            <br />
            <Row>
                <Dropdown>
                    <Dropdown.Toggle>
                        Screen Options:
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleStartCountOver}>Start Over</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={showAddQuestionsForm}>Add Questions</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item disabled={total === 0 ? true : false}>Update Questions</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <ReusableModal show={addScreen}
                               hide={hideAddQuestionsForm}
                               title={"Add New Questions:"}
                               body={renderAddQuestionsForm} 
                               fullScreen={true} />
            </Row>
            <hr />
            <ProgressBar style={{marginTop: '4vh', marginBottom: '3vh'}} 
                         animated={count === total ? false : true} 
                         now={progress} 
                         variant={count === total ? 'success' : 'primary'} 
                         striped={count === total ? false : true}/>
            <Row id="cardRow">
                {
                    questions.map((element, index) => {
                         
                        if ((index + 1) === count) {
                            return(
                                <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
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