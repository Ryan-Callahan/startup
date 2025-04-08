import React from "react";
import {Container, Row} from "react-bootstrap";
import {Day} from "./day";
import './calendar.css';
import TimeUtils from "./TimeUtils";

export function Calendar(props) {
    const currentWeek = props.activeWeek;
    const calendars = props.calendars

    const timesList = []
    new Set(calendars.flatMap(calendar => {
        return localStorage.getItem(calendar).split(',')
    })).forEach(item => timesList.push(item))
    console.log("Times list: " + timesList)

    function getDateFromDay(day) {
        return TimeUtils.getDatePlusDays(currentWeek, day);
    }

    function getEventsForDay(day) {
        const events = []
        timesList.forEach(time => {
            const timeDate = TimeUtils.getDateFromEpoch(parseInt(time))
            if (TimeUtils.isDateSameDay(day, timeDate)) {
                events.push(time)
            }
        })
        return events
    }

    function getDays() {
        const days = []
        for (let i = 0; i < 7; i++) {
            const day = getDateFromDay(i)
            days.push(<Day day={day} eventTimes={getEventsForDay(day)}/>)
        }
        return <>{days}</>
    }

    return (
        <Container className="calendar">
            <Row>
                {getDays()}
            </Row>
        </Container>
    )
}