import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {Calendar} from "./calendar/calendar";
import TimeUtils from './calendar/TimeUtils'

export function Dashboard() {

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
                            <Calendar activeWeek={getActiveWeek()} />
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