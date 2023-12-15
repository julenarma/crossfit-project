<?php
	
	include_once( '../model/usuariosModel.php' );
	
	$data = json_decode( file_get_contents( 'php://input' ), true );
	
	$username = $data[ 'username' ];
	$password = $data[ 'password' ];
	
	$modeloUsuario = new usuariosModel();
	
	$modeloUsuario->setUsuario( $username );
	$modeloUsuario->setPassword( $password );
	
	$verificationResult = $modeloUsuario->verifyUser();
	
	$response = array();
	
	if ( $verificationResult ) {
		$response[ 'answer' ] = $modeloUsuario;
		$modeloUsuario->cleanOutput( $response[ 'answer' ] );
		
		session_start();
		$_SESSION[ 'id' ] = $modeloUsuario->getIdUsuario();
		$_SESSION[ 'admin' ] = $modeloUsuario->getAdmin();
		
	} else {
		if ( $verificationResult === null ) $response[ 'answer' ] = 'User not found!';
		else $response[ 'answer' ] = 'Password incorrect!';
	}
	
	echo json_encode( $response );





