import Header from "./Header";
import "./css/LandingPage.css";
import LoginButton from "./LoginButton";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { adjustTextSize } from '../../utils/utils';
import { useEffect, useState } from "react";




const LandingPage = () => {


    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

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

    
    return ( 
        <>
            <Header />
            <header id="showcase">
                        <Container>
                        <Row>
                        <Col sm={{span:6, offset:0}} md={{span:6, offset:0}} lg={{span:6, offset:0}}>
                            <h1 id="lndg-pg-txt" style={{fontSize: adjustTextSize(innerWidth)}}>Use our digital flashcards <br/> to ace your next exam!</h1>
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