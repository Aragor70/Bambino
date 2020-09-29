import React, { Fragment, useState, useRef } from 'react'


const Core = () => {

    const quest = useRef(null)
    const [play, setPlay] = useState(false)

    const [score, setScore] = useState(0)

    const [tasks, setTasks] = useState([{
        quest: '',
        answer: ''
    }])
    const [userAnswer, setUserAnswer] = useState('')

    const handleChange = (e) => {
        setUserAnswer(e.target.value)
    }
    const [lvl, setLvl] = useState(1)

    const start = (lvl) => {
        var values = []
        for (let i = 0; values.length < 5; i++ ) {
            const x = generator(lvl * 10 + 1)
            const y = generator(lvl * 10 + 1)
            if( x + y <= lvl * 10 ) {
                values.push({
                    quest: `${x} + ${y}`,
                    answer: x + y
                })
            }
        }
        return setTasks( values )
    }
    
    const generator = (max) => {
        return Math.floor(Math.random() * max)  
    }
    if(userAnswer && userAnswer == tasks[0].answer) {
        if(quest.current){
            quest.current.style.color = '#49c500'
            quest.current.style.fontWeight = 'bold'
        }
        setTimeout(() => {
            
            setUserAnswer('')
            
            setTasks(tasks.slice(1))
            setScore(score + 1)
            if(quest.current){
                quest.current.style.color = '#7f7f7f'
                quest.current.style.fontWeight = 'normal'
            }

        }, 500)
        console.log("correct")
        
        
    }
        
    if(play && tasks == false) {
        setLvl(lvl + 1)
        
        return start(lvl + 1)
            
    }
    
    

    return (
        <Fragment>
            <div className="count-wrapper">
                
                {
                    !play && <button type="button" className="countBtn" onClick={e=> {setPlay(true), start(lvl)}}>start</button>
                }
                
                {
                    play && <Fragment>
                        <div className="task-list">
                            
                                <div className="task" ref={quest}>{tasks[0].quest}</div>
                        
                        <input type="text" className="user-input" value={userAnswer} onChange={e => handleChange(e)} />
                        
                        </div>
                        
                <h1>level: {lvl}</h1>
                <h1>score: {score}</h1>
                    </Fragment>
                }
                
            </div>
        </Fragment>
    )
}
export default Core;