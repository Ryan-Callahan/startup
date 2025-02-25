import React from 'react';

export function CreateAccount() {
    return (
        <main>
            <div className="column">
                <h2>Create an account</h2>
                <form className="container" action="../dashboard/dashboard.html">
                    <div className="row">
                        <div className="col-lg-6">
                            <label htmlFor="email">Enter an email address:</label>
                        </div>
                        <div className="col-lg-6">
                            <input type="email" id="email" placeholder="Email" required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <label htmlFor="username">Create a username:</label>
                        </div>
                        <div className="col-lg-6">
                            <input type="text" id="username" placeholder="Username" required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <label htmlFor="password">Create a Password:</label>
                        </div>
                        <div className="col-lg-6">
                            <input type="password" id="password" placeholder="password" required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <label htmlFor="verify-password">Re-enter password:</label>
                        </div>
                        <div className="col-lg-6">
                            <input type="password" id="verify-password" placeholder="password" required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <button type="submit">Create account</button>
                        </div>
                    </div>
                </form>
            </div>

            <br/>
            <hr/>
        </main>
    );
}