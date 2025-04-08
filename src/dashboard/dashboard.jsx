import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {Calendar} from "./calendar/calendar";
import TimeUtils from './calendar/TimeUtils'

export function Dashboard() {
    //TODO THIS IS TEST CODE
    localStorage.setItem("4", ["1743292800000", "1744085526000"])
    localStorage.setItem("5", ["1743292800000", "1744070400000", "1744070194236", "1744070399000"])
    localStorage.setItem("1744070400000", ["1", "2"])
    localStorage.setItem("1744070399000", ["3"])
    localStorage.setItem("1744085526000", ["2"])
    localStorage.setItem("1744070194236", ["1"])
    localStorage.setItem("1", {"name": "Ryan\'s appointment", "description": "the appointed hour shall arrive"})
    localStorage.setItem("2", {"name": "Second appointment", "description": "the appointed hour has arrived"})
    localStorage.setItem("3", {"name": "Third Appointment", "description": "the appointed hour has passed"})
    const calendars = ["4", "5"]

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

    return (
        <main>
            <Container>
                <Row>
                    <Col>
                        Calendars
                    </Col>
                    <Col>Paginator</Col>
                    <Col>Create Event</Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{maxHeight: '80vh', overflow: 'auto', border: '3px solid black'}}>
                            <Calendar activeWeek={getActiveWeek()} calendars={calendars} />
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