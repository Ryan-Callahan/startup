import React from 'react';
import Popup from "reactjs-popup";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import CalendarSelectorUtils from "./CalendarSelectorUtils"

export function CalendarSelector({calendars, setCalendars}) {
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
            </Form>
        </Popup>
    )
}