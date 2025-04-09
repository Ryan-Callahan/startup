import React from 'react';
import Popup from "reactjs-popup";
import {Card, Container, Row} from "react-bootstrap";
import TimeUtils from "../calendar/TimeUtils";
import Button from "react-bootstrap/Button";
import {CreateEvent} from "./createEvent";

export function Event(props) {
    const event = props.event

    function deleteEvent() {
        console.log("event will be deleted when I have built a DAO that will actually delete events properly..... there is no way in heck I am doing that in javascript")
    }

    function getEventCard() {
        return (
            <div className="event-card-container">
                <Card>
                    {event["name"]}
                </Card>
            </div>
        )
    }

    return (
        <Popup
            trigger={
                getEventCard()
            }
            on="click"
            modal
            contentStyle={{width: "400px"}}
        >
            <Container>
                <Row style={{textDecoration: "underline", fontSize: "14pt"}}>
                    {event.name}
                </Row>
                <Row style={{opacity: "70%", fontSize: "9pt"}}>
                    {TimeUtils.getDateAsString(props.date)} {props.time}
                </Row>
                <Row style={{paddingTop: "5px"}}>
                    {event.description}
                </Row>
                <Button type="secondary" onClick={() => deleteEvent()}>Delete Event</Button>
            </Container>
        </Popup>
    )
}