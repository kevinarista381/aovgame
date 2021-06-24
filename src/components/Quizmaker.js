import React, {useState} from 'react'
import $ from 'jquery'

export default function Quizmaker() {

const [newquiz, setnewquiz] = useState({corrans: 0, difficulty: 0})


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function errorcheck(){
    var q = $('#txtquestion').val();
    var o1 = $('#txtopt1').val();
    var o2 = $('#txtopt2').val();
    var o3 = $('#txtopt3').val();
    var o4 = $('#txtopt4').val();
    // const diffstatus = document.querySelectorAll('input[name="difficultyrad"]');
    // const corransstatus = document.querySelectorAll('input[name="corransrad"]');
    if(newquiz.corrans === 0 || newquiz.difficulty === 0 || q === "" || o1 === "" || o2 === "" || o3 === "" || o4 === ""){
        return false

    }

    return true
}

const handlesubmit = async (e)=> {
    e.preventDefault();

 if(errorcheck()){

    
   const file = document.querySelector('#myfile').files[0];
   var media= null

   if(file){
   const res = await toBase64(file);
   const encodedfile = res.split(",")
   media = encodedfile[1]
   console.log(encodedfile[1])
   }
    var q = $('#txtquestion').val();
    var o1 = $('#txtopt1').val();
    var o2 = $('#txtopt2').val();
    var o3 = $('#txtopt3').val();
    var o4 = $('#txtopt4').val();
    const newquizdata = {question: q, corrans: newquiz.corrans, difficulty: newquiz.difficulty, opt1: o1, opt2: o2, opt3: o3, opt4: o4, media: media}

 

console.log(newquizdata)
  await   $.ajax({
        method: "POST",
        url: "http://localhost/aov/aovgame/src/controllers/submitter.php",
        data: newquizdata,
        success: function (res) {
        if (res === "200"){
            window.alert("Quiz saved successfuly!")
            $('#myform').trigger("reset");
        } else{
            window.alert("Sorry, quiz save error.")
            console.log(res)
        }            

        }
    })


}else{
    window.alert("Please fill in all required fields.")
}


}


    return (
        <div className="container">
            <div><h1>QUIZ MAKER</h1></div>
            <p>Create your own AOV quiz here</p>
            <form id="myform">
                <div className="row">
                    <div className="col">Difficulty:</div>
                    <div className="col">
                        <div className="row">
                        <input type="radio" onClick={()=>setnewquiz({...newquiz, difficulty: 1})} name="difficultyrad" value="1"/>
                        <div>Apprentice</div>
                        </div>
                        <div className="row">
                        <input type="radio" onClick={()=>setnewquiz({...newquiz, difficulty: 2})} name="difficultyrad" value="2"/>
                        <div>Seasoned</div>
                        </div>
                        <div className="row">
                        <input type="radio" onClick={()=>setnewquiz({...newquiz, difficulty: 3})} name="difficultyrad" value="3"/>
                        <div>Legendary</div>
                        </div>
                    </div>

                </div>

                <div className="row">
                <div className="col">Question:</div>
                    <div className="col">
                        <div className="row">
                        <textarea name="txtquestion" id="txtquestion" rows="4" cols="50" placeholder="Type the question here"/>

                       </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col">Answer Options:</div>


                    <div className="col">

                    <div className="row formcomp">

                        <div className="column">

                    <div className="custom-control custom-radio">
                   
                    <input type="radio" onClick={()=> setnewquiz({...newquiz, corrans: 1})} className="custom-control-input" id="opt1" name="corransrad" value="1"/>
                    <label className="custom-control-label" for="opt1">Option 1:  <input type="text" id="txtopt1"/></label>
                    </div>
                    

                    <div className="custom-control custom-radio">
                    <input type="radio" onClick={()=> setnewquiz({...newquiz, corrans: 2})} className="custom-control-input" id="opt2" name="corransrad" value="2"/>
                    <label className="custom-control-label" for="opt2">Option 2:  <input type="text" id="txtopt2"/></label>
                    </div>

                    <div className="custom-control custom-radio">
                    <input type="radio" onClick={()=> setnewquiz({...newquiz, corrans: 3})} className="custom-control-input" id="opt3" name="corransrad" value="3"/>
                    <label className="custom-control-label" for="opt3">Option 3:  <input type="text" id="txtopt3"/></label>
                    </div>

                    <div className="custom-control custom-radio">
                    <input type="radio" onClick={()=> setnewquiz({...newquiz, corrans: 4})} className="custom-control-input" id="opt4" name="corransrad" value="4"/>
                    <label className="custom-control-label" for="opt4">Option 4:  <input type="text" id="txtopt4"/></label>
                    </div>

                        </div>
                        
                   

                   </div>                   

                </div>
                
                <div className="col corransdiv">
                   <div className="corransnotif"> {newquiz.corrans === 1 ?<b>Correct Answer.</b> : <div className="invisible">.</div> }</div>
                    <div className="corransnotif">{newquiz.corrans === 2 ?<b>Correct Answer.</b> : <div className="invisible">.</div> }</div>
                    <div className="corransnotif">{newquiz.corrans === 3 ?<b>Correct Answer.</b> : <div className="invisible">.</div> }</div>
                    <div className="corransnotif">{newquiz.corrans === 4 ?<b>Correct Answer.</b> : <div className="invisible">.</div> }</div>
                </div>

                


                  
                        
                 </div>   
                 <div className="row difficulties">*Choose one option to be the correct answer</div>

                 <div className = "row">
                     <div className= "col">
                     Media:
                     </div>

                     <div className="col">
                         <input type="file" id="myfile"/>

                     </div>

                 </div>
        

                
                <div className="row">
                  
                    <div className="difficulties">
                        <div className="row">
                        <div><button onClick= {(e) => handlesubmit(e)} className="btn btn-primary" name="submitbtn">Add Quiz</button></div>
                        </div>
                        <div className="row">
                        <button className="btn btn-secondary">Preview</button>
                        </div>
                    </div>

                </div>


               

            </form>
            
        </div>
    )
}
