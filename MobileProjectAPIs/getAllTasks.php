<?php

require_once("connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type");
    
$input = json_decode(file_get_contents("php://input"));
$project_id = $input-> project_id;

$query = "SELECT * FROM tasks WHERE project_id = ?;";
$mysql = $connection->prepare($query);
$mysql->bind_param("s",$project_id);
$mysql->execute();

$results = $mysql->get_result();

$response = [];
while($card = $results->fetch_assoc())
    $response[] = $card;

foreach($response as $index =>$res){

    $fromstringdate = strtotime( $res['due_date'] );
    $formatted_date = date('Y-m-d',$fromstringdate);

    $currentdate = date('Y-m-d');
    if($formatted_date < $currentdate && $res['completed'] ==0){
        $response[$index]['completed']=-1;
        setOverdue(-1,$res['id'],$connection);
    }

}


$json_tasks = json_encode($response);

echo $json_tasks;

function setOverdue($status,$taskID,$con){
    $query = "UPDATE tasks SET completed = ? WHERE id = ?";
    $mysql = $con->prepare($query);
    $mysql->bind_param("ss",$status,$taskID);
    $mysql->execute();

    return 0;

}

?>

