import './css/LoginButton.css';
import Button from 'react-bootstrap/Button';
import {useAuth0} from '@auth0/auth0-react';



const LoginButton = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const origin = window.location.origin;
    return (      
        isAuthenticated ? 
            <Button variant='light' size="lg" id='loginBtn' onClick={() => 
                                                                            logout({logoutParams: origin !== "http://localhost:3000" ? {returnTo: window.location.origin + '/index.html'}
                                                                                                                              : {returnTo: window.location.origin}})
                                                                    }>Log out</Button>
        :
            <Button variant='light' size="lg" id='loginBtn' onClick={() => loginWithRedirect()}>Log in</Button>
    );
}
 
export default LoginButton;