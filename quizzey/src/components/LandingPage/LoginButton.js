import './css/LoginButton.css';
import Button from 'react-bootstrap/Button';
import {useAuth0} from '@auth0/auth0-react';



const LoginButton = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (      
        isAuthenticated ? 
            <Button variant='light' size="lg" id='loginBtn' onClick={() => logout({logoutParams: {returnTo: window.location.origin + '/index.html'}})}>Log out</Button>
        :
            <Button variant='light' size="lg" id='loginBtn' onClick={() => loginWithRedirect()}>Log in</Button>
    );
}
 
export default LoginButton;