//função para aceitar só números e ponto
function SomenteNumero(e){
	var tecla=(window.event)?event.keyCode:e.which;
	if((tecla>47 && tecla<58)) return true;
	else{
	if (tecla==8 || tecla==0 || tecla==46) return true;
	else  return false;
	}
   }

$(function () {
	$('.materialSelect').material_select();
	$('.materialSelect').on('contentChanged', function() {
    $(this).material_select();
  });
  // url web service dos estados
  var url_webService_uf = "http://www.geonames.org/childrenJSON?geonameId=3469034";

  /* Ajax consumindo o webservice e atualizando a lista de estados*/
  $.ajax({
    type: "POST",
    url: url_webService_uf,
    dataType: "json",
    success: function (data) {
      data.geonames.forEach(element => {
				var $newOpt = $("<option>").attr("value",element.toponymName).text(element.toponymName);
				$("#selectUFEdit").append($newOpt);
				$("#selectUFEdit").trigger('contentChanged');
				$newOpt = $("<option>").attr("value",element.toponymName).text(element.toponymName);
				$("#selectUF").append($newOpt);
				$("#selectUF").trigger('contentChanged');
				
        
      });
    }
  });
  
});


$(document).ready(function() {
	$('.modal').modal();
	$('#tabela').empty();
	$.ajax({
		type:'post',		
		dataType: 'json',	
		url: '../Controller/getInscritos.php',
		success: function(dados){
			for(var i=0;dados.length>i;i++){
				//Adicionando registros retornados na tabela
				$('#tabela').append('<tr><td>'+dados[i].NOME+'</td><td>'+dados[i].DATANASC+'</td><td>'+dados[i].CPF+'</td><td>'+dados[i].PESO+' Kg'+'</td>><td>'+dados[i].UF+
				'</td><td><a class="edita  waves-teal waves-effect btn-flat modal-trigger" cod='+i+
				' href="#modal1"><i class="material-icons left">edit</i>Editar</a></td><td><a class="deleta  waves-red waves-effect btn-flat modal-trigger" cod='+i+
				' href="#modal2"><i class="material-icons left">delete</i>Excluir</a></td></tr>');
				$(document).on("click", ".edita", function () {
					var index = $(this).attr("cod");
					$('#form-edita-registro')[0].reset();
					$('#inputNomeEdit').val(dados[index].NOME);
					$('#idInscrito').val(dados[index].idINSCRITO);
					$('#inputCpfEdit').val(dados[index].CPF);
					$('#inputDataNascEdit').val(dados[index].DATANASC);
					$('#inputPesoEdit').val(dados[index].PESO);
					$('#selectUFEdit').val(dados[index].UF);
					$("#selectUFEdit").trigger('contentChanged');
	
				});
				$(document).on("click", ".deleta", function () {
					$('#form-deleta-registro')[0].reset();
					var index2 = $(this).attr("cod");
					$('#idInscrito').val(dados[index2].idINSCRITO);
				});
			}
		}
	});
	//envio editar registro
	$(document).on("submit", "#form-edita-registro", function (event) {
		campoNome = 	$('#inputNomeEdit').val();
		campoIdInscrito = 	$('#idInscrito').val();
		campoNascimento = $('#inputDataNascEdit').val();
		campoUf = $('#selectUFEdit').val();
		campoPeso = $('#inputPesoEdit').val();

		$.ajax({
			type: "POST",
			url: '../Controller/editarInscrito.php',
			data: { 	
				'nome' : campoNome,
				'idInscrito':campoIdInscrito,
				'nascimento' : campoNascimento,
				'uf' : campoUf,
				'peso' : campoPeso
			},
			dataType: "json",

			success: function(result) {
				window.location.href = "../View/index.html";
			},
			error:function(error){
				if ( error.responseText.trim() == "erro")
				{
					Materialize.toast('Erro não foi possível editar o registro.', 1500, 'rounded red');
				}
			}
		});
});
//envio para deletar registro
$(document).on("submit", "#form-deleta-registro", function (event) {
	campoIdInscrito = 	$('#idInscrito').val();
	$.ajax({
		type: "POST",
		url: '../Controller/deleteInscrito.php',
		data: { 	
			'idInscrito':campoIdInscrito
		},
		dataType: "json",

		success: function(result) {
			window.location.href = "../View/index.html";
		},
		error:function(error){
			if ( error.responseText.trim() == "erro")
			{
				Materialize.toast('Não foi possível deletar o registro!', 1500, 'rounded red');
			}
		}
	});
});



	//mascara para cpf e data
	$('#cpf').mask('000.000.000-00', {reverse: true});
	$('.datepicker').mask('00/00/0000');

	$('.datepicker').pickadate({
	  selectMonths: true,
	  selectYears: 100,
	  today: false,
	  clear: "Limpar",
	  max: "31/12/2017",
	  close: "Fechar",
	  closeOnSelect: false,
	  monthsFull: [
		'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
		'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro' , 'Dezembro'
	  ],
	  monthsShort: [
		'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
		'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
	  ],
	  weekdaysFull: [
		'Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira',
		'Quinta-Feira', 'Sexta-Feira', 'Sabado'
	  ],
	  weekdaysShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
	  weekdaysLetter: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
	  format: 'dd/mm/yyyy'
	});
$('select').material_select();


//cadastro de novo registro
$("#cadastrar").click(function()
{	
	cpf = $("#cpf").val();
	data = $("#nascimento").val();

	var testevazio = true;
	if(!$("#nome").val() || !$("#cpf").val())
	{	
		Materialize.toast('Preencha os campos Obrigatórios!', 1500, 'rounded red');
		testevazio = false;
	}
    
    else if(cpf.length < 14){
    	testevazio = false;
    	Materialize.toast('CPF inválido!', 1500, 'rounded red');
    }

	var campoNome = $("#nome").val();
	var campoCpf = $("#cpf").val();
	var campoNascimento = $("#nascimento").val();
	var campoUf = $("#selectUF").val();
	var campoPeso = $("#peso").val();

	if(testevazio == true){
	  $.ajax({
	      url: "../Controller/Inscricao.php",
	      type: 'POST',
	      data: { 	
					'nome' : campoNome,
					'cpf' : campoCpf,
					'nascimento' : campoNascimento,
					'uf' : campoUf,
					'peso' : campoPeso
				},

	      success: function(result) {
						window.location.href = "../View/index.html";
	        },
	        error:function(error){
				if ( error.responseText.trim() == "cpf")
				{
					Materialize.toast('CPF inválido, ou já cadastro!', 1500, 'rounded red');
				}
	      
	    	}
	        
	  	});
	}
		return false;
	});
});
