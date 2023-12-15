<?php
	include_once( "../model/usuariosModel.php" );
	
	session_start();
	$modeloUsuario = new usuariosModel();
	
	$id = $_SESSION[ 'id' ];
	$modeloUsuario->idUsuario = $id;

	if ($modeloUsuario->getById()) $response[ 'answer' ] = $modeloUsuario;
	else $response['answer'] = 'Error getting user info';
	
	$modeloUsuario->cleanOutput( $response['answer'] ); // Eliminar nulls
	
	echo json_encode( $response );
	
	unset ( $usuario );
