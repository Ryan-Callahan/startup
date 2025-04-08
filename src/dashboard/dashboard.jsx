import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {Calendar} from "./calendar/calendar";
import {CreateEvent} from "./event/createEvent"
import TimeUtils from './calendar/TimeUtils'

export function Dashboard() {
    //TODO THIS IS TEST CODE
    localStorage.setItem("4", '["1744070400000", "1744085526000"]')
    localStorage.setItem("5", '["1743292800000", "1744070400000", "1744070194236", "1744070399000"]')
    localStorage.setItem("1744070400000", '["event1", "event2", "event3", "event4"]')
    localStorage.setItem("1744070399000", '["event3"]')
    localStorage.setItem("1744085526000", '["event2"]')
    localStorage.setItem("1744070194236", '["event1"]')
    localStorage.setItem("event1", '{"name": "Ryans appointment", "description": "the appointed hour shall arrive"}')
    localStorage.setItem("event2", '{"name": "Second appointment", "description": "the appointed hour has arrived"}')
    localStorage.setItem("event3", '{"name": "Third Appointment", "description": "the appointed hour has passed"}')
    localStorage.setItem("event4", '{"name": "Fourth Appointment", "description": "4"}')
    localStorage.setItem("event5", '{"name": "Fifth Appointment", "description": "5"}')
    localStorage.setItem("event6", '{"name": "Sixth Appointment", "description": "6"}')
    const calendars = ["4", "5"]

    const [activeWeek, updateActiveWeek] = React.useState(getActiveWeek())

    /**
     * Returns the active week in local time, not in UTC time. The calendar will be rendered in local time
     *  and this is where the conversion takes place.
     * @returns {Date}
     */
    function getActiveWeek() {
        const currentWeek = TimeUtils.getCurrentWeek();
        let timezoneAdjustedWeek = TimeUtils.getTimezoneTime(currentWeek);
        return TimeUtils.getDateFromEpoch(TimeUtils.getEpochToDay(timezoneAdjustedWeek.getTime()));
    }

    function getCalendarPaginator() {
        return (
            <Container>
                <Col><Button onClick={() => updateActiveWeek(TimeUtils.getPreviousWeek(activeWeek))}>Previous Week</Button></Col>
                <Col><Button onClick={() => updateActiveWeek(TimeUtils.getPreviousDay(activeWeek))}>Previous Day</Button></Col>
                <Col><Button onClick={() => updateActiveWeek(TimeUtils.getNextDay(activeWeek))}>Next Day</Button></Col>
                <Col><Button onClick={() => updateActiveWeek(TimeUtils.getNextWeek(activeWeek))}>Next Week</Button></Col>
            </Container>
        )
    }

    return (
        <main>
            <Container>
                <Row>
                    <Col>
                        Calendars
                    </Col>
                    <Col>{getCalendarPaginator()}</Col>
                    <Col>
                        <CreateEvent />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{maxHeight: '80vh', overflow: 'auto', border: '3px solid black'}}>
                            <Calendar activeWeek={activeWeek} calendars={calendars} />
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