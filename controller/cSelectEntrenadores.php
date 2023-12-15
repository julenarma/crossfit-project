<?php
include_once( "../model/entrenadoresModel.php" );

$data = json_decode( file_get_contents( "php://input" ), true );
$idCategoria = $data['idCategoria'];
$entrenador = new entrenadoresModel();
$response = array();
$entrenador->idCategoria=$idCategoria;

$response[ 'list' ] = $entrenador->getSelect();

echo json_encode( $response );

unset ( $entrenador );
