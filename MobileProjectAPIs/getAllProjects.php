<?php

require_once("connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type");
    
$input = json_decode(file_get_contents("php://input"));
$username = $input-> username;

$query = "SELECT * FROM projects WHERE admin_username = ? OR (id IN (SELECT `project_id` FROM `works_in` WHERE `username` = ?));";
// $query = "SELECT `user_id` FROM `works_in`;";
$mysql = $connection->prepare($query);
$mysql->bind_param("ss",$username,$username);
$mysql->execute();

$results = $mysql->get_result();

$response = [];
while($card = $results->fetch_assoc())
    $response[] = $card;

$json_tasks = json_encode($response);
echo $json_tasks;

?>

