import React from 'react'

export function MonsterFact() {
    const [activeFact, setActiveFact] = React.useState("Loading monster fact...")

    React.useEffect(() => {
        async function generateMonsterFact() {
            const randomInt = Math.floor(Math.random() * 1000 % 35) + 1
            const response = await fetch(`https://mhw-db.com/monsters/${randomInt}`)
            console.log(response)
            const body = await response.json()
            setActiveFact(body.name + " - " + body.description)
        }

        generateMonsterFact()

        const interval = setInterval( () => {
            generateMonsterFact()
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    return (
        <p>{activeFact}</p>
    )
}