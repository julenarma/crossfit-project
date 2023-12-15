<?php
	include_once( "usuariosClass.php" );
	
	class atletasClass extends usuariosClass {
		public $idAtleta;
		public $correo;
		public $sexo;
		public $edad;
		public $idEntrenador;
		
		public function getIdAtleta() {
			return $this->idAtleta;
		}
		
		public function getCorreo() {
			return $this->correo;
		}
		
		public function getSexo() {
			return $this->sexo;
		}
		
		public function getEdad() {
			return $this->edad;
		}
		
		public function getIdEntrenador() {
			return $this->idEntrenador;
		}
		
		public function setIdAtleta( $idAtleta ) {
			$this->idAtleta = $idAtleta;
		}
		
		public function setCorreo( $correo ) {
			$this->correo = $correo;
		}
		
		public function setSexo( $sexo ) {
			$this->sexo = $sexo;
		}
		
		public function setEdad( $edad ) {
			$this->edad = $edad;
		}
		
		public function setIdEntrenador( $idEntrenador ) {
			$this->idEntrenador = $idEntrenador;
		}
		
	}