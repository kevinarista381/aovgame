import React, {useEffect, useState} from 'react'

const Results = (props) => {


    const {score, timer, questionamount} = props
    const [grade, setgrade] = useState(0)
    const [time, settime] = useState({mm: '', ss: ''})

    const calculatetime= (time) =>{
        console.log(timer)
        let minute = Math.floor(time / 60);
        let second = time % 60;
        let formattedmin= minute.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })
        
          let formattedsec= second.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })
        settime({mm: formattedmin, ss: formattedsec})
        
    }

    const calculategrade = (maxscore) =>{
        return Math.floor(score / maxscore *100)
    }

    useEffect(() => {

        setgrade(calculategrade(questionamount *10))
        calculatetime(timer.maxtime - timer.secs)

    
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
            <h2>Time:</h2>
            </div>
            <div className="results-item">
            <h2>{time.mm} : {time.ss}</h2>
            </div>
                 
             </div>

            
        </div>
    )
}

export default Results
