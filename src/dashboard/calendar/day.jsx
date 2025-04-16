import React from "react";
import {Col, Row} from "react-bootstrap";
import {Time} from "./time";
import TimeUtils from "./TimeUtils";

export function Day({day, eventTimes, setCalendars}) {
    const relevantTimes = new Map
    eventTimes.map(eventTime => {
        const time = eventTime.time
        const roundedTime = TimeUtils.getEpochToHour(time)
        if (!relevantTimes.has(roundedTime)) {
            relevantTimes.set(roundedTime, [time])
        } else {
            relevantTimes.get(roundedTime).push(time)
        }
    })

    function getEventsForTime(time) {
        if (relevantTimes.has(time)) {
            return relevantTimes.get(time).flatMap(times => eventTimes.find((t) => t.time === times).event_ids)
        } else {
            return null
        }
    }

    function getTimes() {
        const times = []
        for (let i = 0; i < 24; i++) {
            const date = TimeUtils.getDatePlusHours(day, i)
            times.push(<Time key={"Time-" + date.getTime()} time={date} events={getEventsForTime(date.getTime())} setCalendars={setCalendars}/>)
        }
        return <>{times}</>
    }

    return (
        <Col className="day">
            <Row className="weekHeader time content">
                {TimeUtils.getDateAsString(day)}
            </Row>
            {getTimes()}
        </Col>
    )
}