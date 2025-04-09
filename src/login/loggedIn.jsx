import {useNavigate} from "react-router-dom";
import React from 'react';
import Button from "react-bootstrap/Button";

export function LoggedIn(props) {
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem('user');
        props.onLogout();
    }

    return (
        <>
            <h4>Currently signed in:</h4>
            <div>{props.user}</div>
            <Button variant='primary' onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
            <Button variant='secondary' onClick={() => logout()}>Logout</Button>
        </>
    )
}