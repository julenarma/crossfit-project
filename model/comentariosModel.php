<?php
// Check if localhost development server
if ( !defined( 'isLocal' ) ) define( 'isLocal', !( $_SERVER[ 'HTTP_HOST' ] == "grupo1.zerbitzaria.net" || $_SERVER[ 'HTTP_HOST' ] == "git.grupo1.zerbitzaria.net" ) );

if( isLocal ) {
	include_once( "connect_data.php" );
} else include_once( "connect_data_remote.php" );

include_once( "comentariosClass.php" );

class comentariosModel extends comentariosClass {
	private $link;
	
	public function OpenConnect() {
		$konDat = null;
		
		if( isLocal ) {
			$konDat = new connect_data();
		} else $konDat = new connect_data_remote();
		
		try {
			$this->link = new mysqli( $konDat->host, $konDat->userbbdd, $konDat->passbbdd, $konDat->ddbbname );
		} catch( Exception $e ) {
			echo $e->getMessage();
		}
		$this->link->set_charset( "utf8" );
	}
	
	public function CloseConnect() {
		mysqli_close( $this->link );
		
	}
	
	public function comentarios() {
		$this->OpenConnect();
		
		$sql = "call spListaComentarios()";
		
		$list = array();
		
		$result = $this->link->query( $sql );
		
		while( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
			
			$new = new comentariosModel();
			$new->idComentario = $row[ 'idComentario' ];
			$new->idUsuario = $row[ 'idUsuario' ];
			$new->asunto = $row[ 'asunto' ];
			$new->texto = $row[ 'texto' ];
			
			array_push( $list, $new );
		}
		mysqli_free_result( $result );
		$this->CloseConnect();
		return $list;
	}
	
	public function getById() {
		$this->OpenConnect();
		
		$id = $this->getIdUsuario();
		
		$sql = "CALL spLoadCommentsById('$id')";
		$query = $this->link->query( $sql );
		
		$comentarios = array();
		
		while ( $row = mysqli_fetch_array( $query, MYSQLI_ASSOC ) ) {
			$comentario = new comentariosModel();
			
			$comentario->setIdComentario( $row['idComentario'] );
			$comentario->setIdUsuario( $row[ 'idUsuario' ] );
			$comentario->setAsunto( $row['asunto'] );
			$comentario->setTexto( $row['texto'] );
		
			array_push( $comentarios, $comentario );
		}
		
		mysqli_free_result( $query );
		$this->CloseConnect();
		return $comentarios;
	}
	
	public function insert() {
		$this->OpenConnect();
		
		$idUsuario = $this->getIdUsuario();
		$asunto = $this->getAsunto();
		$texto = $this->getTexto();
		
		$sql = "CALL  spInsertComment($idUsuario,'$asunto','$texto')";
		
		if( $this->link->query( $sql ) ) {
			$this->CloseConnect();
			return true;
			
		} else {
			$this->CloseConnect();
			return false;
		}
	}
	
}
