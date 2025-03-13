import React from "react";
import {Col, Row} from "react-bootstrap";
import {Time} from "./time";

export function Day(props) {

    return (
        <Col className="day">
            <Time time='0000' day={props.day}/>
            <Time time='0100' day={props.day}/>
            <Time time='0200' day={props.day}/>
            <Time time='0300' day={props.day}/>
            <Time time='0400' day={props.day}/>
            <Time time='0500' day={props.day}/>
            <Time time='0600' day={props.day}/>
            <Time time='0700' day={props.day}/>
            <Time time='0800' day={props.day}/>
            <Time time='0900' day={props.day}/>
            <Time time='1000' day={props.day}/>
            <Time time='1100' day={props.day}/>
            <Time time='1200' day={props.day}/>
            <Time time='1300' day={props.day}/>
            <Time time='1400' day={props.day}/>
            <Time time='1500' day={props.day}/>
            <Time time='1600' day={props.day}/>
            <Time time='1700' day={props.day}/>
            <Time time='1800' day={props.day}/>
            <Time time='1900' day={props.day}/>
            <Time time='2000' day={props.day}/>
            <Time time='2100' day={props.day}/>
            <Time time='2200' day={props.day}/>
            <Time time='2300' day={props.day}/>
        </Col>
    )
}