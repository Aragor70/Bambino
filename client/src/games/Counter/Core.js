import React, { Fragment, useState } from 'react'


const Core = () => {
    const [play, setPlay] = useState(false)

    const [score, setScore] = useState(0)

    const [tasks, setTasks] = useState({
        quest: '',
        answer: ''
    })
    const handleChange = (e) => {
        
    }
    const [lvl, setLvl] = useState(1)

    const start = () => {
        var values = []
        for (let i = 0; values.length < 5; i++ ) {
            const x = generator(11)
            const y = generator(11)
            if( x + y <= 10 ) {
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

    console.log(tasks)
    return (
        <Fragment>
            <div className="count-wrapper">
                
                {
                    !play && <button type="button" onClick={e=> {setPlay(true), start()}}>start</button>
                }
                

                {
                    play && <Fragment>
                        <div className="task-list">
                        {
                            tasks.map(task => <Fragment>
                                <div className="task">{task.quest}
                                </div>

                            </Fragment>) 
                        }
                        
                        <input type="text" className="user-input" onChange={e => handleChange(e)} />
                        </div>
                    </Fragment>
                }
            </div>
        </Fragment>
    )
}
export default Core;