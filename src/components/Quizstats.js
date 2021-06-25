import React, {useEffect, useState, useContext} from 'react'

const Quizstats = (props) => {
    const {timer, settimer, timesuphandler} = props
    const [enablepanicmode, setenablepanicmode] = useState(true)
  


    const formattime= (time) =>{
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
        settimer({...timer, mm: formattedmin, ss: formattedsec, secs: time})
        
    }
    

    useEffect(() => {

      
        if(props.toggletimer){
        const interval = setInterval(() => {
        let newtime = timer.secs - 1  
        if(timer.secs <= 0){
            timesuphandler()
            clearInterval(interval)
        }else if(timer.secs <= 31 && enablepanicmode){
            setenablepanicmode(false)
            props.panicmode()
                      
        }  

        formattime(newtime)
        }
        , 1000);
        
        return () => {
            clearInterval(interval)
        }
    }
    }, [timer])

    return (
        <React.Fragment>
            <div className="col-md-4">
            <h2>Score: {props.score}</h2>
            </div>

            <div className="col-md-4">
             <h2>Time {timer.mm} : {timer.ss} </h2>
            </div>
        </React.Fragment>
    )
}

export default Quizstats
