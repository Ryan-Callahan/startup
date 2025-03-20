import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Day} from "./day";
import './calendar.css';
import TimeUtils from "./TimeUtils";

export function Calendar(props) {
    const currentWeek = props.activeWeek;
    console.log("activeWeek: " + currentWeek.toUTCString());

    function weekHeader () {
        return (
            <Row className="weekHeader">
                <Col className="time">Sunday</Col>
                <Col className="time">Monday</Col>
                <Col className="time">Tuesday</Col>
                <Col className="time">Wednesday</Col>
                <Col className="time">Thursday</Col>
                <Col className="time">Friday</Col>
                <Col className="time">Saturday</Col>
            </Row>
        )
    }

    return (
        <Container className="calendar">
            {weekHeader()}
            <Row>
                <Day day='sunday'/>
                <Day day='monday'/>
                <Day day='tuesday'/>
                <Day day='wednesday'/>
                <Day day='thursday'/>
                <Day day='friday'/>
                <Day day='saturday'/>
            </Row>
        </Container>
    )
}