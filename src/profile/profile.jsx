import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'

export function Profile({username}) {
    async function getCurrentUser() {
        let message = "Not logged in";
        if (username !== '') {
            message = "Current User: " + username;
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