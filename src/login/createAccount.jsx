import React from 'react';
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Error} from "../error/error";

export function CreateAccount(props) {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('');
    const [verifyPassword, setVerifyPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [displayError, setDisplayError] = React.useState('');


    async function createUser() {
        if (passwordCheck()) {
            const response = await fetch('/api/auth/create', {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            if (response?.status === 200) {
                props.onSubmit(username, password);
            } else {
                const body = await response.json();
                (body.msg === 'Existing user') ? setDisplayError("Username already exists!") : setDisplayError(<Error errorMessage={body.msg}/>)
            }
        }
    }

    function passwordCheck() {
        let match = password === verifyPassword;
        (match) ? setDisplayError('') : setDisplayError('Passwords do not match!');
        return (match);
    }

    return (
        <>
            <h2>Create an account</h2>
            <Form>
                <FormGroup>
                    <FormLabel>Enter an email address:</FormLabel>
                    <FormControl type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Create a username:</FormLabel>
                    <FormControl type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="password">Create a Password:</FormLabel>
                    <FormControl type="password" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="verify-password">Re-enter password:</FormLabel>
                    <FormControl type="password" id="verify-password" placeholder="password" value={verifyPassword}
                                 onChange={(e) => setVerifyPassword(e.target.value)}/>
                </FormGroup>
                {displayError !== '' && (
                    <errormessage>
                        {displayError}
                    </errormessage>
                )}
                <FormGroup>
                    <Button variant="primary" onClick={() => createUser()} disabled={!username || !email || !password || !verifyPassword}>
                        Create account
                    </Button>
                    <Button variant="secondary" onClick={() => props.onReturn()}>Go Back</Button>
                </FormGroup>
            </Form>
        </>
    );
}