<?php
	include("./config.php");
	include("./InscritoDAO.php");
	include("../Model/Inscrito.php");

	function response($body,$code){
		http_response_code($code);
		echo $body;
		exit();
	}

	function valCpf($cpf){
		$cpf = preg_replace('/[^0-9]/','',$cpf);
		$digitoA = 0;
		$digitoB = 0;
		for($i = 0, $x = 10; $i <= 8; $i++, $x--){
			$digitoA += $cpf[$i] * $x;
		}
		for($i = 0, $x = 11; $i <= 9; $i++, $x--){
			if(str_repeat($i, 11) == $cpf){
				return false;
			}
			$digitoB += $cpf[$i] * $x;
		}
		$somaA = (($digitoA%11) < 2 ) ? 0 : 11-($digitoA%11);
		$somaB = (($digitoB%11) < 2 ) ? 0 : 11-($digitoB%11);
		if($somaA != $cpf[9] || $somaB != $cpf[10]){
			return false;	
		}else{
			return true;
		}
	}


	$inscrito = new Inscrito($_POST["nome"],$_POST["cpf"], $_POST["nascimento"],$_POST["uf"], $_POST["peso"]);
	
	$con = mysqli_connect($host, $user, $senha, $bd);
	$inscritoDAO = new InscritoDAO($con);

	$loadCpf = $inscritoDAO->load("CPF","where CPF = '".$inscrito->getCpf()."'");
	$testeCpf = mysqli_fetch_array($loadCpf);
	if($testeCpf > 0){
		response("cpf",400);
	}
	if(!valCpf($_POST['cpf'])){
		response("cpf",400);
  } 

	else{
		$fields = "NOME,CPF,DATANASC,UF,PESO";
		
		$params = ("'".$inscrito->getNome()."','".$inscrito->getCpf()."','".$inscrito->getNascimento()."','".$inscrito->getUf()."','".$inscrito->getPeso()."'");
		$insert = $inscritoDAO->insert($fields,$params);
		
		if($insert){
			response("OK",200);
		}else{
			response("cpf",400);
		}
	}
?>