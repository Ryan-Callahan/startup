import React from 'react';
import Popup from "reactjs-popup";
import Button from "react-bootstrap/Button";

export function CreateEvent(props) {
    return (
        <Popup
            trigger={
                <Button>Create Event</Button>
            }
        >
            FORM TO CREATE EVENTS
        </Popup>
    )
}