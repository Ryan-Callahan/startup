import React from 'react'

export function MonsterFact(props) {
    const facts = ["This is fact 1", "This is fact 2", "This is fact 3", "This is fact 4", "This is fact 5"]
    const [activeFact, setActiveFact] = React.useState(getNewFact())

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveFact(oldFact => getNewFact())
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    function getNewFact() {
        return facts[Math.floor(Math.random() * 1000 % 5)]
    }

    return (
        <p>{activeFact}</p>
    )
}