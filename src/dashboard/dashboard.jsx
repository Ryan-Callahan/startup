import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {Calendar} from "./calendar/calendar";
import {CreateEvent} from "./event/createEvent"
import TimeUtils from './calendar/TimeUtils'
import Popup from "reactjs-popup";
import {CalendarSelector} from "./calendar/calendarSelector";

export function Dashboard() {
    //TODO THIS IS TEST CODE
    localStorage.setItem("4", '["1744070400000", "1744085526000"]')
    localStorage.setItem("5", '["1743292800000", "1744070400000", "1744070194236", "1744070399000"]')
    localStorage.setItem("6", '["1744081200000"]')
    localStorage.setItem("1744070400000", '["event1", "event2", "event3", "event4"]')
    localStorage.setItem("1744070399000", '["event3"]')
    localStorage.setItem("1744085526000", '["event2"]')
    localStorage.setItem("1744070194236", '["event1"]')
    localStorage.setItem("1744081200000", '["event5"]')
    localStorage.setItem("event1", '{"name": "Ryans appointment", "description": "the appointed hour shall arrive"}')
    localStorage.setItem("event2", '{"name": "Second appointment", "description": "the appointed hour has arrived"}')
    localStorage.setItem("event3", '{"name": "Third Appointment", "description": "the appointed hour has passed"}')
    localStorage.setItem("event4", '{"name": "Fourth Appointment", "description": "4"}')
    localStorage.setItem("event5", '{"name": "Fifth Appointment", "description": "5"}')
    const allowedCalendars = ["4", "5", "6"]
    const activeCalendars = ["4", "5"]

    localStorage.setItem("event6", '{"name": "Sixth Appointment", "description": "6"}')
    const [activeWeek, updateActiveWeek] = React.useState(getTimezonedCurrentWeek())
    const [calendars, setCalendars] = React.useState(new Map(allowedCalendars.map(calendar => [calendar, (activeCalendars.includes(calendar))])))

    /**
     * Returns the active week in local time, not in UTC time. The calendar will be rendered in local time
     *  and this is where the conversion takes place.
     * @returns {Date}
     */
    function getTimezonedCurrentWeek() {
        const currentWeek = TimeUtils.getCurrentWeek();
        let timezoneAdjustedWeek = TimeUtils.getTimezoneTime(currentWeek);
        return TimeUtils.getDateFromEpoch(TimeUtils.getEpochToDay(timezoneAdjustedWeek.getTime()));
    }

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
                    <Col><Button onClick={() => updateActiveWeek(getTimezonedCurrentWeek())}>Today</Button></Col>
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
                    <Col>
                        <CalendarSelector calendars={calendars} setCalendars={setCalendars} />
                    </Col>
                    <Col>{getCalendarPaginator()}</Col>
                    <Col>
                        <CreateEvent />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <div style={{maxHeight: '80vh', overflow: 'auto', border: '3px solid black'}}>
                            <Calendar activeWeek={activeWeek} calendars={getActiveCalendars()} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Chats
                    </Col>
                    <Col>Chatbox</Col>
                </Row>
            </Container>

            {/*TODO TEMPORARY COMMENTED CODE*/}
            *****THIS IS TEMPORARY CODE*****
            <Button onClick={() => console.log("Current Time in Epoch: " + new Date().getTime())}>time epoch</Button>
            <Button onClick={() => console.log("Current Time in Epoch: " + new Date().toString())}>time string</Button>
            <Button onClick={() => console.log("Current Day in Epoch: " + TimeUtils.getEpochToDay(new Date().getTime()))}>day epoch</Button>
            <Button onClick={() => console.log("Current Week: " + TimeUtils.getDateFromEpoch(TimeUtils.getEpochToDay(TimeUtils.getCurrentWeek())))}>week date</Button>
            *****THIS IS TEMPORARY CODE*****

            <hr/>
        </main>
    );
}