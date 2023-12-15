<?php
	// Check if localhost development server
if ( !defined( 'isLocal' ) ) define( 'isLocal', !( $_SERVER[ 'HTTP_HOST' ] == "grupo1.zerbitzaria.net" || $_SERVER[ 'HTTP_HOST' ] == "git.grupo1.zerbitzaria.net" ) );
	
	if ( isLocal ) {
		include_once( "connect_data.php" );
	} else include_once( "connect_data_remote.php" );
	
	include_once( "atletasClass.php" );
	include_once( "entrenadoresModel.php" );
	include_once( "categoriasModel.php" );
	
	class atletasModel extends atletasClass {
		private $link;
		public $objEntrenador;
		public $objCategoria;
		
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
		
		public function atletas() {
			$this->OpenConnect();
			
			$sql = "call spListaAtletas()";
			
			$list = array();
			
			$result = $this->link->query( $sql );
			
			while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$newAtleta = new atletasModel();
				$newAtleta->idAtleta = $row[ 'idAtleta' ];
				$newAtleta->nombre = $row[ 'nombre' ];
				$newAtleta->apellido = $row[ 'apellido' ];
				$newAtleta->correo = $row[ 'correo' ];
				$newAtleta->foto = $row[ 'foto' ];
				$newAtleta->sexo = $row[ 'sexo' ];
				$newAtleta->edad = $row[ 'edad' ];
				$newAtleta->idEntrenador = $row[ 'idEntrenador' ];
				$newAtleta->idCategoria = $row[ 'idCategoria' ];
				
				$newCategoria = new categoriasModel();
				$newCategoria->idCategoria = $row[ 'idCategoria' ];
				$newCategoria->idCategoria();
				$newAtleta->objCategoria = $newCategoria;
				
				$newEntrenador = new entrenadoresModel();
				$newEntrenador->idEntrenador = $row[ 'idEntrenador' ];
				$newEntrenador->idEntrenador();
				$newAtleta->objEntrenador = $newEntrenador;
				
				array_push( $list, $newAtleta );
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
			return ( $list );
		}
		
		public function atletasCategoria() {
			
			$this->OpenConnect();
			
			$idCategoria = $this->idCategoria;
			
			$sql = "call spAtletasCategoria('$idCategoria')";
			
			$list = array();
			
			$result = $this->link->query( $sql );
			
			while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$newAtleta = new atletasModel();
				$newAtleta->idAtleta = $row[ 'idAtleta' ];
				$newAtleta->nombre = $row[ 'nombre' ];
				$newAtleta->apellido = $row[ 'apellido' ];
				$newAtleta->idEntrenador = $row[ 'idEntrenador' ];
				$newAtleta->idCategoria = $row[ 'idCategoria' ];
				
				$newEntrenador = new entrenadoresModel();
				$newEntrenador->idEntrenador = $row[ 'idEntrenador' ];
				$newEntrenador->idEntrenador();
				$newAtleta->objEntrenador = $newEntrenador;
				
				$newCategoria = new categoriasModel();
				$newCategoria->idCategoria = $row[ 'idCategoria' ];
				$newCategoria->idCategoria();
				$newAtleta->objCategoria = $newCategoria;
				
				array_push( $list, $newAtleta );
				
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
			return ( $list );
		}
		
		public function atletasEntrenador() {
			$this->OpenConnect();
			
			$idEntrenador = $this->idEntrenador;
			
			$sql = "call spAtletasEntrenador('$idEntrenador')";
			
			$list = array();
			
			$result = $this->link->query( $sql );
			
			while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$newAtleta = new atletasModel();
				$newAtleta->idAtleta = $row[ 'idAtleta' ];
				$newAtleta->nombre = $row[ 'nombre' ];
				$newAtleta->apellido = $row[ 'apellido' ];
				$newAtleta->foto = $row[ 'foto' ];
				array_push( $list, $newAtleta );
				
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
			return ( $list );
		}
		
		public function insert() {
			
			$this->OpenConnect();
			
			$nombreInsert = $this->getNombre();
			$apellidoInsert = $this->getApellido();
			$correoInsert = $this->getCorreo();
			$idEntrenadorInsert = $this->getIdEntrenador();
			$idCategoriaInsert = $this->getIdCategoria();
			$edadInsert = $this->getEdad();
			$fotoInsert = $this->getFoto();
			$sexoInsert = $this->getSexo();
			
			$sql = "CALL spInsert('$nombreInsert','$apellidoInsert','$correoInsert',$idEntrenadorInsert,$idCategoriaInsert,$edadInsert,'$fotoInsert','$sexoInsert')";
			
			if ( $this->link->query( $sql ) ) {
				$returnString = "insertado.Num de inserts: " . $this->link->affected_rows;
				$this->CloseConnect();
				return $returnString;
				
			} else {
				$this->CloseConnect();
				return $sql . "Error al insertar";
			}
			
		}
		
		public function delete() {
			
			$this->OpenConnect();
			
			$id = $this->idUsuario;
			$sql = "CALL spDelete($id)";
			
			if ( $this->link->query( $sql ) ) {
				$returnString = "borrado.Num de deletes: " . $this->link->affected_rows;
				$this->CloseConnect();
				return $returnString;
			} else {
				$this->CloseConnect();
				return "Error al borrar";
			}
		}
		
		public function update() {
			
		    $this->OpenConnect();
		    
		    $idAtleta = $this->getIdAtleta();
		    $nombreUpdate = $this->getNombre();
		    $apellidoUpdate = $this->getApellido();
		    $correoUpdate = $this->getCorreo();
		    $idEntrenadorUpdate = $this->getIdEntrenador();
		    $idCategoriaUpdate = $this->getIdCategoria();
		    $edadUpdate = $this->getEdad();
		    $fotoUpdate = $this->getFoto();
		    $sexoUpdate = $this->getSexo();
		    
		    $sql = "CALL spUpdate($idAtleta,'$nombreUpdate','$apellidoUpdate',$idCategoriaUpdate,'$correoUpdate','$fotoUpdate','$sexoUpdate',$edadUpdate,$idEntrenadorUpdate)";
		    
		    if ( $this->link->query( $sql ) ) {
		        $returnString = "Actualizado: " . $this->link->affected_rows;
		        $this->CloseConnect();
		        return $returnString;
		    } else {
		        $this->CloseConnect();
		        return $sql . "Error al Modificar";
		    }
		}
	}
