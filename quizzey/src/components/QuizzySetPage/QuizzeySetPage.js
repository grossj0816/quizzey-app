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
import Button from 'react-bootstrap/Button';
import React from "react";



const QuizzeySet = () => {
    let { id } = useParams(); //setID
    const origin = window.location.origin;
    const variant = "Light";
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [quizzeySet, setQuizzeySet] = useState({});
    const [name, setName] = useState("");
    const [active, setActive] =useState(false);
    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(1); //the number count of what question we are currently on
    const [total, setTotal] = useState();
    const [flipped, setFlipped] = useState(false);
    const [progress, setProgress] = useState(0);
    const [addScreen, setAddScreen] = useState(false); //this is used to toggle the add questions modal
    const [updateScreen, setUpdateScreen] = useState(false); //this is used to toggle the update questions modal
    const [indSetScreen, setIndSetScreen] = useState(false); //this is used to toggle the update set modal
    const [inputFields, setInputFields] = useState([{question: '', answer: ''}]);
    const [validated, setValidated] = useState(false); //state for validating add questions form submission
    const [validForUpdate, setValidForUpdate] = useState(false); //state for validating update/delete questions form submission
    const [isSetValid, setIsSetValid] = useState(false); //state for validating updating set data.
    const [deleteOperation, setDeleteOperation] = useState(false); //state of displaying hidden elements for marking question for deletion
    const [updateOperation, setUpdateOperation] = useState(false); //state of displaying hidden elements for allowing updating questions.



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
        setName(set.name);
        setActive(set.active);
        setQuizzeySet(set);

        // TODO: Set up this in the dashboard at some point.
        handleRecentSets(set);
        //get total number of questions-----------------------------------------------------
        setTotal(questions.length);
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

    const addField = () => {
        let newField = {question: '', answer: ''};
        setInputFields([...inputFields, newField]);
    }

    const removeField = () => {
        let data = [...inputFields];
        let newData = data.slice(0, -1);
        setInputFields(newData);
    }

    const handleAddFormChange = (event, index) => {
        let data = [...inputFields]; //storing input field state in "data" variable.
        data[index][event.target.name] = event.target.value; //set the correct value to the specific input by index and by name attribute.
        setInputFields(data); //set the state of the data in add questions screen to what we updated.
    }

    const handleUpdateFormChange = (event, index) => {
        let data = [...questions]; //storing input field state in "data" variable.
        data[index][event.target.name] = event.target.value; //set the correct value to the specific input by index and by name attribute.
        setQuestions(data); //set the state of the data in add questions screen to what we updated.
    }

    const handleDeleteSwitch = (event, index) => {
        let data = [...questions];
        // console.log("SWITCH CHANGE:", event.target.checked);
        data[index][event.target.name] = event.target.checked;
        setQuestions(data);
    }

    const handleSetActive = (event, index) => {
        let data = {...quizzeySet};
        console.log("SWITCH CHANGE:", event.target.checked);
        data[index][event.target.name] = event.target.checked;
        setQuizzeySet(data);
    }


    const handleAddFormSubmit = (event) => {

        const form = event.currentTarget;
        let isInvalid = undefined;
        console.log(form);
        if (form.checkValidity() === false)//if our form results are not valid 
        {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        //loop through current list of questions submitted by user.
        inputFields.forEach((item, index) => {
            //if we come across a question or answer that wasn't submitted...
            if (item.question === "" || item.answer === "") 
            {
                //we set the isInvalid flag to true.
                isInvalid = true;
                return;   
            }
            else
            {
                //if there are no errors, we set flag to false.
                isInvalid = false;
            }
        });

        // if all the records are valid...
        if (isInvalid !== true)
        {
            /*
            TODO: AT SOME POINT PUT SOMETHING HERE FOR PROCESSING
            SUBMITTING QUESTIONS TO THE DATABASE. 
            */
            event.preventDefault();
            console.log(inputFields);
            setValidated(false); //reset the validated state for the next form submit.
            hideAddQuestionsForm();//hide the modal and reset the form.
        }
    };

    const handleUpdateFormSubmit = (event, submitType) => {

        const form = event.currentTarget;
        let isInvalid = undefined;
        console.log(form);
        if (form.checkValidity() === false)//if our form results are not valid 
        {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidForUpdate(true);

        //loop through current list of questions submitted by user.
        questions.forEach((item, index) => {
            //if we come across a question or answer that wasn't submitted...
            if (item.question === "" || item.answer === "") 
            {
                //we set the isInvalid flag to true.
                isInvalid = true;
                return;   
            }
        });
        // if all the records are valid...
        if (isInvalid !== true)
        {
            /*
            TODO: AT SOME POINT PUT SOMETHING HERE FOR PROCESSING
            SUBMITTING QUESTIONS TO THE DATABASE. 
            */
           if (submitType === "UPDATE") {
                console.log("CALL UPDATE QUESTIONS API!!!");
                event.preventDefault();
                console.log(questions);
                setValidForUpdate(false); //reset the validated state for the next form submit.
                hideUpdateQuestionsForm();//hide the modal and reset the form.
           }
           else
           {
                console.log("CALL DELETE QUESTIONS API!!!");
                event.preventDefault();
                console.log(questions);
                setValidForUpdate(false); //reset the validated state for the next form submit.
                hideUpdateQuestionsForm();//hide the modal and reset the form.
           }
        }
    };

    const handleSetUpdate = (event) => {
        const form = event.currentTarget;
        let isInvalid = undefined;
        console.log(form);
        if (form.checkValidity() === false)//if our form results are not valid 
        {
            event.preventDefault();
            event.stopPropagation();
        }
        setIsSetValid(true);

        if (name === "") 
        {
            isInvalid = true;
            return;
        }

        if (isInvalid !== true) 
        {
            let data = {...quizzeySet};
            data.name = name;
            // console.log(data);
            setQuizzeySet(data);
            event.preventDefault();
            setIsSetValid(false); //reset the validated state for the next form submit.
            hideUpdateSetForm();
        }
    }


    //-------------- TOGGLE FOR SHOWING/HIDING UPDATE IND SET FORM ------------------
    const showUpdateSetForm = () => {
        setIndSetScreen(true);
    }

    const hideUpdateSetForm = () => {
        setIndSetScreen(false);
    }

    const renderUpdateSetForm = () => {
        return(
            <Form noValidate validated={isSetValid} onSubmit={handleSetUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label>Set Name:</Form.Label>
                        <Form.Control placeholder="Set Name" 
                                      required
                                      name="name"
                                      onChange={(e) => {setName(e.target.value)}}
                                      value={name} />
                        <Form.Control.Feedback type="invalid">You need to input a set name!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Check
                        type="switch"
                        label="Active Course?"
                        onChange={handleSetActive}
                        defaultChecked={active}
                        value={active}
                    />
                    <Button variant="primary"
                            onClick={(e) => handleSetUpdate(e)}
                            >Submit</Button>
            </Form>
        );
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
                                event={addField}/>
                &nbsp;&nbsp;
                <ReusableButton name="Delete Row"
                                type="button" 
                                variant="primary"
                                event={removeField}/>
                <br />
                <br />
                <Row>
                <React.Fragment>
                    <Form noValidate validated={validated} onSubmit={handleAddFormSubmit}>
                    {
                        inputFields.map((element, index) => {
                            return(
                                    <React.Fragment key={index}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Question {index + 1}:</Form.Label>
                                            <Form.Control placeholder={`Question:`}
                                                          required
                                                          name="question"
                                                          value={element.question} 
                                                          onChange={(e) => {handleAddFormChange(e, index)}} />
                                            <Form.Control.Feedback type="invalid">You need to input a question!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Answer {index + 1}:</Form.Label>
                                            <Form.Control placeholder={`Answer:`}
                                                          required
                                                          name="answer"
                                                          value={element.answer}
                                                          onChange={(e) =>{handleAddFormChange(e, index)}} />
                                            <Form.Control.Feedback type="invalid">You need to input an answer!</Form.Control.Feedback>
                                        </Form.Group>
                                        <hr className="hr-margin"/>
                                    </React.Fragment>
                            );
                        })
                    }
                    <ReusableButton  name="Submit"
                            variant="primary"
                            event={handleAddFormSubmit}/>
                    </Form>
                </React.Fragment>
                </Row>
            </React.Fragment>
        );
    }

    // -------------TOGGLE FOR SHOWING/HIDING UPDATE QUESTIONS FORM -------------- 
 
    const showUpdateQuestionsForm = () => {
        setUpdateScreen(true);
    }

    const hideUpdateQuestionsForm = () => {
        setUpdateScreen(false);
    }
    
    const renderUIForUpdate = () => {
        if (updateOperation === false) 
        {
            setUpdateOperation(true);    
        }
        else
        {
            setUpdateOperation(false);
        }
    }

    const renderUIForDelete = () => {
        if (deleteOperation === false) 
        {
            setDeleteOperation(true);    
        }
        else
        {
            setDeleteOperation(false);
        }
    }


    const renderUpdateQuestionsForm = () => {
        return(
            <React.Fragment>
                <ReusableButton name="Update?"
                                type="button" 
                                variant="primary"
                                event={renderUIForUpdate}
                                disable={deleteOperation}/>
                &nbsp;&nbsp;
                <ReusableButton name="Delete?"
                                type="button" 
                                variant="danger"
                                event={renderUIForDelete}
                                disable={updateOperation}/>
                <br />
                <br />
                <Row>
                <React.Fragment>
                    <Form  noValidate validated={validForUpdate} onSubmit={handleUpdateFormSubmit}>
                    {
                        questions.map((element, index) => {
                            return(
                                <React.Fragment key={index}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Question {index + 1}:</Form.Label>
                                            <Form.Control placeholder={`Question:`}
                                                          required
                                                          name="question"
                                                          value={element.question} 
                                                          onChange={(e) => {handleUpdateFormChange(e, index)}} />
                                            <Form.Control.Feedback type="invalid">You need to input a question!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Answer {index + 1}:</Form.Label>
                                            <Form.Control placeholder={`Answer:`}
                                                          required
                                                          name="answer"
                                                          value={element.answer}
                                                          onChange={(e) =>{handleUpdateFormChange(e, index)}} />
                                            <Form.Control.Feedback type="invalid">You need to input an answer!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Check type="switch"
                                                    label="Delete this question?"
                                                    name="delete"
                                                    style={deleteOperation !== true ? {display: "none"} : {}}
                                                    onChange={(e) => {handleDeleteSwitch(e, index)}}/>
                                        <hr className="hr-margin"/>
                                </React.Fragment>

                            )
                        })
                    }
                        <Button variant="primary" 
                                style={updateOperation !== true ? {display: "none"} : {}}
                                onClick={(e) => handleUpdateFormSubmit(e, "UPDATE")}
                                >Submit Update</Button>
                        &nbsp;
                        <Button variant="danger" 
                                style={deleteOperation !== true ? {display: "none"} : {}}
                                onClick={(e) => handleUpdateFormSubmit(e, "DELETE")}
                                >Submit Delete</Button>
                    </Form>
                </React.Fragment>   
                </Row>
            </React.Fragment>
        );
    }

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
                        <Dropdown.Item onClick={showUpdateSetForm}>Update Set</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={showAddQuestionsForm}>Add Questions</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item disabled={total === 0 ? true : false} onClick={showUpdateQuestionsForm}>Update / Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <ReusableModal show={addScreen} //Add Questions Modal
                               hide={hideAddQuestionsForm}
                               title={"Add New Question(s):"}
                               body={renderAddQuestionsForm} 
                               fullScreen={true} />
                <ReusableModal show={updateScreen} //Update/Delete Questions Modal
                               hide={hideUpdateQuestionsForm}
                               title={"Update/Delete Existing Question(s):"}
                               body={renderUpdateQuestionsForm} 
                               fullScreen={true} />
                <ReusableModal show={indSetScreen}
                               hide={hideUpdateSetForm}
                               title={"Update Existing Set"}
                               body={renderUpdateSetForm}
                               fullScreen={false}/>
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
                                <React.Fragment key={index}>
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
                                </React.Fragment>
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