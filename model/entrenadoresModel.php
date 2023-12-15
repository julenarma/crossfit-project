<?php
	// Check if localhost development server
if ( !defined( 'isLocal' ) ) define( 'isLocal', !( $_SERVER[ 'HTTP_HOST' ] == "grupo1.zerbitzaria.net" || $_SERVER[ 'HTTP_HOST' ] == "git.grupo1.zerbitzaria.net" ) );
	
	if ( isLocal ) {
		include_once( "connect_data.php" );
	} else include_once( "connect_data_remote.php" );
	
	include_once( "entrenadoresClass.php" );
	
	class entrenadoresModel extends entrenadoresClass {
		private $link;
		
		public function entrenadores() {
			$this->OpenConnect();
			
			$sql = "call spListaEntrenadores()";
			
			$list = array();
			
			$result = $this->link->query( $sql );
			
			while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$newEntrenador = new entrenadoresModel();
				$newEntrenador->idEntrenador = $row[ '$idEntrenador' ];
				$newEntrenador->nivel = $row[ '$nivel' ];
				$newEntrenador->experiencia = $row[ '$experiencia' ];
				
				array_push( $list, $newEntrenador );
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
			return $list;
		}
		
		public function entrenador() {
			$this->OpenConnect();
			$idEntrenador = $this->idEntrenador;
			$list = array();
			$sql = "call spIdEntrenadores($idEntrenador)";
			$result = $this->link->query( $sql );
			if ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$newEntr = new entrenadoresModel();
				$newEntr->idEntrenador = $row[ 'idEntrenador' ];
				$newEntr->nombre = $row[ 'nombre' ];
				$newEntr->apellido = $row[ 'apellido' ];
				$newEntr->nivel = $row[ 'nivel' ];
				$newEntr->experiencia = $row[ 'experiencia' ];
				array_push( $list, $newEntr );
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
			return ( $list );
		}
		
		public function idEntrenador() {
			$this->OpenConnect();
			$idEntrenador = $this->getIdEntrenador();
			
			$sql = "call spIdEntrenadores($idEntrenador)";
			
			$result = $this->link->query( $sql );
			if ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				
				$this->setNombre( $row[ 'nombre' ] );
				$this->setNivel( $row[ 'nivel' ] );
				$this->setExperiencia( $row[ 'experiencia' ] );
			}
			
			mysqli_free_result( $result );
			$this->CloseConnect();
		}
		public function getSelect() {
		    $this->OpenConnect();
		    $idCategoria = $this->idCategoria;
		    $list = array();
		    $sql = "call spSelectEntrenadores('$idCategoria')";
		    $result = $this->link->query( $sql );
		    while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
		        $newEntr = new entrenadoresModel();
		        $newEntr->idEntrenador = $row[ 'idEntrenador' ];
		        $newEntr->nombre = $row[ 'nombre' ];
		        $newEntr->apellido = $row[ 'apellido' ];
		        $newEntr->nivel = $row[ 'nivel' ];
		        array_push( $list, $newEntr );
		    }
		    mysqli_free_result( $result );
		    $this->CloseConnect();
		    return ( $list );
		}
		public function OpenConnect() {
			$konDat = null;
			
			if ( isLocal ) {
				$konDat = new connect_data();
			} else $konDat = new connect_data_remote();
			
			try {
				$this->link = new mysqli( $konDat->host, $konDat->userbbdd, $konDat->passbbdd, $konDat->ddbbname );
			} catch ( Exception $e ) {
				echo $e->getMessage();
			}
			$this->link->set_charset( "utf8" );
		}
		
		public function CloseConnect() {
			mysqli_close( $this->link );
			
		}
	}
