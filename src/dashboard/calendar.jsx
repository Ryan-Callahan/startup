import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Day} from "./day";
import './calendar.css';

export function Calendar(props) {
    function weekHeader () {
        return (
            <Row className="weekHeader">
                <Col className="timeCell">Sunday</Col>
                <Col className="timeCell">Monday</Col>
                <Col className="timeCell">Tuesday</Col>
                <Col className="timeCell">Wednesday</Col>
                <Col className="timeCell">Thursday</Col>
                <Col className="timeCell">Friday</Col>
                <Col className="timeCell">Saturday</Col>
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