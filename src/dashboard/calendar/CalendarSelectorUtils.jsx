import {Form} from "react-bootstrap";
import React from "react";

class CalendarSelectorUtils {
    static getCalendarBoxes(calendars, setCalendars) {
        function toggleActiveCalendar(calendar, calendars, setCalendars) {
            const updatedCalendars = new Map(calendars)
            if (calendars.get(calendar) === true) {
                updatedCalendars.set(calendar, false)
            } else {
                updatedCalendars.set(calendar, true)
            }
            setCalendars(updatedCalendars)
        }

        const e = []
        for (const calendar of calendars.keys()) {
            e.push(
                <Form.Check
                    key={"checkbox-" + calendar}
                    type="switch"
                    label={calendar}
                    checked={calendars.get(calendar)}
                    onChange={() => toggleActiveCalendar(calendar, calendars, setCalendars)}
                />
            )
        }
        return (
            <>{e}</>
        )
    }
}

export default CalendarSelectorUtils