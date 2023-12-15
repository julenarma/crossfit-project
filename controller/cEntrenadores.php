<?php

include_once '../model/atletasModel.php';
include_once '../model/entrenadoresModel.php';

$data = json_decode( file_get_contents( "php://input" ), true );

$idEntrenador=$data['idEntrenador'];
$atleta= new atletasModel();
$entrenador= new entrenadoresModel();

$atleta->idEntrenador=$idEntrenador;
$entrenador->idEntrenador=$idEntrenador;
$response=array();

$response['list']=$atleta->atletasEntrenador();
$response['entrenador']=$entrenador->entrenador();
$response['error']="no error";

echo json_encode($response);



unset ($atleta);
