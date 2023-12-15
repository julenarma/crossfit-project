<?php
	
	class usuariosClass {
		public $idUsuario;
		public $nombre;
		public $apellido;
		public $usuario;
		public $password;
		public $admin;
		public $idCategoria;
		public $foto;
		
		public function getIdUsuario() {
			return $this->idUsuario;
		}
		
		public function getNombre() {
			return $this->nombre;
		}
		
		public function getApellido() {
			return $this->apellido;
		}
		
		public function getUsuario() {
			return $this->usuario;
		}
		
		public function getPassword() {
			return $this->password;
		}
		
		public function getAdmin() {
			return $this->admin;
		}
		
		public function getIdCategoria() {
			return $this->idCategoria;
		}
		
		public function setIdUsuario( $idUsuario ) {
			$this->idUsuario = $idUsuario;
		}
		
		public function setNombre( $nombre ) {
			$this->nombre = $nombre;
		}
		
		public function setApellido( $apellido ) {
			$this->apellido = $apellido;
		}
		
		public function setUsuario( $usuario ) {
			$this->usuario = $usuario;
		}
		
		public function setPassword( $password ) {
			$this->password = $password;
		}
		
		public function setAdmin( $admin ) {
			$this->admin = $admin;
		}
		
		public function setIdCategoria( $idCategoria ) {
			$this->idCategoria = $idCategoria;
		}
		
		public function getFoto() {
			return $this->foto;
		}
		
		public function setFoto( $foto ) {
			$this->foto = $foto;
		}
	}