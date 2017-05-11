/**
 *
 *  configs.js
 *
 * última atualização 10/05/2017
 */
 var conexaoSegura = false;

 $('.toggles').toggles({text:{on:'SIM', off:'NÃO'}});

 $('#tgl-conexao-segura').on('toggle', function(e, active) {
 	conexaoSegura = active;
 });
/*
  Definições das funções
 */
function onLoad() {
  var storage = window.localStorage;
  conexaoSegura = JSON.parse(storage.getItem("ConecSeg"));

  $('#tgl-conexao-segura').toggles({
		on: conexaoSegura
	});
}


function salvar() {
  var storage = window.localStorage;
  //alert(conexaoSegura);
  storage.setItem("ConecSeg", JSON.stringify(conexaoSegura));
  toastInfoNoHide("Configurações salvas!");
  window.location.replace("login.html");
}


/*
  Definições da funções que os botões irão chamar
 */
$("#btn-salvar").click(function (e) {
    salvar();
});

$("#btn-cancelar").click(function (e) {
    window.location.replace("login.html");
});
