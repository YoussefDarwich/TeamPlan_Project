<?php

require_once("connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type");
    
$input = json_decode(file_get_contents("php://input"));
$project_id = $input-> project_id;

$query = "SELECT * FROM users WHERE username IN (SELECT username FROM works_in WHERE project_id = ?) OR username IN (SELECT admin_username FROM projects WHERE id = ?);";
$mysql = $connection->prepare($query);
$mysql->bind_param("ss",$project_id,$project_id);
$mysql->execute();

$results = $mysql->get_result();

$response = [];
while($card = $results->fetch_assoc())
    $response[] = $card;

$json_tasks = json_encode($response);
echo $json_tasks;

?>

