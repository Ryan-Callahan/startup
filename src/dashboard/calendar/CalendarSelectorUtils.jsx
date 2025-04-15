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

    static getCalendarBoxes(activeCalendars, userCalendars, setCalendars, setCalendarIsSelected) {

        function toggleActiveCalendar(calendar) {
            const updatedCalendars = new Map(activeCalendars)
            if (activeCalendars.get(calendar) === true) {
                updatedCalendars.set(calendar, false)
            } else {
                updatedCalendars.set(calendar, true)
            }
            setCalendarIsSelected(CalendarSelectorUtils.isCalendarSelected(updatedCalendars))
            setCalendars(updatedCalendars, userCalendars)
        }

        const e = []
        for (const calendar of userCalendars) {
            e.push(
                <Form.Check
                    key={"checkbox-" + calendar._id}
                    type="switch"
                    label={calendar.name}
                    checked={activeCalendars.get(calendar._id)}
                    onChange={() => toggleActiveCalendar(calendar._id)}
                />
            )
        }
        return (
            <>{e}</>
        )
    }
}

export default CalendarSelectorUtils