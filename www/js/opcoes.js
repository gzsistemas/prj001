$(function() {
    carregaOpcoes();
});

function carregaOpcoes() {
    $("#txt-meta-local").val(obterMeta());
    $("#txt-loja").val(obterInicializacao("loja"));
    $("#sel-inicializacao").val(obterInicializacao("tipo"));
}

$("#txt-meta, #txt-loja, #txt-meta-local").keypress(function() {
    checarNegativo($("#txt-meta").val());
});

/*
// Botão APLICAR da limpeza de dados
*/
$("#btn-limpardados").click(function(e) {
    window.localStorage.clear();
    window.location.href = "logout.html";
});

/*
// Botão APLICAR da configuração de meta de vendas local
*/
$("#btn-metalocal").click(function(e) {
    guardarMeta($("#txt-meta-local").val()); // Salva meta local

    if (checarVazio($("#txt-meta-local").val())) { // Checa se a meta é zero
        toastInfo("Salvo meta local zero.");
    } else {
        toastSuccess("Meta local definida com sucesso!");
    }
});

/*
//  Botão APLICAR da configuração de inicialização do sistema
*/
$("#btn-inicializacao").click(function(e) {
    var val = false; // Define validação

    if ($("#sel-inicializacao").val() == "SIL") { // Se a inicialização for silenciosa, não precisa checar loja
        val = true;
    } else {
        if (checarVazio($("#txt-loja").val()) || checarVazio($("#sel-inicializacao"))) {
            toastError("Preencha os campos corretamente.");
            carregaOpcoes();
        } else {
            val = true;
        }
    }

    if (val == true) { // Se for válido, grava
        guardarInicializacao($("#txt-loja").val(), $("#sel-inicializacao").val());
        toastSuccess("Configuração aplicada com sucesso!");
    }
});