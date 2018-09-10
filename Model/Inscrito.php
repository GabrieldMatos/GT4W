<?php 
class Inscrito { 
    private $nome; 
	private $cpf ;
    private $nascimento;
    private $peso;
    private $uf;
    
    public function __construct($nome,$cpf,$nascimento,$uf,$peso) {
    	$this->nome = $nome;
        $this->cpf = $cpf;
        $this->peso = $peso;
        $this->nascimento = $nascimento;
        $this->uf = $uf;
   }

   public function getNome(){
        return $this->nome;
   }

   public function getCpf(){
        return $this->cpf;
   }

   public function getPeso(){
        return $this->peso;
   }

   public function getNascimento(){
        return $this->nascimento;
   }

   public function getUf(){
        return $this->uf;
    }

} 
?> 