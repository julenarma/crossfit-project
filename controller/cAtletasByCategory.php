<?php

include_once '../model/atletasModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$idCategoria=$data['idCategoria'];
$atleta= new atletasModel();

$atleta->idCategoria=$idCategoria;

$response=array();

$response['list']=$atleta->atletasCategoria();
$response['error']="no error";

echo json_encode($response);

unset ($atleta);