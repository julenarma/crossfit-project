<?php

include_once ("../model/atletasModel.php");

$atleta= new atletasModel();

$arr=array();

$idAtleta=filter_input( INPUT_POST, 'idAtleta' );
$fileBase64="";
$nameUpdate=filter_input(INPUT_POST, 'nameUpdate');
$surnameUpdate=filter_input(INPUT_POST, 'surnameUpdate');
$emailUpdate=filter_input(INPUT_POST, 'emailUpdate');
$ageUpdatet=filter_input(INPUT_POST, 'ageUpdate');
$categoryUpdate=filter_input(INPUT_POST, 'categoryUpdate');
$trainerUpdatet=filter_input(INPUT_POST, 'trainerUpdate');
//Para la foto:
$filename=filter_input(INPUT_POST, 'filename');
$savedFileBase64=filter_input(INPUT_POST, 'savedFileBase64');
$sexoUpdate=filter_input(INPUT_POST, 'sexoUpdate');

if( $savedFileBase64 != "" ){
    $fileBase64 = explode( ',', $savedFileBase64 )[ 1 ];
    $file = base64_decode( $fileBase64 );
    $writable_dir = '../uploads/';
    if ( !is_dir( $writable_dir ) ) {
        mkdir( $writable_dir );
    }
    file_put_contents( $writable_dir . $filename, $file, LOCK_EX );
}

$atleta->setIdAtleta($idAtleta);
$atleta->setNombre($nameUpdate);
$atleta->setApellido($surnameUpdate);
$atleta->setCorreo($emailUpdate);
$atleta->setEdad($ageUpdatet);
$atleta->setIdCategoria($categoryUpdate);
$atleta->setIdEntrenador($trainerUpdatet);
$atleta->setFoto($filename);
$atleta->setSexo($sexoUpdate);
$resultado=$atleta->update();


$arr['resultado']=$resultado;
$arr['fileBase64']=$fileBase64;

echo json_encode($arr);

unset ($atleta);
