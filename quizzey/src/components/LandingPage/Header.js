import './css/Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from './LoginButton';

const Header = () => {
    return ( 
        <>
        <Container>
            <Navbar bg="primary" variant="dark" fixed="top" collapseOnSelect expand="lg">
                <Navbar.Brand href="#home" id='brandText'>Quizzey</Navbar.Brand>
                <Nav className='me-auto'></Nav>
                <LoginButton/>
            </Navbar>   
        </Container>        
        </>
     );
}
 
export default Header;