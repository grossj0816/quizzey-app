import Header from "./Header";
import "./css/LandingPage.css"
import LoginButton from "./LoginButton";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const LandingPage = () => {
    return ( 
        <>
            <Header />
            <header id="showcase">
                        <Container>
                        <Row>
                        <Col md={{ span: 5, offset: 1 }} id="blur">
                            <h1 id="lndg-pg-txt">Use our digital flashcards to ace your next exam!</h1>
                            <div id="lndg-pg-btn">
                                <LoginButton/>
                            </div>
                        </Col>
                        </Row>
                    </Container>
            </header>
        </>
    );
}
 
export default LandingPage;