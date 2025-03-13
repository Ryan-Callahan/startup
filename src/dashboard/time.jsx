import React from "react";
import {Col, Container, Row} from "react-bootstrap";

export function Time(props) {
    const time = props.time;
    const day = props.day;
    let hour = Math.floor(time / 100);
    const minutes = time % 100;

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
        return (formattedHour() + ":" + formattedMinute() + getSuffix());
    }

    return (
        <Row className="time">
            <Container fluid style={{borderBottom: '2px dashed rgba(128, 128, 128, 0.50)'}}>
                <div className="content">
                    <Row style={{borderBottom: '1px dashed rgba(0, 0, 0, 0.30)'}}>
                        {formattedTime()}
                    </Row>
                    <Row>
                        placeholder text for the events
                    </Row>
                </div>
            </Container>
        </Row>
    );
}