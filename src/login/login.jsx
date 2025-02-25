import React from 'react';
import Button from 'react-bootstrap/Button';
export function Login() {
    return (
        <main>
            <div className="column">
                <h1>Welcome to Schedulizer!</h1>
                <form action="../dashboard">
                    <h3>Log in or create an account</h3>
                    <div>
                        <input type="text" name="username" placeholder="Username/Email"/>
                        <input type="password" name="password" placeholder="password"/>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
                <section>OR</section>
                <form action="../createAccount">
                    <button type="submit">Create new account</button>
                </form>
            </div>
        </main>
    );
}