import React from 'react';
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export function CreateAccount(props) {
    const [user, setUser] = React.useState('')
    const [password, setPassword] = React.useState('');
    const [verifyPassword, setVerifyPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [passwordsMatch, setPasswordsMatch] = React.useState(true);

    async function createUser() {
        if (passwordCheck()) {
            localStorage.setItem('user', user);
            props.onSubmit(user);
        }
    }

    function passwordCheck() {
        let match = password === verifyPassword;
        setPasswordsMatch(match);
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
                        <FormControl type="username" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="password">Create a Password:</FormLabel>
                        <FormControl type="password" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="verify-password">Re-enter password:</FormLabel>
                        <FormControl type="password" id="verify-password" placeholder="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)}/>
                    </FormGroup>
                    {passwordsMatch === false && (
                        <errorMessage>
                            Passwords do not match!
                        </errorMessage>
                    )}
                    <FormGroup>
                        <Button variant="primary" onClick={() => createUser()} disabled={!user || !email || !password || !verifyPassword}>
                            Create account
                        </Button>
                        <Button variant="secondary" onClick={() => props.onReturn()}>Go Back</Button>
                    </FormGroup>
                </Form>
            </>
    );
}