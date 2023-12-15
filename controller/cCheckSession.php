<?php
	include_once( '../model/usuariosModel.php' );
	
	session_start();
	$response=array();
	
	if ( isset( $_SESSION[ 'id' ] ) && isset( $_SESSION[ 'admin' ] ) ) {
		
		$modeloUsuario = new usuariosModel();
		$modeloUsuario->setIdUsuario( $_SESSION[ 'id' ] );
		$modeloUsuario->getById();
		
		$response[ 'answer' ] = $modeloUsuario;
		$modeloUsuario->cleanOutput( $response[ 'answer' ] );
	} else {
		$response[ 'answer' ] = 'There is no one logged in';
	}
	
	echo json_encode( $response );