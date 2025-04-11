import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {Calendar} from "./calendar/calendar";
import {CreateEvent} from "./event/createEvent"
import TimeUtils from './calendar/TimeUtils'
import {CalendarSelector} from "./calendar/calendarSelector";

export function Dashboard() {
    const [activeWeek, updateActiveWeek] = React.useState(TimeUtils.getTimezonedCurrentWeek())
    const [calendars, setCalendars] = React.useState(new Map());

    React.useEffect(() => {
        fetch('/api/users/calendars')
            .then((response) => response.json())
            .then((calendars) => {setCalendars(new Map(calendars.map(calendar => [calendar, false])))})
    }, [])

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
                    <Col><CalendarSelector calendars={calendars} setCalendars={setCalendars} set/></Col>
                    <Col>{getCalendarPaginator()}</Col>
                    <Col><CreateEvent calendars={calendars}/></Col>
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