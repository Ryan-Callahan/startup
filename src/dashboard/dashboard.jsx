import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {Calendar} from "./calendar/calendar";
import {CreateEvent} from "./event/createEvent"
import TimeUtils from './calendar/TimeUtils'
import {CalendarSelector} from "./calendar/calendarSelector";
import {CalendarNotifier} from "./CalendarClient.js";

export function Dashboard() {
    const [activeWeek, updateActiveWeek] = React.useState(TimeUtils.getTimezonedCurrentWeek())
    const [activeCalendars, setActiveCalendars] = React.useState(new Map());
    const [userCalendars, setUserCalendars] = React.useState([]);

    React.useEffect(() => {
        updateCalendars()
        CalendarNotifier.addHandler(handleEvent);
        console.log("Dashboard mounted");
        return () => {
            CalendarNotifier.removeHandler(handleEvent);
        }
    }, []);

    function handleEvent(event) {
        updateCalendars();
        console.log(event);
    }

    function updateCalendars() {
        fetch('/api/users/calendars', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})
            .then((response) => response.json())
            .then((calendars) => {
                setActiveCalendars(new Map(calendars.map(calendar => [calendar._id, false])));
                setUserCalendars(calendars);
            });
    }

    function getActiveCalendars() {
        const active = []
        for (const calendar of userCalendars) {
            if (activeCalendars.get(calendar._id) === true) {
                active.push(calendar)
            }
        }
        return active
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
                    <Col><CalendarSelector activeCalendars={activeCalendars} userCalendars={userCalendars}
                                           setActiveCalendars={setActiveCalendars} setCalendars={setUserCalendars}/></Col>
                    <Col>{getCalendarPaginator()}</Col>
                    <Col><CreateEvent calendars={userCalendars} setCalendars={setUserCalendars}/></Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <div style={{maxHeight: '80vh', overflow: 'auto', border: '3px solid black'}}>
                            <Calendar activeWeek={activeWeek} calendars={getActiveCalendars()} setCalendars={setUserCalendars}/>
                        </div>
                    </Col>
                </Row>
            </Container>
            <hr/>
        </main>
    );
}