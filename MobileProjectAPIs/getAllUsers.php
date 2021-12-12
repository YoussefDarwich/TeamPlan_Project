<?php

require_once("connection.php");

$query = "SELECT * FROM users;";
$stmt = $connection->prepare($query);
$stmt->execute();
$results = $stmt->get_result();

$temp_array = [];

while($row = $results->fetch_assoc()){
    $temp_array[] = $row;
}

$json_object = json_encode($temp_array);


?>