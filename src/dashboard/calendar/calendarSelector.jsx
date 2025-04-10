import React from 'react';
import Popup from "reactjs-popup";
import Button from "react-bootstrap/Button";
import {Form, FormControl, FormLabel} from "react-bootstrap";
import CalendarSelectorUtils from "./CalendarSelectorUtils"
import {CreateEvent} from "../event/createEvent";

export function CalendarSelector({calendars, setCalendars}) {
    const [newCalendar, setNewCalendar] = React.useState('');

    function createCalendar() {
        fetch('/api/calendars', {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                name: newCalendar
            })
        }).then(() => setCalendars(calendars.set(newCalendar, false)))
            .then(() => setNewCalendar(''))
    }

    return (
        <Popup
            trigger={
                <Button>Calendars</Button>
            }
            position="bottom left"
            contentStyle={{width: "130px"}}
            nested
        >
            <Form>
                <span>Your Calendars:</span>
                {CalendarSelectorUtils.getCalendarBoxes(calendars, setCalendars, (_) => null)}
                <Popup trigger={<Button>Create New Calendar</Button>}>
                    {closeNewCalendar => (
                        <Form>
                            <FormLabel>New Calendar:</FormLabel>
                            <FormControl type="text" value={newCalendar} onChange={(e) => setNewCalendar(e.target.value)}/>
                            <Button onClick={() => {closeNewCalendar(); createCalendar()}}>Create</Button>
                        </Form>
                    )}
                </Popup>
            </Form>
        </Popup>
    )
}