<?php
	// Check if localhost development server
	if ( !defined( 'isLocal' ) ) define( 'isLocal', !( $_SERVER[ 'HTTP_HOST' ] == "grupo1.zerbitzaria.net" || $_SERVER[ 'HTTP_HOST' ] == "git.grupo1.zerbitzaria.net" ) );
	
	if ( isLocal ) {
		include_once( "connect_data.php" );
	} else include_once( "connect_data_remote.php" );
	
	include_once( "categoriasClass.php" );
	
	class categoriasModel extends categoriasClass {
		private $link;
		
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
		
		public function categorias() {
			$this->OpenConnect();
			
			$sql = "call spListaCategorias()";
			
			$list = array();
			
			$result = $this->link->query( $sql );
			
			while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				
				$newCategoria = new categoriasModel();
				$newCategoria->idCategoria = $row[ 'idCategoria' ];
				$newCategoria->nombre = $row[ 'nombre' ];
				$newCategoria->edad = $row[ 'edad' ];
				$newCategoria->precio = $row[ 'precio' ];
				
				array_push( $list, $newCategoria );
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
			return $list;
		}
		
		public function idCategoria() {
			$this->OpenConnect();
			$idCategoria = $this->idCategoria;
			$sql = "CALL spIdCategorias('$idCategoria')";
			
			$result = $this->link->query( $sql );
			
			$found = false;
			
			if ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$this->nombre = $row[ 'nombre' ];
				$this->edad = $row[ 'edad' ];
				$this->precio = $row[ 'precio' ];
				
				$found = true;
			}
			
			mysqli_free_result( $result );
			$this->CloseConnect();
			return $found;
		}
		
	}
