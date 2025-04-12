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
        for (const calendar of activeCalendars.keys()) {
            e.push(
                <Form.Check
                    key={"checkbox-" + calendar}
                    type="switch"
                    label={userCalendars.find(c => c.calendar_id === calendar).name}
                    checked={activeCalendars.get(calendar)}
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