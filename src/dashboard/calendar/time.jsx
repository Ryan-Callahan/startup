import React from "react";
import {Card, Container, Row} from "react-bootstrap";
import {Event} from "../event/event";
import Popup from "reactjs-popup";

export function Time(props) {
    const hour = props.time.getUTCHours();
    const minutes = props.time.getUTCMinutes();
    const eventIDs = props.eventIDs

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

    function getOverflowingEvents(o) {
        return (
            <Popup
                trigger={
                    <div className="event-card-container overflow-card"><Card>...</Card></div>
                }
                position="bottom left"
                key={"Overflow-" + eventIDs}
            >{o}</Popup>
        )
    }

    function getEvents() {
        const e = []
        const o = []
        if (eventIDs != null) {
            for (let i = 0; i < eventIDs.length; i++) {
                let event = localStorage.getItem(eventIDs[i]);
                if (event != null) {
                    const eventElement = <Event key={"Event-" + eventIDs[i]} time={formattedTime()} date={props.time} event={JSON.parse(event)}/>;
                    (i < 2) ? e.push(eventElement) : o.push(eventElement);
                }
            }
        }
        if (o.length > 0) { e.push(getOverflowingEvents(o)) }
        return <div className="event-window">{e}</div>;
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