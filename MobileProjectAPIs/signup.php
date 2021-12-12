<?php
require_once("connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type");


$input = json_decode(file_get_contents("php://input"));
$username = $input->username;
$full_name = $input-> full_name;
$password = $input-> password;
$hashed_pass = password_hash($password,PASSWORD_DEFAULT);


$query = "INSERT INTO users(username,full_name,password) VALUES(?,?,?);";
$mysql = $connection->prepare($query);
$mysql->bind_param("sss",$username,$full_name,$hashed_pass);
$mysql->execute();

$success_mes = array("success_status"=>'success');
$json_success = json_encode($success_mes);
echo $json_success;


?>