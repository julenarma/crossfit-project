<?php
include_once ('../model/comentariosModel.php');
include_once ('../model/usuariosModel.php');

session_start();
$id = $_SESSION['id'];

$modeloComentarios = new comentariosModel();
$modeloUsuario = new usuariosModel();

$modeloUsuario->setIdUsuario( $id );
$modeloUsuario->getById();

$modeloComentarios->setIdUsuario( $id );

$result['answer']['user'] = $modeloUsuario;
$result['answer']['comments'] = $modeloComentarios->getById();

echo json_encode( $result );