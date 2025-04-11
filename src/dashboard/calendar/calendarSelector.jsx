import React from 'react';
import Popup from "reactjs-popup";
import Button from "react-bootstrap/Button";
import {Form, FormControl, FormLabel} from "react-bootstrap";
import CalendarSelectorUtils from "./CalendarSelectorUtils"
import {CreateEvent} from "../event/createEvent";

export function CalendarSelector({calendars, setCalendars}) {

    function createCalendar() {
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
                {CalendarSelectorUtils.getCalendarBoxes(calendars, setCalendars)}
                <Popup trigger={<Button>Create New Calendar</Button>}>adadadd</Popup>
            </Form>
        </Popup>
    )
}