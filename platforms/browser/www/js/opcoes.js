$(function(){
	$("#txt-meta-padrao").val(obterMeta());
	$("#txt-loja").val(obterInicializacao("loja"));
	$("#sel-inicializacao").val(obterInicializacao("tipo"));
});

// Botão APLICAR da limpeza de dados
$("#btn-limpardados").click(function (e) {
	window.localStorage.clear();
	window.location.href = "logout.html";
});

// Botão APLICAR da configuração de meta de vendas padrão
$("#btn-metapadrao").click(function (e) {
	if($("#txt-meta-padrao").length <= 0) {
		toastError("Verifique se os campos estão preenchidos corretamente.");
	} else {
		guardarMeta($("#txt-meta-padrao").val());
		toastSuccess("Meta padrão definida com sucesso!");
	}
});

// Botão APLICAR da configuração de inicialização do sistema
$("#btn-inicializacao").click(function (e) {
	guardarInicializacao($("#txt-loja").val(), $("#sel-inicializacao").val());
	toastSuccess("Configuração aplicada com sucesso!");
});