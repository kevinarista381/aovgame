<?php
header('Access-Control-Allow-Origin: *');
$server = "localhost";
$uname  = "root";
$dbname = "aovquiz";


if (isset($_POST['diff'])){

$conn = new mysqli($server, $uname, "", $dbname);

if($conn-> connect_error){
    die("Connection failed: " . $conn->connect_error);
}

$query = "select * from quizzes where difficulty = ?";

$stmt = $conn->prepare($query);

$stmt->bind_param("i", $_POST['diff']);

$stmt->execute();

$results = $stmt->get_result(); 

if($results->num_rows > 0){

    while($rows = mysqli_fetch_assoc($results)){
        $jsonarr[] = $rows;
    }

   echo json_encode($jsonarr);

}else{
    echo "404";
}


$conn->close();


}




?>