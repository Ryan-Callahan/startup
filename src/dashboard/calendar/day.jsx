import React from "react";
import {Col, Row} from "react-bootstrap";
import {Time} from "./time";
import TimeUtils from "./TimeUtils";

export function Day(props) {
    const calendars = localStorage.getItem(props.calendars)
    const times = []
    for (const calendar of calendars) {
        times.push(localStorage.getItem(calendar))
    }


    function getEventsForTime(time) {
        if (time in times) {
            console.log("retrieved time: " + localStorage.getItem(time))
            return localStorage.getItem(time)
        } else {
            return null
        }
    }

    function getTimes() {
        const times = []
        for (let i = 0; i < 24; i++) {
            const time = TimeUtils.getDatePlusHours(props.day, i)
            times.push(<Time time={time} events={getEventsForTime(time.getTime())}/>)
        }
        return <>{times}</>
    }

    return (
        <Col className="day">
            <Row className="weekHeader time content">
                {TimeUtils.getDateAsString(props.day)}
            </Row>
            {getTimes()}
        </Col>
    )
}