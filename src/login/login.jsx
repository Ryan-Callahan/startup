import React from 'react';
import Button from 'react-bootstrap/Button';
import {Form, FormControl, FormGroup} from "react-bootstrap";
export function Login() {
    return (
        <main>
            <div className="column">
                <h1>Welcome to Schedulizer!</h1>
                <Form>
                    <h3>Log in or create an account</h3>
                    <FormGroup>
                        <FormControl type="username" placeholder="Username/Email"/>
                    </FormGroup>

                    <FormGroup>
                        <FormControl type="password" placeholder="password"/>
                    </FormGroup>
                    <Button variant="primary" type="submit" href="../dashboard">Login</Button>
                </Form>
                <section>OR</section>
                <Button variant="primary" href="../createAccount">Create new account</Button>
            </div>
        </main>
    );
}