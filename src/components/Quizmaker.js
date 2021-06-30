import React, {useState, useEffect} from 'react'
import axios from 'axios';
import $ from 'jquery'

export default function Quizmaker() {

const [newquiz, setnewquiz] = useState({corrans: 0, difficulty: 0})
const [imgsrc, setimgsrc] = useState("")
const [fileok, setfileok] = useState(true)


useEffect(() => {
    if(imgsrc !== ""){
    let el = document.getElementById("myimage")
    checkimagesize(el) 
    }   
    return () => {
      
    }
}, [imgsrc])

const checkimagesize= (img) =>{
let width = img.clientWidth
let height = img.clientHeight

if(width > 150 || height > 150){
    setfileok(false)
    setimgsrc("")
    window.alert("Image size too large. Please upload image below 150x150 px")
    return
    
}
setfileok(true)

}

const showimg = async (e) =>{
    let file = e.target.files[0]
    if(typeof file == "undefined") return

    let convertedfile = await toBase64(file)
    //console.log(convertedfile)
    let strsplit = convertedfile.split(",")
    setimgsrc(strsplit[1])
}


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function fieldcheck(){
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

if (!fileok){
    window.alert("Please choose another image file below 150 x 150 px or leave it empty by cancelling out after clicking 'Choose File'.")
    return
}

 if(fieldcheck()){

    
   const file = document.querySelector('#myfile').files[0];
   var media= null

   if(file){
   const res = await toBase64(file);
   const encodedfile = res.split(",")
   media = encodedfile[1]
   }
    var q = $('#txtquestion').val();
    var o1 = $('#txtopt1').val();
    var o2 = $('#txtopt2').val();
    var o3 = $('#txtopt3').val();
    var o4 = $('#txtopt4').val();
    const newquizdata = {question: q, corrans: newquiz.corrans, difficulty: newquiz.difficulty, opt1: o1, opt2: o2, opt3: o3, opt4: o4, media: media}
   
 

//console.log(newquizdata)

// const params = new URLSearchParams();  //use these if you want to send data to the submitter.php
// params.append("question", q);
// params.append("corrans", newquiz.corrans);
// params.append("difficulty", newquiz.difficulty);
// params.append("opt1", o1);
// params.append("opt2", o2);
// params.append("opt3", o3);
// params.append("opt4", o4);
// params.append("media", media);

try{

const res = await axios({
method: "POST",
url: "http://localhost:3001/savequiz",
data: newquizdata})  


 //console.log(res)

if (res.status == 200){
     window.alert("Quiz saved successfuly!")
     $('#myform').trigger("reset");
     return
 }
 throw(res.status)

}catch(err){
    if (err.status = 404){
        window.alert("Error connecting to the server. Please check your connection or the server might be offline.")
        return
    }
    switch(err){
        case 404:
            window.alert("Error connecting to the database. We'll fix it soon.")
            break;
        case 500:
            window.alert("An error occured on the server. We'll fix it soon.")
            break;
        default:
            window.alert("An error has occured. We'll fix it soon.")
            
    }
}


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
                         <input type="file" accept="image/*" id="myfile" onChange={showimg}/>
                         {
                             imgsrc==="" ?
                             null
                             :
                         <img src= {`data:image/png;base64,${imgsrc}`} id="myimage"/>
                         }

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
