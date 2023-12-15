<?php

	include_once '../model/categoriasModel.php';
	
	$data = json_decode( file_get_contents( "php://input" ), true );
	
	$idCategoria = $data[ 'idCategoria' ];
	$modeloCategoria = new categoriasModel();
	
	$modeloCategoria->idCategoria = $idCategoria;
	
	$response = array();
	
	if( $modeloCategoria->idCategoria() ) $response[ 'answer' ] = $modeloCategoria;
	else $response[ 'answer' ] = 'Category not found!';
	
	echo json_encode( $response );
	
	unset ( $modeloCategoria );