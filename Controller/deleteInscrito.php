<?php
	include("./config.php");
	include("./InscritoDAO.php");

    function response($body,$code){
		http_response_code($code);
		echo $body;
		exit();
	}


	$con = mysqli_connect($host, $user, $senha, $bd);
	$inscritoDAO = new InscritoDAO($con);
    $where = "idINSCRITO =".$_POST["idInscrito"];
    $delete = $inscritoDAO->delete($where);

    if($delete){
        response("OK",200);
    }else{
        response("erro",400);
    }
?>