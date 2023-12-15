<?php
	
	class categoriasClass {
		public $idCategoria;
		public $nombre;
		public $edad;
		public $precio;
		
		public function getIdCategoria() {
			return $this->idCategoria;
		}
		
		public function getNombre() {
			return $this->nombre;
		}
		
		public function getEdad() {
			return $this->edad;
		}
		
		public function setIdCategoria( $idCategoria ) {
			$this->idCategoria = $idCategoria;
		}
		
		public function setNombre( $nombre ) {
			$this->nombre = $nombre;
		}
		
		public function setEdad( $edad ) {
			$this->edad = $edad;
		}
		
		public function getPrecio() {
			return $this->precio;
		}
		
		public function setPrecio( $precio ) {
			$this->precio = $precio;
		}
		
		
	}