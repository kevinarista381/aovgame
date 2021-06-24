import React, {useEffect, useState} from 'react'

const Results = (props) => {


    const {score, timer, questionamount} = props
    const [grade, setgrade] = useState(0)
    const calculategrade = (maxscore) =>{
        return Math.floor(score / maxscore *100)
    }

    useEffect(() => {

        setgrade(calculategrade(questionamount *10))
    
        return () => {
            
        }
    }, [])

    return (
        <div className="results-stats">
            <div className="results-title">
                <h1>Challenge Completed</h1>
                <h2>Results</h2>
            </div>

            <div className= "results-container">
            <div className="results-item">
            <h2>Total Score:</h2>
            </div>
            <div className="results-item">
            <h2>{score}</h2>
            </div>
            </div>

            

             <div className=  "results-container">
             <div className="results-item">
            <h2>Time Left:</h2>
            </div>
            <div className="results-item">
            <h2>{timer.mm} : {timer.ss}</h2>
            </div>
                 
             </div>

            
        </div>
    )
}

export default Results
