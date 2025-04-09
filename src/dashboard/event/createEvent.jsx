import React from 'react';
import Popup from "reactjs-popup";
import Button from "react-bootstrap/Button";
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import TimeUtils from "../calendar/TimeUtils";

export function CreateEvent(props) {
    const [eventName, setEventName] = React.useState((props.name != null) ? props.name : "");
    const [eventDescription, setEventDescription] = React.useState((props.description != null) ? props.description : "");
    const [eventTime, setEventTime] = React.useState((props.time != null) ? props.time : TimeUtils.getEpochToHour(new Date()))
    const [eventCalendar, setEventCalendar] = React.useState((props.calendar != null) ? props.calendar : "7")
    const [eventID, setEventID] = React.useState((props.id != null) ? props.id : "testEvent")

    function createEvent() {
        const event = JSON.stringify({
            name: eventName,
            description: eventDescription
        })

        let time = []
        if (localStorage.getItem(eventTime) !== null) {
            time.push(JSON.parse(localStorage.getItem(eventTime)))
        }
        time.push(eventID)
        time = JSON.stringify(time.flat())

        let calendar = []
        if (localStorage.getItem(eventCalendar) !== null) {
            calendar.push(JSON.parse(localStorage.getItem(eventCalendar)))
        }
        calendar.push(eventTime.toString())
        calendar = JSON.stringify(calendar.flat())

        localStorage.setItem(eventID, event)
        localStorage.setItem(eventTime, time)
        localStorage.setItem(eventCalendar, calendar)
    }

    return (
        <Popup
            trigger={
                <Button>Create Event</Button>
            }
            modal
        >
            <Form>
                <FormGroup>
                    <FormLabel>
                        Name of Event:
                    </FormLabel>
                    <FormControl type="text" value={eventName} onChange={(e) => setEventName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Description:</FormLabel>
                    <FormControl type="description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Button variant="primary" onClick={() => createEvent()} disabled={!eventName}>Create Event</Button>
                </FormGroup>
            </Form>
        </Popup>
    )
}