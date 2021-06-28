import React from 'react'
import {useEffect, useState, useContext} from 'react'
import Question from './Question'
import Options from './Options'
import axios from 'axios'
import buttonpress1 from '../sound/buttonpress1.mp3'
import {difficultyContext, playsfxContext, bgmtoolsContext} from './Mainmenu'
import panicmusic from '../sound/30secsleft.mp3'
import $, { parseJSON } from 'jquery'
import Quizstats from './Quizstats'
import Results from './Results'



const Quizpage = (props) => {



const buttonsfx = new Audio(buttonpress1)
const difficulty = useContext(difficultyContext)
const buttonpress = useContext(playsfxContext)
const bgmtools = useContext(bgmtoolsContext)

const [questionamount, setquestionamount] = useState(0)
const initoption = [{ansid: 1, txt:""}, {ansid: 2, txt:""}, {ansid: 3, txt:""}, {ansid: 4, txt:""}]
const [timer, settimer] = useState({mm: "", ss: "", secs : 0, maxtime: 0})


const [gamestarttoggle, setgamestarttoggle] = useState(false)
const [quizzes, setquizzes] = useState([])
const [notfound, setnotfound] = useState(false)
const [indexes, setindexes] = useState([])
const [toggletimer, settoggletimer] = useState(false)
const [timesup, settimesup] = useState(false)
const [answercount, setanswercount] = useState(0)
const [quizdone, setquizdone] = useState(false) 



const [cleartrigger, setcleartrigger] = useState(false)
const [media, setmedia] = useState(null)
const [score, setscore] = useState(0)
const [quizdata, setquizdata] = useState({qid: -1, qnumber: 1, corrans: 0, disablenext: true, result: false, question: ""})
const [optiondata, setoptiondata] = useState(initoption) 


const starthandler = () => {
    console.log(difficulty)
    switch(difficulty){
        case 1:
            settimer({...timer, secs: 80, maxtime: 80})
            break;
        case 2:
            settimer({...timer, secs: 60 , maxtime: 60})
            break;
        case 3:
            settimer({...timer, secs: 40, maxtime: 40 })
            break;
        default:
            window.alert("An error has occured.")
            settimer({...timer, secs: 0, maxtime: 0})

    }
    buttonpress(buttonsfx)
    bgmtools.changebgm(2, true)
    
    settoggletimer(true)
    setgamestarttoggle(true)
    // var quizcontainer = document.getElementById("quizcontainer");
    //     quizcontainer.classList.remove("quiz");
    //     quizcontainer.classList.add("quiz-ingame");

}

const triggerpanicmode = () =>{
    bgmtools.changeloop(false)
    bgmtools.changebgm(3, false)

}

const timesuphandler = () =>{
   settimesup(true)
    
}
                                               

function randomize() { //shuffling answer positions

    for (var i = optiondata.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = optiondata[i];
        optiondata[i] = optiondata[j];
        optiondata[j] = temp;
    }
    
    console.log("randomized")
    

}



function nextquestion(options){ //this only runs when the user clicked on Next
    var newnumber = quizdata.qnumber + 1
    
    setcleartrigger(true)
    renderquiz(quizzes, newnumber);

    
}

const assignquizzes = (newitems) => { //puts the data objects fetched from database to a special array state called quizzzes
    console.log(notfound)
    if (notfound) return 
  newitems.forEach((newitem, i) => {
     quizzes[i] = newitem      
  });

}

const loadquiz = async () => {  ///fetch all quiz data from database using post method. this runs only once
    console.log("once")
 
//         $.ajax({
//         method: 'post',
//         url: 'http://localhost/aov/aovgame/src/controllers/loader.php',
//         data: {diff: difficulty},
//         success: function(res){
            

//     if(res !== "404"){

//      var trueres = JSON.parse(res)
   
//      setquestionamount(trueres.length)
//      assignquizzes(trueres)
//      renderquiz(quizzes,  1)

//     }else{
//         setnotfound(true)
//     }
      
//         }
//     })


 const params = new URLSearchParams();
 params.append("diff", difficulty);
 try{
 const res = await axios({method: 'post', url: 'http://localhost/aov/aovgame/src/controllers/loader.php', data: params})
 let trueres = res.data // res.data is already a js object (rip json.parse), how convenient

 if(typeof trueres === "object"){
          
    //console.log(trueres)
  
    setquestionamount(trueres.length)
    assignquizzes(trueres)
    renderquiz(quizzes,  1)

   }else{
       throw("noquiz")
       
   }
 }catch(err){

    if(err === "noquiz"){
        setnotfound(true)
        return
    }
        
    switch(err.response.status){
        case 404:
            window.alert("No response from server")
            break;
        default:
            window.alert("An error has occured.")
        
    }
    
 

 }


}




function renderquiz(quizbook, newnumber){ //this function prepares the quiz, it assigns the question and answer, the options, and the question number
   

    if(indexes.length < quizbook.length){
    var idx = Math.floor(Math.random() * (quizbook.length)); //randomized question id

    while(indexes.includes(idx)){
        idx = Math.floor(Math.random() * (quizbook.length)) //make sure it picks a question that has not been asked before

    }
    indexes.push(idx) //push asked question index to a special array state called indexes
    console.log(`index: ${idx}`)

    var selectedquiz = quizbook[idx]
  
setmedia(selectedquiz.media)
setquizdata({...quizdata, qnumber: newnumber, disablenext:true, qid: selectedquiz.qid, corrans: selectedquiz.corrans, question: selectedquiz.question})
optiondata[0]= {ansid:1, txt: selectedquiz.opt1}
optiondata[1]= {ansid:2, txt: selectedquiz.opt2}
optiondata[2]= {ansid:3, txt: selectedquiz.opt3}
optiondata[3]= {ansid:4, txt: selectedquiz.opt4}  


randomize();
    }else{

        //All question answered
        console.log("quiz finished, no more questions")
        setquizdone(true)
        settoggletimer(false)
    }
}




useEffect(() => {
 loadquiz(); //load quiz from database upon page load, only happen once

}, [])

    return (
        <div>
        <div className="container">


{
    !quizdone?
    

    <div className={gamestarttoggle ? "quiz-ingame column" : "quiz column"} id="quizcontainer">
        
{
    timesup?

      <div className="downtocenter">
          <h1>Time's Up</h1>
          <br/>
          <h2>Last Score: {score}</h2>
          <br/>
          <h2>Questions Answered: {answercount} out of {questionamount}</h2>

     
     </div>
    :


    <React.Fragment>

            <div className="score row">
               
            {
                notfound || !gamestarttoggle?
                null
                :
                <Quizstats panicmode = {triggerpanicmode} 
                quizmusic = {props.quizmusic} 
                score = {score} 
                toggletimer = {toggletimer}
                timesuphandler = {timesuphandler}
                timer = {timer}
                settimer={settimer}
                  />
            
            }
         
              
          
             

            {            

                 quizdata.disablenext ?

                 null
                 :

             <div className="nextbutton col-md-4">
             <button onClick= {() => nextquestion(optiondata)} className="btn btn-primary" disabled={quizdata.disablenext}>NEXT QUESTION</button>
             </div>

             }

            </div>

               <div className="row-md-9 question">
                  
                 {

                     notfound?
                     
                     <div>No Quizzes Available yet for this difficulty/mode.</div>

                :

                   gamestarttoggle?
                <Question quizdata = {quizdata} media = {media}/>
                :
                  <div> 
            
                    <div>Difficulty: {difficulty == 1 ? "Apprentice" : difficulty == 2 ? "Seasoned" : "Legendary"} <br></br></div>
                    <div> Answer {questionamount} questions to complete the challenge. Good luck, challenger!</div>
             
                </div>

              
                 }
            
              </div>

             

                 {
                    
                    notfound ?
                null

                :
                     gamestarttoggle?
           
              <div className="row-md-3 options">
               <Options cleartrigger= {cleartrigger} setcleartrigger= {setcleartrigger} 
               setdata= {setquizdata} 
               score= {score}
               setscore= {setscore} 
               quizdata= {quizdata} 
               optiondata= {optiondata}
               setanswercount = {setanswercount}
               answercount = {answercount}
               timer = {timer}
               settimer = {settimer}
               />               
              </div>
                
                :

                <div className="row-md-3 options menubuttons">
               <button className="bluebtn" onClick= {() => starthandler() }>Begin</button> 
               </div>
                 }
            
    </React.Fragment>
             
}
            

             
    </div>

:
 <Results score= {score} timer= {timer} questionamount = {questionamount}/>
}

   
   

</div>







</div>
    
    )
}



export default Quizpage