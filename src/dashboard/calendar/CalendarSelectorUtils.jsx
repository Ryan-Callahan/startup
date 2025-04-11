import {Form} from "react-bootstrap";
import React from "react";

class CalendarSelectorUtils {
    static isCalendarSelected(calendars) {
        for (const value of calendars.values()) {
            if (value === true) {
                return true
            }
        }
        return false
    }

    static getCalendarBoxes(calendars, setCalendars, setCalendarIsSelected) {

        function toggleActiveCalendar(calendar) {
            const updatedCalendars = new Map(calendars)
            if (calendars.get(calendar) === true) {
                updatedCalendars.set(calendar, false)
            } else {
                updatedCalendars.set(calendar, true)
            }
            setCalendarIsSelected(CalendarSelectorUtils.isCalendarSelected(updatedCalendars))
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
                    onChange={() => toggleActiveCalendar(calendar)}
                />
            )
        }
        return (
            <>{e}</>
        )
    }
}

export default CalendarSelectorUtils