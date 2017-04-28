/*
 * DECLARAÇÃO DE FUNÇÕES
 */
//function enderecoDefinido() {
//    return $("#txt-servidor").val();
//}
function pesquisar() {
    //if(!enderecoDefinido()) {
    //    toastWarning("Endereço do servidor não definido!");
    //    return;
    //}
    if(!$("#txt-loja").val() || parseInt($("#txt-loja").val()) < 1 || parseInt($("#txt-loja").val()) > 999 || !$("#txt-data-inicial").val() || !$("#txt-data-final").val()){
        toastError("Erro: Dados do filtro incorretos!!");
        return;
    }
    //setEnderecoServidor($("#txt-servidor").val());
    toastInfoNoHide("Aguarde... Atualizando informações.");
    $.ajax({
        url: "http://"+enderecoFormatado()+"/services/modulo/flash",
        data:{
            loja: $("#txt-loja").val(),
            dataInicial: $("#txt-data-inicial").val(),
            dataFinal: $("#txt-data-final").val()
        },
        success: function (resposta) {

            $.toast().reset("all");

            var isOk = resposta.ok;

            if(isOk) {    

                var dadosFlash = resposta.extra.DadosFlash;

                var valorVenda = dadosFlash.valorVenda;
                var clientesAtendidos = dadosFlash.clientesAtendidos;
                var ticketMedio = dadosFlash.ticketMedio;
                $(".princ-valor-venda").text("R$ "+valorVenda.toFixed(2));
                $(".princ-clientes-atendidos").text(clientesAtendidos);
                $(".princ-ticket-medio").text("R$ "+ticketMedio.toFixed(2));

                var caixas = $(dadosFlash.vendasCaixa);
                $("#tbody-tabela-caixas").find("tr").remove();
                caixas.each(function (i, obj) {
                    var cxCaixa = obj.caixa;
                    var cxValorVenda = "R$ "+obj.valorVenda.toFixed(2);
                    var cxClientesAtendidos = obj.clientesAtendidos;
                    var cxTicketMedio = "R$ "+obj.ticketMedio.toFixed(2);
                    var cxPercentual = obj.percentual.toFixed(2)+"%";
                    var tr = $("<tr>").append($("<td class='coluna-numero-caixa'>"));
                    tr.find(".coluna-numero-caixa").text(cxCaixa);
                    $(tr).append($("<td class='coluna-valor-venda'>"));
                    tr.find(".coluna-valor-venda").text(cxValorVenda);
                    $(tr).append($("<td class='coluna-clientes-atendidos'>"));
                    tr.find(".coluna-clientes-atendidos").text(cxClientesAtendidos);
                    $(tr).append($("<td class='coluna-ticket-medio'>"));
                    tr.find(".coluna-ticket-medio").text(cxTicketMedio);
                    $(tr).append($("<td class='coluna-percentual'>"));
                    tr.find(".coluna-percentual").text(cxPercentual);
                    $(tr).appendTo($("#tbody-tabela-caixas"));
                });

                var pagamentos = $(dadosFlash.vendasFormaPagamento);
                $("#tbody-tabela-forma-pagamento").find("tr").remove();
                pagamentos.each(function (i, obj) {
                    var pgDescricao = obj.descricao;
                    var pgValor = "R$ "+obj.valor.toFixed(2);
                    var tr = $("<tr>").append($("<td class='coluna-descricao'>"));
                    tr.find(".coluna-descricao").text(pgDescricao);
                    $(tr).append($("<td class='coluna-valor'>"));
                    tr.find(".coluna-valor").text(pgValor);
                    $(tr).appendTo($("#tbody-tabela-forma-pagamento"));
                });

                toastSuccess("Informações atualizadas!");

            }else{
                var mensagem = resposta.mensagem;
                toastError("Erro: "+mensagem);
            }
        },
        error: function (erro) {
            $.toast().reset("all");
            toastError("Não foi possível estabelecer conexão com o servidor!");
        }
    });
}
function onLoad() {
    var usuario = getUsuario();
    $("#txt-loja").val(usuario.loja);
    if(usuario.multiLoja != 'S'){
        $("#txt-loja").prop("disabled", true);
    }
    $("#txt-data-inicial" ).datepicker({dateFormat: 'dd/mm/yy'});
    $("#txt-data-final" ).datepicker({dateFormat: 'dd/mm/yy'});
    $("#txt-data-inicial" ).val($.datepicker.formatDate('dd/mm/yy', new Date()));
    $("#txt-data-final" ).val($.datepicker.formatDate('dd/mm/yy', new Date()));
    $("body").find(".secao-produto").remove(); // tirar a secao de produtos por enquanto
    $("#txt-servidor").text(enderecoFormatado());
    pesquisar();
}
/*
 * FIM DA DECLARAÇÃO DE FUNÇÕES
 */

/*
 * COMANDOS EXECUTADOS AO CARREGAR O SCRIPT
 */
$("#btn-pesquisar").click(function (e) {
    pesquisar();
});