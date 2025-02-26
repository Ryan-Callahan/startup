import React from 'react';
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export function CreateAccount() {
    return (
        <main>
            <div className="column">
                <h2>Create an account</h2>
                <Form className="container" action="../dashboard">
                    <FormGroup>
                        <FormLabel>Enter an email address:</FormLabel>
                        <FormControl type="email" placeholder="Email" required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Create a username:</FormLabel>
                        <FormControl type="username" placeholder="Username" required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="password">Create a Password:</FormLabel>
                        <FormControl type="password" id="password" placeholder="password" required/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="verify-password">Re-enter password:</FormLabel>
                        <FormControl type="password" id="verify-password" placeholder="password" required/>
                    </FormGroup>
                    <FormGroup>
                        <Button variant="primary" type="submit">Create account</Button>
                    </FormGroup>
                </Form>
            </div>

            <br/>
            <hr/>
        </main>
    );
}