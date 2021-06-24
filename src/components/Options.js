import React, {useEffect, useContext} from 'react'
import corrsfx from '../sound/corrsound.mp3'
import wrongsfx from '../sound/wrongsound.mp3'
import { playsfxContext } from './Mainmenu'
import $, { timers } from 'jquery'


 const Options = (props) => {


const corrsound = new Audio(corrsfx)
const wrongsound = new Audio(wrongsfx)
const picksound = useContext(playsfxContext)


useEffect(() => {


    if(props.cleartrigger){
        var i = 1;
        console.log("clearing")
        for(i ; i<5; i++){ //revert the style of all 4 options
        var resetel = document.getElementById(i);
        resetel.classList.remove("wrongans", "correctans");
       

        }

        props.setcleartrigger(false)

    }

    return () => {
      
    }
}, [props.cleartrigger])


const reducetime= (time) =>{
    

    let minute = Math.floor(time / 60);
    let second = time % 60;
    if (time <= 0){
        minute = 0
        second = 0
    }
    let formattedmin= minute.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    
      let formattedsec= second.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    props.settimer({mm: formattedmin, ss: formattedsec, secs: time})
    
}



 const chooseanswer= (answerid, e) =>{

    props.setanswercount(props.answercount + 1)

  //  console.log(props.setquizdata)

  if (props.quizdata.disablenext){
    

    if (props.quizdata.corrans === answerid){ //correct answer
        props.setdata({...props.quizdata, result: true, disablenext: false})
        props.setscore(props.score + 10) //addscore
        picksound(corrsound) //play correct sfx

                 
      
    }else{
        props.setdata({...props.quizdata, result: false, disablenext: false}) //wrong answer
        let newsecs = props.timer.secs - 5 
        reducetime(newsecs)
        var wrongel = document.getElementById(e.target.id);
        wrongel.classList.add("wrongans");
        picksound(wrongsound) //play wrong sfx
    }

    var correlement = document.getElementById(props.quizdata.corrans);
   // console.log("the correct ans is id: " + props.quizdata.corrans  )
    correlement.classList.add("correctans"); //show correct answer

  }

 }

 
    return (
        <React.Fragment>
            <div className="column">
            

            <div className= "row">
                <div className= 'col answers' id={props.optiondata[0].ansid} onClick= {(e)=> chooseanswer(props.optiondata[0].ansid, e)}> {props.optiondata[0].txt}</div>

                <div className='col answers' id={props.optiondata[1].ansid} onClick={(e)=> chooseanswer(props.optiondata[1].ansid, e)}> {props.optiondata[1].txt} </div>
                    
            </div>


            <div className= "row">
                <div className= 'col answers' id={props.optiondata[2].ansid} onClick={(e)=> chooseanswer(props.optiondata[2].ansid, e)}>{props.optiondata[2].txt} </div>

                <div className= 'col answers' id={props.optiondata[3].ansid} onClick={(e)=> chooseanswer(props.optiondata[3].ansid, e)}> {props.optiondata[3].txt}  </div>
                    
            </div>

            </div>
            
        </React.Fragment>
    )
}

export default Options