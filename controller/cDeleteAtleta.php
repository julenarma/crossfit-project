<?php

include_once ("../model/atletasModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$idUsuario=$data['idUsuario'];

$atleta= new atletasModel();
$atleta->idUsuario=$idUsuario;

$response=array();
$response['error']=$atleta->delete();

echo json_encode($response);

unset ($atleta);
