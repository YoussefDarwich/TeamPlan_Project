<?php
require_once("connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type");


$input = json_decode(file_get_contents("php://input"));
$task_id = $input->task_id;

$query = "DELETE FROM tasks WHERE id = ?";
$mysql = $connection->prepare($query);
$mysql->bind_param("s",$task_id);
$mysql->execute();

$success_mes = array("success_status"=>'success');
$json_success = json_encode($success_mes);
echo $json_success;

?>