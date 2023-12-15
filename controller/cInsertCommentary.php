<?php

include_once( "../model/comentariosModel.php" );

$data = json_decode( file_get_contents( "php://input" ), true );

$modeloComentario = new comentariosModel();

$response = array();

$modeloComentario->setIdUsuario( $data[ 'idUsuario' ] );
$modeloComentario->setAsunto( $data[ 'asunto' ] );
$modeloComentario->setTexto( $data[ 'texto' ] );

$response[ 'answer' ] = $modeloComentario->insert();

echo json_encode( $response );

unset( $modeloComentario );