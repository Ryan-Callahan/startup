import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {Calendar} from "./calendar";

export function Dashboard() {
    function getEpochToMinute() {
        const now = new Date().getTime();
        const roundToMinute = Math.floor(now / 60000) * 60000;
        return(roundToMinute);
    }

    function getDateFromEpoch(date) {
        const then = new Date(date);
        return (then);
    }

    return (
        <main>
            <Container>
                <Row>
                    <Col>
                        this is a placeholder for the main calendar display, which will rely heavily on CSS and React.
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                        <Calendar />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        this is a placeholder for the active live chat box.
                    </Col>
                    <Col></Col>
                </Row>
            </Container>

            {/*TODO TEMPORARY COMMENTED CODE*/}
            {/*<Button onClick={() => console.log(getEpochToMinute())}>epoch</Button>*/}
            {/*<Button onClick={() => console.log(getDateFromEpoch(getEpochToMinute()))}>date</Button>*/}

            <hr/>
        </main>
    );
}