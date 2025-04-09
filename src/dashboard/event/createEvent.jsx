import React from 'react';
import Popup from "reactjs-popup";
import Button from "react-bootstrap/Button";
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import TimeUtils from "../calendar/TimeUtils";
import {CalendarSelector} from "../calendar/calendarSelector";
import CalendarSelectorUtils from "../calendar/CalendarSelectorUtils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export function CreateEvent({name, description, time, calendars, id, allCalendars}) {
    const [eventName, setEventName] = React.useState((name != null) ? name : "");
    const [eventDescription, setEventDescription] = React.useState((description != null) ? description : "");
    const [eventTime, setEventTime] = React.useState((time != null) ? time : new Date())
    const [eventCalendars, setEventCalendars] = React.useState((calendars != null) ? calendars : new Map(allCalendars.map(calendar => [calendar, false])))
    const [isCalendarSelected, setIsCalendarSelected] = React.useState(CalendarSelectorUtils.isCalendarSelected(eventCalendars))
    const [eventID, setEventID] = React.useState((id != null) ? id : generateEventID("testEvent-1"))

    function generateEventID(id) {
        let eventID = id
        if (localStorage.getItem(eventID) === null) {
            return eventID
        } else {
            return generateEventID("testEvent-" + (parseInt(eventID.split('-')[1]) + 1))
        }
    }

    function createEvent() {
        const event = JSON.stringify({
            name: eventName,
            description: eventDescription
        })
        localStorage.setItem(eventID, event)

        let eventIDs = []
        const time = eventTime.getTime()
        if (localStorage.getItem(time) !== null) {
            eventIDs.push(JSON.parse(localStorage.getItem(time)))
        }
        eventIDs.push(eventID)
        eventIDs = JSON.stringify(eventIDs.flat())
        localStorage.setItem(time, eventIDs)


        for (const calendar of eventCalendars.keys()) {
            if (eventCalendars.get(calendar)) {
                let times = []
                if (localStorage.getItem(calendar) !== null) {
                    times.push(JSON.parse(localStorage.getItem(calendar)))
                }
                times.push(time)
                times = JSON.stringify(times.flat())
                localStorage.setItem(calendar, times)
            }
        }
        console.log(eventID, eventName, eventDescription, eventTime, eventCalendars)
        window.location.reload()
    }

    return (
        <Popup
            trigger={
                <Button>Create Event</Button>
            }
            modal
        >
            {close => (
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
                        <DatePicker selected={eventTime} onChange={(date) => setEventTime(date)} showTimeSelect dateFormat="Pp" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Calendars:</FormLabel>
                        {CalendarSelectorUtils.getCalendarBoxes(eventCalendars, setEventCalendars, setIsCalendarSelected)}
                    </FormGroup>
                    <FormGroup>
                        <Button variant="primary" onClick={() => { close(); createEvent()}} disabled={!eventName || !isCalendarSelected}>Create Event</Button>
                        <Button variant="primary" onClick={() => close()}>Cancel Event</Button>
                    </FormGroup>
                </Form>
            )}
        </Popup>
    )
}