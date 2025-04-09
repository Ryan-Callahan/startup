import React from 'react';
import {LoggedOut} from './loggedOut';
import {LoggedIn} from './loggedIn';
import {AuthState} from "./authState";

export function Login({user, authState, onAuthChange}) {
    return (
        <main>
            <div className="column">
                <h1>Welcome to Schedulizer!</h1>
                {authState === AuthState.Unauthenticated && (
                    <LoggedOut user={user} onLogin={(loginUserName) => onAuthChange(loginUserName, AuthState.Authenticated)}/>
                )}
                {authState === AuthState.Authenticated && (
                    <LoggedIn user={user} onLogout={() => onAuthChange(user, AuthState.Unauthenticated)}/>
                )}
            </div>
        </main>
    );
}