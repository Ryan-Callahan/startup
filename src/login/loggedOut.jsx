import {Form, FormControl, FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from 'react-router-dom';
import {CreateAccount} from "./createAccount";

export function LoggedOut(props) {
    const [user, setUser] = React.useState(props.user);
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const [creating, setCreating] = React.useState(false);

    async function loginUser(user) {
        localStorage.setItem('user', user);
        props.onLogin(user);
    }

    async function createUser() {
        setCreating(true)
        localStorage.setItem('creating', creating)
    }

    return (
        <>
            {creating === false && (
                <>
                <Form>
                    <h3>Log in or create an account</h3>
                    <FormGroup>
                        <FormControl type="username" placeholder="Username/Email" value={user} onChange={(e) => setUser(e.target.value)}/>
                    </FormGroup>

                    <FormGroup>
                        <FormControl type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </FormGroup>
                    <Button variant="primary" onClick={() => loginUser(user)} disabled={!user || !password}>Login</Button>
                </Form>
                <section>OR</section>
                <Button variant="primary" onClick={() => setCreating(true)}>Create new account</Button>
                </>
            )}
            {creating === true && (
                <CreateAccount onSubmit={(user) => loginUser(user)} onReturn={() => setCreating(false)}/>
            )}
        </>
    )
}