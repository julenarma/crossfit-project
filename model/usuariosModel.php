<?php
	// Check if localhost development server
	if ( !defined( 'isLocal' ) ) define( 'isLocal', !( $_SERVER[ 'HTTP_HOST' ] == "grupo1.zerbitzaria.net" || $_SERVER[ 'HTTP_HOST' ] == "git.grupo1.zerbitzaria.net" ) );
	
	if ( isLocal ) {
		include_once( "connect_data.php" );
	} else include_once( "connect_data_remote.php" );
	
	include_once( "usuariosClass.php" );
	include_once( "categoriasModel.php" );
	
	class usuariosModel extends usuariosClass {
		private $link;
		public $objCategoria;
		
		public function getAll() {
			$this->OpenConnect();
			
			$sql = "call spListaUsuarios()";
			
			$list = array();
			
			$result = $this->link->query( $sql );
			
			while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$newUsu = new usuariosModel();
				$newUsu->idUsuario = $row[ 'idUsuario' ];
				$newUsu->nombre = $row[ 'nombre' ];
				$newUsu->apellido = $row[ 'apellido' ];
				$newUsu->usuario = $row[ 'usuario' ];
				$newUsu->password = $row[ 'password' ];
				$newUsu->admin = $row[ 'admin' ];
				$newUsu->idCategoria = $row[ 'idCategoria' ];
				
				$newCategoria = new categoriasModel();
				$newCategoria->idCategoria = $row[ 'idCategoria' ];
				$newCategoria->idCategoria();
				$newUsu->objCategoria = $newCategoria;
				
				array_push( $list, $newUsu );
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
			return ( $list );
		}
		
		public function getById() {
			$this->OpenConnect();
			
			$id = (int)$this->idUsuario;
			$sql = "CALL spFindUserById('$id')";
			
			$result = $this->link->query( $sql );
			
			$found = false;
			
			if ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				
				$this->setNombre( $row[ 'nombre' ] );
				$this->setApellido( $row[ 'apellido' ] );
				$this->setUsuario( $row[ 'usuario' ] );
				$this->setPassword( $row[ 'password' ] );
				$this->setAdmin( $row[ 'admin' ] );
				$this->setIdCategoria( $row[ 'idCategoria' ] );
				$this->setFoto( $row[ 'foto' ] );
				
				$found = true;
			}
			
			mysqli_free_result( $result );
			return $found;
		}
		
		public function verifyUser() {
			$this->OpenConnect();
			
			$username = $this->usuario;
			$password = $this->password;
			
			$sql = "CALL spFindUser('$username')";
			$result = $this->link->query( $sql );
			
			$found = null;
			
			if ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				if ( $password === $row[ 'password' ] ) {
					$this->setIdUsuario( $row[ 'idUsuario' ] );
					$this->setNombre( $row[ 'nombre' ] );
					$this->setApellido( $row[ 'apellido' ] );
					$this->setAdmin( $row[ 'admin' ] );
					$this->setIdCategoria( $row[ 'idCategoria' ] );
					
					$found = true;
				} else $found = false;
			}
			
			mysqli_free_result( $result );
			return $found;
		}
		
		function cleanOutput( &$array ) {
			$array = json_decode( json_encode( $array ), true );
			
			foreach ( $array as $key => &$value ) {
				if ( is_null( $value ) ) {
					unset( $array[ $key ] );
				} elseif ( is_array( $value ) ) {
					$this->cleanOutput( $value );
				}
			}
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
