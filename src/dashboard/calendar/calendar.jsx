import React from "react";
import {Container, Row} from "react-bootstrap";
import {Day} from "./day";
import './calendar.css';
import TimeUtils from "./TimeUtils";

export function Calendar(props) {
    const currentWeek = props.activeWeek;

    function getDateFromDay(day) {
        return TimeUtils.getDatePlusDays(currentWeek, day);
    }

    function get() {

    }

    function getDays() {
        const days = []
        for (let i = 0; i < 7; i++) {
            days.push(<Day day={getDateFromDay(i)} calendars={props.calendars}/>)
        }
        return <>{days}</>
    }

    return (
        <Container className="calendar">
            <Row>
                {getDays()}
            </Row>
        </Container>
    )
}