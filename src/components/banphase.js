import React, { Component } from 'react';
import bg from '../img/banphase.png';
import musicban from '../sound/banphase.mp3';
import yourban from '../sound/yourban.mp3';
import opponentban from '../sound/opponentban.mp3';
import bansfx from '../sound/bansfx.ogg';
import Herophoto from './herophoto';
import UIfx from 'uifx';



export class Banphase extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             selectedhero : 0
        }
    }
    

    componentDidMount (){
       
    
    const audioEl = document.getElementsByClassName("audio-element")[0];
    const yb = document.getElementsByClassName("your_ban")[0];

    audioEl.load();
    audioEl.play();
    audioEl.muted = false;

    yb.load();
    yb.play();
    yb.muted = false;

    }

    playsfx = () => {
        const sfx = document.getElementsByClassName("bansfx")[0];
        sfx.load();
        sfx.play();
        sfx.muted = false;

    }

    hoverhandler = () => {
        this.setState({
            selectedhero : 1
        })
        this.playsfx();


    }

    banhandler = () => {
        this.playsfx();
        const ob = document.getElementsByClassName("opponentban")[0];
        ob.load();
        ob.play();
        ob.muted = false;
        
        

    }
    

    render() {
 
        return (
            <div>
                <audio className="audio-element" src= {musicban} muted></audio>

        <audio className="your_ban" src= {yourban} muted> </audio>

        <audio className="bansfx" src= {bansfx} muted></audio>

        <audio className="opponentban" src= {opponentban} muted></audio>
               
               <img src= {bg} className="banbg"></img> 

               <div className= "column banui">
         <div className="row-md-6">
         <button onClick = {this.hoverhandler}>Hover Hayate</button>
         </div>
        

{
        this.state.selectedhero !== 0 ?
        <div className="row-md-6">
        <button onClick = {this.banhandler}>Ban</button>
        </div>
    :
    null

}

</div>
        {/* <button>Ban</button> */}
        <Herophoto id = {this.state.selectedhero}/>

        
                
            </div>
        )
    }
}

export default Banphase
