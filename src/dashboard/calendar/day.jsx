import React from "react";
import {Col, Row} from "react-bootstrap";
import {Time} from "./time";
import TimeUtils from "./TimeUtils";

export function Day(props) {
    const eventTimes = props.eventTimes
    console.log(props.day.toUTCString(), eventTimes)
    const relevantTimes = new Map
    eventTimes.map(time => {
        const roundedTime = TimeUtils.getEpochToHour(time)
        if (!relevantTimes.has(roundedTime)) {
            relevantTimes.set(roundedTime, [time])
        } else {
            relevantTimes.get(roundedTime).push(time)
        }
    })

    function getEventsForTime(time) {
        if (relevantTimes.has(time)) {
            const eventTimes = relevantTimes.get(time)
            const events = eventTimes.flatMap(t => localStorage.getItem(t))
            console.log("retrieved time: " + time + "\ntime keys : " + relevantTimes.get(time) + "\nEvents: " + events)
            return events
        } else {
            return null
        }
    }

    function getTimes() {
        const times = []
        for (let i = 0; i < 24; i++) {
            const date = TimeUtils.getDatePlusHours(props.day, i)
            times.push(<Time time={date} events={getEventsForTime(date.getTime())}/>)
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