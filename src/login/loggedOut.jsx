import {Form, FormControl, FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";
import {CreateAccount} from "./createAccount";
import {Error} from "../error/error";

export function LoggedOut(props) {
    const [username, setUsername] = React.useState(props.user);
    const [password, setPassword] = React.useState('');
    const [creating, setCreating] = React.useState(false);
    const [displayError, setDisplayError] = React.useState('');

    async function loginUser(username, password) {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (response?.status === 200) {
            props.onLogin(username);
        } else {
            const body = await response.json();
            (body.msg === 'Unauthorized') ? setDisplayError("Username or password is incorrect!") : setDisplayError(<Error errorMessage={body.msg}/>)
        }
    }

    return (
        <>
            {creating === false && (
                <>
                    <Form>
                        <h3>Log in or create an account</h3>
                        <FormGroup>
                            <FormControl type="username" placeholder="Username/Email" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </FormGroup>

                        <FormGroup>
                            <FormControl type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </FormGroup>
                        {displayError !== '' && (
                          <errormessage>{displayError}</errormessage>
                        )}
                        <Button variant="primary" onClick={() => loginUser(username, password)} disabled={!username || !password}>Login</Button>
                    </Form>
                    <section>OR</section>
                    <Button variant="primary" onClick={() => setCreating(true)}>Create new account</Button>
                </>
            )}
            {creating === true && (
                <CreateAccount onSubmit={(username, password) => loginUser(username, password)} onReturn={() => setCreating(false)}/>
            )}
        </>
    )
}