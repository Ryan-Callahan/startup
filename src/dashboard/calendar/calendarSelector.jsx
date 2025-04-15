import React from 'react';
import Popup from "reactjs-popup";
import Button from "react-bootstrap/Button";
import {Form, FormControl, FormLabel} from "react-bootstrap";
import CalendarSelectorUtils from "./CalendarSelectorUtils"

export function CalendarSelector({activeCalendars, userCalendars, setCalendars}) {
    const [newCalendar, setNewCalendar] = React.useState('');

    async function createCalendar() {
        const response = await fetch('/api/calendars', {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                name: newCalendar
            })
        })

        const calendar = await response.json()
        const active = activeCalendars
        const user = userCalendars
        active.set(calendar.calendar_id, false)
        user.push(calendar)
        setCalendars(active, user)
        setNewCalendar('')

        window.location.reload();
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
                {CalendarSelectorUtils.getCalendarBoxes(activeCalendars, userCalendars, setCalendars, (_) => null)}
                <Popup trigger={<Button>Create New Calendar</Button>}>
                    {closeNewCalendar => (
                        <Form>
                            <FormLabel>New Calendar:</FormLabel>
                            <FormControl type="text" value={newCalendar} onChange={(e) => setNewCalendar(e.target.value)}/>
                            <Button onClick={() => {
                                closeNewCalendar();
                                createCalendar()
                            }}>Create</Button>
                        </Form>
                    )}
                </Popup>
            </Form>
        </Popup>
    )
}