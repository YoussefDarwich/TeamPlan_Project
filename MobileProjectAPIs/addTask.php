<?php
require_once("connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type");


$input = json_decode(file_get_contents("php://input"));
$project_id = $input->project_id;
$title = $input-> title;
$assigned_username = $input-> assigned_username;
$due_date = $input-> due_date;
$description = $input->description;


$query = "INSERT INTO tasks(project_id,title,assigned_username,description,due_date) VALUES(?,?,?,?,?);";
$mysql = $connection->prepare($query);
$mysql->bind_param("sssss",$project_id,$title,$assigned_username,$description,$due_date);
$mysql->execute();

$success_mes = "{'success_status' : success}";
$json_success = json_encode($success_mes);
echo $json_success;


?>