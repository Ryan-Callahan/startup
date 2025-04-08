import React from "react";
import {Container, Row} from "react-bootstrap";
import {Event} from "../event/event";

export function Time(props) {
    const hour = props.time.getUTCHours();
    const minutes = props.time.getUTCMinutes();
    const events = props.events

    function formattedHour() {
        return (hour > 12 ? hour - 12 : hour === 0 ? 12 : hour);
    }

    function formattedMinute() {
        return (minutes < 10 ? '0' + minutes : minutes);
    }

    function getSuffix() {
        return (hour < 12 ? 'AM' : 'PM');
    }

    function formattedTime() {
        return (formattedHour() + ":" + formattedMinute() + ' ' + getSuffix());
    }

    function getEvents() {
        const e = []
        if (events != null) {
            for (let i = 0; i < events.length; i++) {
                const event = events[i]
                console.log("Event Time: " + formattedTime() + "\nEvent: " + event) //TODO remove debug
                e.push(
                    <Event time={formattedTime()} date={props.time} eventID={event}/>
                )
            }
        }
        return <div className="event-window">{e}</div>
    }

    return (
        <Row className="time">
            <Container fluid style={{borderBottom: '2px dashed rgba(128, 128, 128, 0.50)'}}>
                <div className="content">
                    <Row style={{borderBottom: '1px dashed rgba(0, 0, 0, 0.30)'}}>
                        {formattedTime()}
                    </Row>
                    <Row>
                        {getEvents()}
                    </Row>
                </div>
            </Container>
        </Row>
    );
}