<?php
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');

$server = "localhost";
$uname  = "root";
$dbname = "aovquiz";


if (isset($_POST)){

$conn = new mysqli($server, $uname, "", $dbname);

if($conn-> connect_error){
    die("Connection failed: " . $conn->connect_error);
}

$query = "insert into quizzes(qid, question, corrans, difficulty, opt1, opt2, opt3, opt4, media) values(?, ? , ? , ? , ? , ? , ? , ?, ?)";

$stmt = $conn->prepare($query);

// if (isset($_POST['media']) && !empty($_POST['media'])) {
//     $safetext = "'" . mysql_real_escape_string($_POST['media']) . "'";
//  } else {
//     $safetext = 'null';
//  }

 $qid= 10;

$stmt->bind_param("isiisssss", $qid, $_POST['question'], $_POST['corrans'], $_POST['difficulty'], $_POST['opt1'], $_POST['opt2'], $_POST['opt3'], $_POST['opt4'], $safetext );


if($stmt->execute()){

    echo "200";

}else{
    echo $conn->error;
}


$conn->close();


}




?>