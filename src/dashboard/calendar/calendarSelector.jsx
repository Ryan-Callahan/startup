import React from 'react';
import Popup from "reactjs-popup";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";

export function CalendarSelector(props) {
    const calendars = props.calendars


    function toggleActiveCalendar(calendar) {
        const updatedCalendars = new Map(calendars)
        if (calendars.get(calendar) === true) {
            updatedCalendars.set(calendar, false)
        } else {
            updatedCalendars.set(calendar, true)
        }
        props.setCalendars(updatedCalendars)
    }

    function getCalendarBoxes() {
        const e = []
        for (const calendar of calendars.keys()) {
            e.push(
                <Form.Check
                    key={"checkbox-" + calendar}
                    type="switch"
                    label={calendar}
                    checked={calendars.get(calendar)}
                    onChange={() => toggleActiveCalendar(calendar)}
                />
            )
        }
        return (
            <>{e}</>
        )
    }

    return (
        <Popup
            trigger={
                <Button>Calendars</Button>
            }
            position="bottom left"
            contentStyle={{width: "130px"}}
        >
            <Form>
                <p>Your Calendars:</p>
                {getCalendarBoxes()}
            </Form>
        </Popup>
    )
}