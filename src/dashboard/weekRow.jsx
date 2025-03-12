import React from "react";
import {Row} from "react-bootstrap";
import {TimeCell} from "./timeCell";

export function WeekRow(props) {
    return (
        <Row className="weekRow">
            <TimeCell time={props.time} day='sunday'/>
            <TimeCell time={props.time} day='monday'/>
            <TimeCell time={props.time} day='tuesday'/>
            <TimeCell time={props.time} day='wednesday'/>
            <TimeCell time={props.time} day='thursday'/>
            <TimeCell time={props.time} day='friday'/>
            <TimeCell time={props.time} day='saturday'/>
        </Row>
    )
}