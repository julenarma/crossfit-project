<?php
include_once ("../model/atletasModel.php");

$atleta = new atletasModel();

$response = array();

$response['list']=$atleta->atletas();
$response['error']="no error";

echo json_encode($response);

unset ($atleta);