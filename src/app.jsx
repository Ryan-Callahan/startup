import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { About } from './about/about';
import { CreateAccount } from './login/createAccount';

export default function App() {
    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <header className="fixed-top bg-solid border-bottom">
                    <nav className="navbar navbar-dark">
                        <div className="navbar-brand">Schedulizer260</div>
                        <ul className="nav">
                            <li className="nav-item">
                                <NavLink className="nav-link link-light" to="">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link link-secondary" to="dashboard">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link link-secondary" to="about">About</NavLink>
                            </li>
                        </ul>
                        <button className="profile-button">
                            <img alt="profile-circle" src="/profile-circle.svg"
                                 className="profile-button image"/>
                        </button>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<Login />} exact/>
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