import React, { Component } from 'react'
import hayate from '../img/hayate.png'

export class Herophoto extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             heroid : 0
        }
    }

    

    render() {
        var photohere;
        if (this.props.id == 1){
            photohere = hayate;
         

        }


        return (
           <React.Fragment>
                 <img src= {photohere} className="banphoto"/>
           </React.Fragment>
              
                
        
        )
    }
}

export default Herophoto
