import React, { Fragment } from 'react'


const Counting = () => {



    return (
        <Fragment>
            <div className="count-wrapper">
                <div className="task-board">
                    <div className="task">
                        task
                    </div>
                    <div className="answer">
                        answer
                    </div>
                </div>
                <div className="score-board">
                    score: 0
                </div>

            </div>
        </Fragment>
    )
}
export default Counting;