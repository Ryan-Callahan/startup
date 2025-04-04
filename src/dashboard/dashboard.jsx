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
                        this is a placeholder for the main calendar display, which will rely heavily on CSS and React.
                    </Col>
                    <Col></Col>
                    <Col></Col>
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
                        this is a placeholder for the active live chat box.
                    </Col>
                    <Col></Col>
                </Row>
            </Container>

            {/*TODO TEMPORARY COMMENTED CODE*/}
            <Button onClick={() => console.log(TimeUtils.getEpochToDay(TimeUtils.getCurrentWeek()))}>epoch</Button>
            <Button onClick={() => console.log(TimeUtils.getDateFromEpoch(TimeUtils.getEpochToDay(TimeUtils.getCurrentWeek())))}>date</Button>

            <hr/>
        </main>
    );
}