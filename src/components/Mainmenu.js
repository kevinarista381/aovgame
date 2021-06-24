import React from 'react'
import Quizpage from './Quizpage'
import {useState, useEffect, useRef} from 'react'
import Quizmaker from './Quizmaker';
import titleimg from '../img/title.jpg'
import apprentice from '../img/ui/apprentice.png'
import seasoned from '../img/ui/seasoned.png'
import legendary from '../img/ui/legendary.png'
import logo from '../img/qovlogo.png'
import maintheme from '../sound/mainmenu.mp3'
import difftheme from '../sound/banphase.mp3'
import panicbgm from '../sound/30secsleft.mp3'
import buttonsfx1 from '../sound/buttonpress1.mp3'
import quizbgm from '../sound/pickphase.mp3'
import Settings from './Settings';


export const difficultyContext = React.createContext();
export const bgmtoolsContext = React.createContext();
export const playsfxContext = React.createContext();

const Mainmenu = (props) => {
    const [togglegame, settogglegame] = useState(0)
    const [difficulty, setdifficulty] = useState(0)
    const [bgmmuted, setbgmmuted] = useState(true)
    const [bgmid, setbgmid] = useState(0)
    const [musicvol, setmusicvol] = useState(0.5)
    const [sfxvol, setsfxvol] = useState(0.5)
    const [bgmloopable, setbgmloopable] = useState(true)
    const bgmref = useRef(null)
    const diffref = useRef(null)
    const quizbgmref = useRef(null)
    const panicbgmref = useRef(null)
    


  var buttonpress = new Audio(buttonsfx1)

   


    useEffect(() => {

var music = bgmref.current
   music.muted = false 
    music.pause()
        music.loop = bgmloopable
        return () => {
            music.pause()
            console.log("cleaning")
          


        }

    }, [])


        const changeloop= (status) =>{
            setbgmloopable(status)

        }

        const changebgm = (newid, loopable) =>{
            const songs = [bgmref.current, diffref.current, quizbgmref.current, panicbgmref.current] 
            let currmusic = songs[bgmid]
            currmusic.pause()
            let newmusic = songs[newid]
            setbgmid(newid)
            newmusic.play()
            newmusic.loop = loopable
      
            if (!bgmmuted){ 
                newmusic.volume = musicvol
                console.log("playing music volume: " + musicvol)
                return
            }
            newmusic.volume = 0
        }

    const playbuttonpress = (btn)=>{
        btn.play()
        btn.volume = sfxvol
    }


    function mainmenuclicked(id){
      
        playbuttonpress(buttonpress)
        

        if(id === 1){
       changebgm(1, true)
        }
 
        settogglegame(id)
    }



    function clickhandler(diff){
        playbuttonpress(buttonpress)
        //changebgm(2, true)
        setdifficulty(diff)
        settogglegame(1, true)
   

    }


    function togglebgm(bgmstatus){
        const songs = [bgmref.current, diffref.current, quizbgmref.current, panicbgmref.current]
        var music = songs[bgmid]
        
        setbgmmuted(!bgmstatus)
        if (bgmstatus){ 
          
            music.play()
            music.volume = musicvol
            music.loop = bgmloopable
            console.log("playing music volume: " + musicvol)
        }else{
            if(!bgmloopable){
                music.volume = 0
                console.log("just muted")
                }else{
                music.pause()
                console.log("paused")
                }
           
           
        }

    }


    const changevolume= (bgmvol, sfxvol) => {

        bgmref.current.volume = bgmvol
        setmusicvol(bgmvol)
        setsfxvol(sfxvol)
      
    }


    const backtomenu= ()=> {
        playbuttonpress(buttonpress)
        settogglegame(0)
    }

    return (
        <div>

<audio ref= {bgmref} autoPlay muted>
<source src={maintheme} type="audio/mpeg"/>
  Your browser does not support the audio tag.
</audio>

<audio ref = {diffref}>
<source src={difftheme} type="audio/mpeg"/>
  Your browser does not support the audio tag.
</audio>

<audio ref = {quizbgmref}>
<source src={quizbgm} type="audio/mpeg"/>
  Your browser does not support the audio tag.
</audio>

<audio ref = {panicbgmref}>
<source src={panicbgm} type="audio/mpeg"/>
  Your browser does not support the audio tag.
</audio>


           { 
           bgmmuted ?
           <div className="mutebtn" onClick= {() => togglebgm(bgmmuted)}>
              &#128263;
           </div>

            : 
            <div className="mutebtn" onClick= {() => togglebgm(bgmmuted)}>
           🔊
        </div>
           

          }

           
{
    togglegame === 0 ?
<img src={titleimg} className="titleimg centerfit"/>   
:
null         
}          
                    
         {
          togglegame === 1 ?

                difficulty === 0 ?

                

                <div className="container">
                <div className= "headingtxt">Select Difficulty</div>
                <div className= "row difficulties">
                    
                    <div className="diffbuttons" onClick={() => clickhandler(1)}>
                    <div> <img src={apprentice}/> </div>
                     <div className="normaltxt" >Apprentice</div>
                     </div>

                     <div className="diffbuttons" onClick={() => clickhandler(2)}>
                    <div> <img src={seasoned}/> </div>
                     <div className="normaltxt">Seasoned</div>
                     </div>

                     <div className="diffbuttons" onClick={() => clickhandler(3)}>
                    <div> <img src={legendary}/> </div>
                     <div className="normaltxt">Legendary</div>
                     </div>

            
                 </div>  

                </div>

                :
                <playsfxContext.Provider value = {playbuttonpress}>
                <difficultyContext.Provider value= {difficulty}>
                    <bgmtoolsContext.Provider value = {{bgmmuted: bgmmuted, changebgm : changebgm, changeloop: changeloop}}>
                    <Quizpage diffmusic = {diffref.current} quizmusic = {quizbgmref.current} setbgmid = {setbgmid} bgmmuted = {bgmmuted} musicvol = {musicvol}/>
                    </bgmtoolsContext.Provider>
                </difficultyContext.Provider>
                </playsfxContext.Provider>
                              
               
           :

           togglegame === 2 ?
           <Quizmaker/>


           :

           togglegame === 3 ?

        
           <Settings bgm = {bgmref} volchanger= {changevolume} backtomenu = {backtomenu} currvalue= {{bgm : musicvol, sfx: sfxvol }} />
          



           :
           <div>
               <div className="qovlogo"> 
               {/* SHOWING MAIN MENU */}
                   <img src={logo}/>

                </div>


                <div className= "column centerize downtocenter">

                   
                    <div className="row menubuttons">
                     <button className="goldbtn" onClick={() => mainmenuclicked(1)}>Start Game</button>
                     </div>

                     <div className="row menubuttons">
                     <button className="bluebtn"  onClick={() => mainmenuclicked(3)}>Settings</button>
                     </div>
                    
    
                     <div className="row menubuttons">
                     <button className="bluebtn"  onClick={() => mainmenuclicked(2)}>Admin</button>
                     </div>

                
                 </div>

        </div>              
             

           

}

            
        </div>
    
    )
}


export default Mainmenu