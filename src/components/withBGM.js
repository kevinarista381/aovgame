import { render } from '@testing-library/react'
import React from 'react'
import maintheme from '../sound/mainmenu.mp3'
import difftheme from '../sound/banphase.mp3'
import quizbgm from '../sound/pickphase.mp3'




const Enhancedcomponent = Originalcomponent =>{
    class Newcomponent extends React.Component{
        constructor(props) {
            super(props)

           
        }

    


        // changebgm = (id, loopable) =>{
            
        //     let currmusic = this.songs[this.state.bgmid].current
        //     currmusic.pause()
        //     let newmusic = this.songs[id].current
        //     this.setState({
        //         bgmid : id
        //     })
        //     if (!this.state.bgmmuted){ 
        //         newmusic.play()
        //         newmusic.loop = loopable
        //         newmusic.volume = this.state.musicvol
        //         console.log("playing music volume: " + this.state.musicvol)
        //     }

        // }

        // togglebgm = (bgmstatus) => {

        //     var music = this.songs[this.state.bgmid].current
            
        //     this.setState({
        //         bgmmuted : !bgmstatus

        //     })
            
        //     if (this.state.bgmmuted){ 
        //         music.play()
        //         music.volume = this.state.musicvol
        //         console.log("playing music volume: " + this.state.musicvol)
        //     }else{
        //         music.pause()
        //         console.log("pausing bgm")
        //     }
        
        // }



        // playsfx = (sfx, vol)=>{
        //     sfx.play()
        //     sfx.volume = vol
        // }
        

        render() {
            return (

            <Originalcomponent
            {...this.props} 
                 
            />
            
        
            )
        }
    }
    return Newcomponent
}

export default Enhancedcomponent

