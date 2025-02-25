import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import {Routes} from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <header className="fixed-top bg-solid border-bottom">
                    <nav className="navbar navbar-dark">
                        <div className="navbar-brand">Schedulizer260</div>
                        <ul className="nav">
                            <li className="nav-item">
                                <a className="nav-link link-light" href="login.html">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link link-secondary" href="../dashboard/dashboard.html">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link link-secondary" href="../about/about.html">About</a>
                            </li>
                        </ul>
                        <button className="profile-button">
                            <img alt="profile-circle" src="../../public/profile-circle.svg"
                                 className="profile-button image"/>
                        </button>
                    </nav>
                </header>

                <Routes>

                </Routes>

                <footer className="border-top fixed-bottom">
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