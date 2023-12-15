<?php
include_once( "../model/categoriasModel.php" );

$categoria = new categoriasModel();

$response = array();

$response[ 'list' ] = $categoria->categorias();

echo json_encode( $response );

unset ( $categoria );
