import React from "react";
import {Container, Row} from "react-bootstrap";
import {Day} from "./day";
import './calendar.css';
import TimeUtils from "./TimeUtils";

export function Calendar(props) {
    const currentWeek = props.activeWeek;

    function getDay(day) {
        return TimeUtils.getDatePlusDays(currentWeek, day);
    }

    return (
        <Container className="calendar">
            <Row>
                <Day day={getDay(0)}/>
                <Day day={getDay(1)}/>
                <Day day={getDay(2)}/>
                <Day day={getDay(3)}/>
                <Day day={getDay(4)}/>
                <Day day={getDay(5)}/>
                <Day day={getDay(6)}/>
            </Row>
        </Container>
    )
}