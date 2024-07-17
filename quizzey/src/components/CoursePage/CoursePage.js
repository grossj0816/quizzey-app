import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from "../LandingPage/Header";
import ReusableButton from "../common/reusableButton";
import ReusableModal from "../common/reusableModal";
import { courseListHandler, quizzeySetHandler } from "../../services/jsonService";
import { useEffect, useState } from "react";
import "./css/CoursePage.css";
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import ReusableCard from "../common/reusableCard";
import {handleUserIcon} from "../../utils/utils.js";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";


const MyCourse = () => {

    let { id } = useParams(); //courseId
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [myCourse, setMyCourse] = useState({});
    const [quizzeySets, setQuizzeySets] = useState([]); //this stores a local state of the quizzey sets by the cID set on component.
    const [ddValues, setDdValues] = useState([]); //will hold similar data to the state var above, but manages the list
    const [crsId, setCrsId] = useState(0);
    const [crsName, setCrsName] = useState("");
    const [org, setOrg] = useState("");
    const [textbook, setTextBook] = useState("");
    const [active, setActive] = useState(false);
    const [setName, setSName] = useState("");
    const [updateScreen, setUpdateScreen] = useState(false); // this is used to toggle the update course modal
    const [addScreen, setAddScreen] = useState(false); //this is used to toggle the add new set modal
    const [crsDataValid, setCrsDataValid] = useState(false); //for validating data submitted in update course modal
    const [newSetValid, setNewSetValid] = useState(false); //for validating data submitted in delete course modal  
    const [userName, setUserName] = useState("");
    const userInfo = useSelector(state => state.userInfo.getUserInfo);


    //As soon as we have the user metadata stored in redux...
    useEffect(() => {
        // store value in local state in Dashboard component for saving new courses.
        if (userInfo.user_metadata) {
            console.log('user info:', userInfo);
            setUserName(userInfo.user_metadata.nickname);
        }
    },[]);


    // TODO: CLEAN UP THE CODE HERE
    useEffect(() => {
        let course = {};
        let sets = quizzeySetHandler();
        // when the id value from useParams() is available
        if (id) 
        {
            fetch(`${process.env.REACT_APP_QUIZZEY_API_ENDPOINT}/courses/${id}`,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(course => {
                setMyCourse(course);

                // Individual course information used by update course form
                setCrsId(course.courseId);
                setCrsName(course.courseName);
                setOrg(course.organization);
                setTextBook(course.textbook);
                setActive(course.active);
            })
            // // find the course that belonggs the course id being passed in as path param
            // course = myCourses.find((course) => course.courseId === +id);
            // setMyCourse(course);//set the course to our local state variable

            sets = sets.filter((element) => element.courseId === +id);
            fetch(`${process.env.REACT_APP_QUIZZEY_API_ENDPOINT}/sets/${id}`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(sets => {
                setDdValues(sets);
                setQuizzeySets(sets);

            });
        }
    }, [id]);
    


    const handleDropdownSelect = (e) => {
        console.log("ID: ", e.target.value);
        // get setID from option value
        const setId = e.target.value;

        //get list of quizzey sets TODO: Make a way for quizzey sets to be stored remotely so I'm not making multiple local variables call from quizzeySetHandler();
        let sets = [...ddValues];
        
        // if we reselect back on the placeholder option, this will show all sets fron our course
        if(+setId === 0) 
        {
            setQuizzeySets(sets.filter((element) => element.courseId === +id));
        } 
        else //we filter through the quizzey sets and update the screen with the set we selected in the dd.
        {
            //find the quizzey set
            setQuizzeySets(sets.filter((element, index) => element.setId === +setId));
        }
    }


    const handleSetLink = (id) => {
        return `/quizzey-set/${id}`;
    }

    const handleCourseUpdate = (event) => {
        const form = event.currentTarget;
        let isInvalid = undefined;
        console.log(form);
        if (form.checkValidity() === false)//if our form results are not valid 
        {
            event.preventDefault();
            event.stopPropagation();
        }

        setCrsDataValid(true);

        if (crsName === "" || org === "" || textbook === "")
        {
            isInvalid = true;
            return;
        }

        if (isInvalid !== true)
        {
            let data = {...myCourse};
            
            data.courseName = crsName;
            data.organization = org;
            data.textbook = textbook;
            data.active = active;
            
            console.log(JSON.stringify(data));

            fetch(`${process.env.REACT_APP_QUIZZEY_API_ENDPOINT}/courses`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            })
            .catch(e => console.error("There was an error:" + e)); 

            setMyCourse(data);
            event.preventDefault();
            setCrsDataValid(false);
            hideCourseUpdateForm();
        }
    }

    const handleSetSave = (event) => {
        const form = event.currentTarget;
        let isInvalid = undefined;
        console.log(form);
        if (form.checkValidity() === false)//if our form results are not valid 
        {
            event.preventDefault();
            event.stopPropagation();
        }

        setNewSetValid(true);

        if (setName === "") 
        {
            isInvalid = true;
            return;    
        }

        if (isInvalid !== true) 
        {
            let newSet = {courseId: crsId, setName: setName, active: true, createdBy: userName};
            console.log(JSON.stringify(newSet));

            fetch(`${process.env.REACT_APP_QUIZZEY_API_ENDPOINT}/set`, {
                method: 'POST',
                body: JSON.stringify(newSet)
            })
            .catch(e => console.error("There was an error:" + e)); 

            fetch(`${process.env.REACT_APP_QUIZZEY_API_ENDPOINT}/sets/${id}`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(sets => { 
                setDdValues(sets);
                setQuizzeySets(sets);
            });

            setSName("");
            setNewSetValid(false);
            hideAddSetForm();
            window.location.reload();
        }
    }

    // -------------TOGGLE FOR SHOWING/HIDING COURSE UPDATE FORM --------------
    const showCourseUpdateForm = () => {
        setUpdateScreen(true);
    } 


    const hideCourseUpdateForm = () => {
        setUpdateScreen(false);
    } 


    const renderUpdateCourseForm = () => {
        return( 
                <Form noValidate validated={crsDataValid} onSubmit={handleCourseUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label>Course Name:</Form.Label>
                        <Form.Control placeholder="Course Name" 
                                      required
                                      onChange={(e) => setCrsName(e.target.value)}
                                      value={crsName} />
                        <Form.Control.Feedback type="invalid">You need to input a course name!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Organization:</Form.Label>
                        <Form.Control placeholder="Organization" 
                                      required
                                      onChange={(e) => setOrg(e.target.value)} 
                                      value={org} />
                        <Form.Control.Feedback type="invalid">You need to input an organization!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Textbook:</Form.Label>
                        <Form.Control placeholder="Textbook"  
                                      required
                                      onChange={(e) => setTextBook(e.target.value)}
                                      value={textbook}/>
                        <Form.Control.Feedback type="invalid">You need to input a textbook!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Check
                        type="switch"
                        label="Active Course?"
                        name="active"
                        onChange={(e) => {setActive(e.target.checked)}}
                        defaultChecked={active}
                        value={active}
                    />
                    <Button variant="primary"  
                            onClick={(e) => handleCourseUpdate(e)}>Submit</Button>
            </Form>
        );
    }

    // -------------TOGGLE FOR SHOWING/HIDING ADD SET FORM --------------
    const showAddSetForm = () => {
        setAddScreen(true);
    }


    const hideAddSetForm = () => {
        setAddScreen(false);
    }


    const renderAddSetForm = () => {
        return(
            <Form noValidate validated={newSetValid} onSubmit={handleSetSave}>
                <Form.Group className="mb-3">
                    <Form.Label>Set Name:</Form.Label>
                    <Form.Control placeholder="Set Name:"
                                  required
                                  name="setName"
                                  value={setName}
                                  onChange={(e) => {setSName(e.target.value)}}/>
                    <Form.Control.Feedback type="invalid">You need to input a set name!</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" 
                        onClick={(e) => handleSetSave(e)}>Submit</Button>
            </Form>
        );
    }

    return ( 
    <>
        <Header />
        <Container id="container">
            <Row>
                <p id="coursetitle">{myCourse.courseName}</p>       
                <h5>
                    <Badge bg="secondary" pill>
                    {myCourse.organization}
                    </Badge>
                </h5>
            </Row>
            <Row>
                <Link style={{margin: '5px'}} to={origin === "http://localhost:3000" ? '/' : '/index.html'} className="boldLink" id="navigateLink">View Dashboard</Link>
            </Row>
            <Row>
                <Dropdown>
                    <Dropdown.Toggle className="screenOptions">
                        Screen Options:
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={showCourseUpdateForm}>Update Course</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={showAddSetForm}>Add New Set</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <ReusableModal show={updateScreen}
                               hide={hideCourseUpdateForm}
                               title={"Update Existing Course:"}
                               body={renderUpdateCourseForm} />                    
                <ReusableModal show={addScreen}
                               hide={hideAddSetForm}
                               title={"Add New Set:"}
                               body={renderAddSetForm} />

            </Row>            
            <hr />      
            <Row >
                <Col sm={{span: 6, offset: 0}} md={{span: 6, offset: 0}} lg={{span: 4, offset: 0}}>
                    <Form onChange={(e) => handleDropdownSelect(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label id="setstitle">All quizzey sets:</Form.Label>
                            <Form.Select>
                            <option value={0}></option>
                            {
                                ddValues.map((element, index) => {
                                    return(
                                        <option key={element.setId} value={element.setId}>{element.setName}</option>
                                    )
                                })
                            }
                            </Form.Select>
                        </Form.Group>
                        {/* <ReusableButton name="Clear" event={}/> */}
                    </Form>
                </Col>
            </Row>
            <Row className="rowSpacing">
                {
                    quizzeySets.map((element, index) => {
                        if(index < 4)
                        {
                            return(
                                <Col xs={{span:10, offset:0}} sm={{span:6, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                                    <ReusableCard title={element.setName} text={element.userName} image={handleUserIcon()} setLink={handleSetLink(element.setId)}/> 
                                </Col>                             
                            )
                        }
                    })
                }
            </Row>
        </Container>
    </>);
}
 
export default MyCourse;