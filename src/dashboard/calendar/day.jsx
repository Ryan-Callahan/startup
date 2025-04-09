import React from "react";
import {Col, Row} from "react-bootstrap";
import {Time} from "./time";
import TimeUtils from "./TimeUtils";

export function Day(props) {
    const eventTimes = props.eventTimes
    const relevantTimes = new Map
    eventTimes.map(time => {
        const roundedTime = TimeUtils.getEpochToHour(time)
        if (!relevantTimes.has(roundedTime)) {
            relevantTimes.set(roundedTime, [time])
        } else {
            relevantTimes.get(roundedTime).push(time)
        }
    })

    function getEventIDsForTime(time) {
        if (relevantTimes.has(time)) {
            const eventTimes = relevantTimes.get(time)
            return eventTimes.flatMap(t => JSON.parse(localStorage.getItem(t)))
        } else {
            return null
        }
    }

    function getTimes() {
        const times = []
        for (let i = 0; i < 24; i++) {
            const date = TimeUtils.getDatePlusHours(props.day, i)
            times.push(<Time key={"Time-" + date.getTime()} time={date} eventIDs={getEventIDsForTime(date.getTime())}/>)
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