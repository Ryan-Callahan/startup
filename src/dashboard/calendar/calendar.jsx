import React from "react";
import {Container, Row} from "react-bootstrap";
import {Day} from "./day";
import './calendar.css';
import TimeUtils from "./TimeUtils";

export function Calendar({activeWeek, calendars}) {
    const timesList = calendars.map(calendar => calendar.times).flat().filter((value, index, self) => self.indexOf(value) === index)

    function getDateFromDay(day) {
        return TimeUtils.getDatePlusDays(activeWeek, day);
    }

    function getEventsForDay(day) {
        const events = []
        timesList.forEach(time => {
            const timeDate = TimeUtils.getDateFromEpoch(time.time)
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
            days.push(<Day key={"Date-" + day.getTime()} day={day} eventTimes={getEventsForDay(day)}/>)
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