import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {Calendar} from "./calendar/calendar";
import TimeUtils from './calendar/TimeUtils'

export function Dashboard() {
    //TODO THIS IS TEST CODE
    localStorage.setItem("4", '["1743292800000", "1741312984000"]')
    localStorage.setItem("1743292800000", '["1", "2"]')
    localStorage.setItem("1", '{"name": "Ryan\'s appointment", "description": "the appointed hour shall arrive"}')
    localStorage.setItem("2", '{"name": "Second appointment", "description": "the appointed hour has arrived"}')

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
                            <Calendar activeWeek={getActiveWeek()} calendars="4" />
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
            <Button onClick={() => console.log(TimeUtils.getEpochToDay(TimeUtils.getCurrentWeek()))}>epoch</Button>
            <Button onClick={() => console.log(TimeUtils.getDateFromEpoch(TimeUtils.getEpochToDay(TimeUtils.getCurrentWeek())))}>date</Button>
            *****THIS IS TEMPORARY CODE*****

            <hr/>
        </main>
    );
}