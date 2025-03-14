import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {Calendar} from "./calendar";

export function Dashboard() {
    function getEpochToMinute(time) {
        const roundToMinute = Math.floor(time / 60000) * 60000;
        return (roundToMinute);
    }

    function getEpochToDay(time) {
        const roundToHour = Math.floor(time / 86400000) * 86400000;
        return (roundToHour);
    }

    //takes a time, converts it to the current timezone time
    function getTimezoneTime(now) {
        return new Date(Math.floor(now.getTime()) - (now.getTimezoneOffset() * 60000));
    }

    //returns the current time but on sunday of the current week to the minute
    function getCurrentWeek() {
        let now = new Date();
        now = new Date(getTimezoneTime(now));
        console.log(now.getTime());
        now.setDate(now.getDate() - now.getDay())
        return now.getTime();
    }


    function getDateFromEpoch(date) {
        const then = new Date(date);
        return (then);
    }

    function getActiveWeek() {
        return getDateFromEpoch(getEpochToMinute());
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
                            <Calendar />
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
            <Button onClick={() => console.log(getEpochToDay(getCurrentWeek()))}>epoch</Button>
            <Button onClick={() => console.log(getDateFromEpoch(getEpochToDay(getCurrentWeek())).toUTCString())}>date</Button>

            <hr/>
        </main>
    );
}