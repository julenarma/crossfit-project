<?php
class comentariosClass{
    public $idComentario;
    public $idUsuario;
    public $asunto;
    public $texto;

    public function getIdComentario()
    {
        return $this->idComentario;
    }
    public function getIdUsuario()
    {
        return $this->idUsuario;
    }
    public function getAsunto()
    {
        return $this->asunto;
    }
    public function getTexto()
    {
        return $this->texto;
    }
    public function setIdComentario($idComentario)
    {
        $this->idComentario = $idComentario;
    }
    public function setIdUsuario($idUsuario)
    {
        $this->idUsuario = $idUsuario;
    }
    public function setAsunto($asunto)
    {
        $this->asunto = $asunto;
    }
    public function setTexto($texto)
    {
        $this->texto = $texto;
    }


}