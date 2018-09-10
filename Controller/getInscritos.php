<?php
	include("./config.php");
	include("./InscritoDAO.php");
	include("../Model/Inscrito.php");

	$con = mysqli_connect($host, $user, $senha, $bd);
	$inscritoDAO = new InscritoDAO($con);

	$load = $inscritoDAO->load();
	while($resultado = mysqli_fetch_assoc($load)){
        $vetor[] = array_map('utf8_encode', $resultado);
    }
    echo json_encode($vetor);

?>