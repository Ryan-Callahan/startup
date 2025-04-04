import React from 'react';
import Popup from "reactjs-popup";
import {Card, Container, Row} from "react-bootstrap";

export function Event(props) {
    const event = JSON.parse('{"EventID": 1, "name": "Ryans appointment", "description": "the appointed hour shall arrive"}');

    function getEventCard() {
        return (
            <Card>
                {event.name}
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
        >
            <Container>
                <Row>
                    {event.name}
                </Row>
                <Row>
                    {event.description}
                </Row>
            </Container>
        </Popup>
    )
}