import React from 'react'

const Question = (props) => {
    return (
        <React.Fragment>
            
    { props.media === null ?
    
    null
    :

    <div className="row centerize quizmedia">
        <img src={"data:image/png;base64, "+ props.media}/>
    </div>
}
    <div className = "row">
    <div className="col-md-1"><h2>{props.quizdata.qnumber}.</h2>  </div>
    <div className= "questiontxt col-md-11">
              <h3>{props.quizdata.question} </h3>  
    </div>

    </div>
   
                
            
            
        </React.Fragment>
    )
}

export default Question
