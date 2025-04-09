import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {Calendar} from "./calendar/calendar";
import {CreateEvent} from "./event/createEvent"
import TimeUtils from './calendar/TimeUtils'
import {CalendarSelector} from "./calendar/calendarSelector";

export function Dashboard() {
    //TODO THIS IS TEST CODE
    localStorage.setItem("testUser-entitledCalendars", '["4", "5", "6", "7"]')
    localStorage.setItem("testUser-activeCalendars", '["4", "5"]')
    let allowedCalendars = JSON.parse(localStorage.getItem("testUser-entitledCalendars"))
    let activeCalendars = JSON.parse(localStorage.getItem("testUser-activeCalendars"))

    const [activeWeek, updateActiveWeek] = React.useState(TimeUtils.getTimezonedCurrentWeek())
    const [calendars, setCalendars] = React.useState(new Map(allowedCalendars.map(calendar => [calendar, (activeCalendars.includes(calendar))])))

    function getActiveCalendars() {
        const activeCalendars = []
        for (const calendar of calendars.keys()) {
            if (calendars.get(calendar) === true) {
                activeCalendars.push(calendar)
            }
        }
        return activeCalendars
    }

    function getCalendarPaginator() {
        return (
            <Container>
                <Row>
                    <Col><Button onClick={() => updateActiveWeek(TimeUtils.getPreviousWeek(activeWeek))}>&lt;&lt;</Button></Col>
                    <Col><Button onClick={() => updateActiveWeek(TimeUtils.getPreviousDay(activeWeek))}>&lt;</Button></Col>
                    <Col><Button onClick={() => updateActiveWeek(TimeUtils.getTimezonedCurrentWeek())}>Today</Button></Col>
                    <Col><Button onClick={() => updateActiveWeek(TimeUtils.getNextDay(activeWeek))}>&gt;</Button></Col>
                    <Col><Button onClick={() => updateActiveWeek(TimeUtils.getNextWeek(activeWeek))}>&gt;&gt;</Button></Col>
                </Row>
            </Container>
        )
    }

    return (
        <main>
            <Container>
                <Row>
                    <Col><CalendarSelector calendars={calendars} setCalendars={setCalendars}/></Col>
                    <Col>{getCalendarPaginator()}</Col>
                    <Col><CreateEvent allCalendars={allowedCalendars}/></Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <div style={{maxHeight: '80vh', overflow: 'auto', border: '3px solid black'}}>
                            <Calendar activeWeek={activeWeek} calendars={getActiveCalendars()}/>
                        </div>
                    </Col>
                </Row>
            </Container>
            <hr/>
        </main>
    );
}