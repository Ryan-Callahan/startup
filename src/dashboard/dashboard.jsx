import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {Calendar} from "./calendar";

export function Dashboard() {

    function getActiveWeek() {
        return TimeUtils.getCurrentWeek();
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
                        <div style={{maxHeight: '80vh', overflow: 'auto', border: '3px solid black'}}>
                            <Calendar activeWeek={getActiveWeek()} />
                        </div>
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
            <Button onClick={() => console.log(getEpochToDay(getCurrentWeek()))}>epoch</Button>
            <Button onClick={() => console.log(getDateFromEpoch(getEpochToDay(getCurrentWeek())).toUTCString())}>date</Button>

            <hr/>
        </main>
    );
}