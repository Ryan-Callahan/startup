import React from "react";
import {Col, Container, Row} from "react-bootstrap";

export function TimeCell(props) {
    const time = props.time;
    const day = props.day;
    const hour = Math.floor(time / 100);
    const minutes = time % 100;

    function formattedHour() {
        return (hour > 12 ? hour - 12 : hour);
    }

    function formattedMinute() {
        return (minutes < 10 ? '0' + minutes : minutes);
    }

    function formattedTime() {
        return (formattedHour() + ":" + formattedMinute());
    }

    return (
        <Col className="timeCell">
            <Container fluid>
                <Row style={{borderBottom: '1px dot-dash black'}}>
                    {formattedTime()}
                </Row>
                <Row>
                    sfrrg sgrsg rsgrsgg sgr sgr sgsr grsg rsgsg rsg rsg srg grs
                </Row>
            </Container>
        </Col>
    );
}