<?php
include_once ("usuariosClass.php");
class entrenadoresClass extends usuariosClass{
    public $idEntrenador;
    public $nivel;
    public $experiencia;

    public function getIdEntrenador()
    {
        return $this->idEntrenador;
    }
    public function getNivel()
    {
        return $this->nivel;
    }
    public function getExperiencia()
    {
        return $this->experiencia;
    }
    public function setIdEntrenador($idEntrenador)
    {
        $this->idEntrenador = $idEntrenador;
    }
    public function setNivel($nivel)
    {
        $this->nivel = $nivel;
    }
    public function setExperiencia($experiencia)
    {
        $this->experiencia = $experiencia;
    }

    
}