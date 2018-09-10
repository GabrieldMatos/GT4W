<?php
	include("./config.php");
	include("./InscritoDAO.php");
	include("../Model/Inscrito.php");

	function response($body,$code){
		http_response_code($code);
		echo $body;
		exit();
    }
	$inscrito = new Inscrito($_POST["nome"],null,$_POST["nascimento"],$_POST["uf"], $_POST["peso"]);
	
	$con = mysqli_connect($host, $user, $senha, $bd);
    $inscritoDAO = new InscritoDAO($con);
    
    $where = "idINSCRITO =".$_POST["idInscrito"];
    $update = $inscritoDAO->update("PESO","'".$inscrito->getPeso()."'",$where);
    $update = $inscritoDAO->update("UF","'".$inscrito->getUf()."'",$where);
    $update = $inscritoDAO->update("NOME","'".$inscrito->getNome()."'",$where);
    $update = $inscritoDAO->update("DATANASC","'".$inscrito->getNascimento()."'",$where);
    
   
    
    
    if($update){
        response("OK",200);
    }else{
        response("cpf",400);
    }
?>