<?php
require_once("connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type");


$input = json_decode(file_get_contents("php://input"));
$username = $input-> username;
$password = $input-> password;

$query = "SELECT password FROM users WHERE username=?";
$mysql = $connection->prepare($query);
$mysql->bind_param("s",$username);
$mysql->execute();

$results = $mysql->get_result();

$response = $results->fetch_assoc();

$verif= (int)password_verify($password,$response['password']);
if($verif){
    $success_mes = array("success_status"=>'success');
    $json_success = json_encode($success_mes);
    echo $json_success;
}
else{
    $success_mes = array("success_status"=>'failed');
    $json_success = json_encode($success_mes);
    echo $json_success;
}




?>