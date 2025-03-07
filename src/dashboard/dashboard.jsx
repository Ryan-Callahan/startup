import React from 'react';
import Button from "react-bootstrap/Button";

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
            <div>
                <div>
                    <p>this is a placeholder for the main calendar display, which will rely heavily on CSS and
                        React.</p>
                    <img alt="calendar mockup" src="../../public/schedulizer_mockup.png" width="100%"/>
                </div>
                <div>
                    <p>this is a placeholder for the active live chat box.</p>
                </div>
            </div>

            {/*TODO TEMPORARY COMMENTED CODE*/}
            {/*<Button onClick={() => console.log(getEpochToMinute())}>epoch</Button>*/}
            {/*<Button onClick={() => console.log(getDateFromEpoch(getEpochToMinute()))}>date</Button>*/}

            <hr/>
        </main>
    );
}