import React from 'react'
import {useState, useEffect, useRef} from 'react'




const Settings = (props) => {



    const displaybgm = Math.floor(props.currvalue.bgm * 100)
    const displaysfx = Math.floor(props.currvalue.sfx * 100)
    



    function changebgmvolume(vol){
    let v = vol/100
    let d = displaysfx/100

    props.volchanger(v, d)
       

        

    }

    function changesfxvolume(vol){
  
        let v = vol/100
        let d = displaybgm/100
        props.volchanger(d,v)

    }

    return (
        <div>

<div className="container">     

<div><h1>Settings</h1></div>

 <div className="col optionsgroup centerize">

 <div className="row optionslabel">Music Volume: </div>
 <div className="row">
 <input type="range" id="vol" name="vol" min="0" max="100" value={props.currvalue.bgm *100} onChange={(e) => changebgmvolume(e.target.value)}/>
 <span>{displaybgm}</span>
 </div>
 </div>


 <div className="col optionsgroup centerize">

<div className="row optionslabel">Sound Effects Volume: </div>
<div className="row">
<input type="range" id="vol" name="vol" min="0" max="100" value={props.currvalue.sfx * 100} onChange={(e) => changesfxvolume(e.target.value)}/>
<span>{displaysfx}</span>
</div>
</div>


 <div className= "menubuttons">
<button className="bluebtn"  onClick={() => props.backtomenu()}>Back</button>
</div>

</div>















</div>
    )
}


export default Settings


