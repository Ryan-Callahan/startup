import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {WeekRow} from "./weekRow";
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
        <Container className="calendar" fluid>
            {weekHeader()}
            <WeekRow time='0800'/>
            <WeekRow time='0900'/>
            <WeekRow time='1000'/>
            <WeekRow time='1100'/>
            <WeekRow time='1200'/>
            <WeekRow time='1300'/>
        </Container>
    )
}