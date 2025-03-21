import React from "react";
import {Col, Row} from "react-bootstrap";
import {Time} from "./time";
import TimeUtils from "./TimeUtils";

export function Day(props) {
    console.log(props.day.toUTCString());
    console.log(TimeUtils.getDayAsString(props.day))

    return (
        <Col className="day">
            <Row className="weekHeader time content">
                {TimeUtils.getDayAsString(props.day)}
            </Row>
            <Time time={TimeUtils.getDatePlusHours(props.day, 0)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 1)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 2)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 3)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 4)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 5)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 6)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 7)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 8)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 9)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 10)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 11)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 12)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 13)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 14)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 15)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 16)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 17)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 18)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 19)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 20)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 21)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 22)}/>
            <Time time={TimeUtils.getDatePlusHours(props.day, 23)}/>
        </Col>
    )
}