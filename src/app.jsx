import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom';
import {Login} from './login/login';
import {Dashboard} from './dashboard/dashboard';
import {About} from './about/about';
import {CreateAccount} from './login/createAccount';
import {Nav, NavItem} from "react-bootstrap";
import {AuthState} from "./login/authState";
import {Profile} from "./profile/profile";

export default function App() {
    const [user, setUser] = React.useState(localStorage.getItem('user') || '');
    const currentAuthState = user ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <header className="fixed-top bg-solid border-bottom">
                    <nav className="navbar navbar-dark">
                        <div className="navbar-brand">Schedulizer260</div>
                        <Nav className="nav" variant="pills" defaultActiveKey="">
                            <NavItem className="nav-item">
                                <NavLink className="nav-link link-light" to="">Login</NavLink>
                            </NavItem>
                            {authState === AuthState.Authenticated && (
                                <NavItem className="nav-item">
                                    <NavLink className="nav-link link-light" eventKey="link-1" to="dashboard">Home</NavLink>
                                </NavItem>
                            )}
                            <NavItem className="nav-item">
                                <NavLink className="nav-link link-light" to="about">About</NavLink>
                            </NavItem>
                        </Nav>
                        <Profile/>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={
                        <Login
                            user={user}
                            authState={authState}
                            onAuthChange={(user, authState) => {
                                setAuthState(authState);
                                setUser(user);
                            }}
                        />
                    } exact/>
                    <Route path='/about' element={<About />}/>
                    <Route path='/dashboard' element={<Dashboard />}/>
                    <Route path='/createAccount' element={<CreateAccount />}/>
                    <Route path='*' element={<NotFound />}/>
                </Routes>

                <footer className="border-top">
                    <p>placeholder for third party service dialog</p>
                    <small>Ryan Callahan 2025</small>
                    <div>
                        <a href="https://github.com/Ryan-Callahan/startup/tree/main">Github</a>
                        <a href="https://schedulizer260.com">Other Sites</a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}