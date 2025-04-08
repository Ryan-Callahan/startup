import React from 'react';
import Popup from "reactjs-popup";
import {Card, Container, Row} from "react-bootstrap";
import TimeUtils from "../calendar/TimeUtils";

export function Event(props) {
    const event = JSON.parse(localStorage.getItem(props.eventID))

    function getEventCard() {
        return (
            <Card>
                {event["name"]}
            </Card>
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
            </Container>
        </Popup>
    )
}