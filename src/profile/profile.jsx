import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'

export function Profile() {
    async function getCurrentUser() {
        let message = "Not logged in";
        if (localStorage.getItem('user')) {
            message = "Current User: " + localStorage.getItem('user');
        }
        return (message);
    }

    return (
        <>
            <Popup
                trigger={
                    <button className="profile-button">
                        <img alt="profile-circle" src="/profile-circle.svg"
                             className="profile-button image"/>
                    </button>
                }
                position="bottom right"
                on="hover"
                closeOnDocumentClick
                mouseLeaveDelay={300}
                contentStyle={{backgroundColor: 'lightgray'}}
            >
                <div className='profile-menu'>
                    {getCurrentUser()}
                </div>
            </Popup>
        </>
    )
}