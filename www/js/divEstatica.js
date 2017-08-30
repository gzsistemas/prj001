function DivsPrincipais() {

    var storage = window.localStorage;

    toastr.remove();

    toastInfoNoHide("Carregando informações...");

    var status = getStatus();
    var ssl = getSSL();

    var URL = "";

    if(status == true){
  		var url = getUrlbase();
  		URL = url + "/services/flash_venda/total?token=" + gerarToken() + "&loja=" + getEmpresa() + "&data_inicial=" + getDataInicial() + "&data_final=" + getDataFinal();
  	} else{
  		var url = getUrlbase();
  		var protocolo = "http";
  		if(ssl == true){
  		 procotolo = protocolo + "s";
  		}
  		protocolo = protocolo + "://";
  		var URL = protocolo + url + "/services/flash_venda/total?token=" + gerarToken() + "&loja=" + getEmpresa() + "&data_inicial=" + getDataInicial() + "&data_final=" + getDataFinal();
  	}

  //console.log(URL);

    $.ajax({
        url: URL,
        data: { },
        success: function(resposta) {
            toastr.remove();

            var isOk = resposta.ok;

            if (isOk) {

                //------------------------------------------------------------
                // Inicializa as variáveis -----------------------------------
                //------------------------------------------------------------
                var valorVenda = resposta.extra.flash_venda_total.vendaTotal;
                var clientesAtendidos = resposta.extra.flash_venda_total.clientesAtendidos;
                var ticketMedio = resposta.extra.flash_venda_total.vendaMedia;
                // ------------------------------------------------------------
                /*
                if (valorVenda.toFixed(2) <= 0) {

                    toastError("Não existem dados na data informada.");
                    //------------------------------------------------------------
                    // Oculta as divs se estiverem exibidas ----------------------
                    //------------------------------------------------------------
                    document.getElementById("secao-estatisticas").style.display = 'none';
                    document.getElementById("secao-caixa").style.display = 'none';
                    document.getElementById("secao-pagamento").style.display = 'none';
                    // ------------------------------------------------------------

                } else {
                */
                    // ------------------------------------------------------------
                    // Carrega as divs de estatísticas ----------------------------
                    // ------------------------------------------------------------
                    $("#princ-valor-venda").text("R$ " + valorEmReais(valorVenda));
                    $("#princ-clientes-atendidos").text(clientesAtendidos);
                    $("#princ-ticket-medio").text("R$ " + valorEmReais(ticketMedio));
                    // ------------------------------------------------------------

                    // ------------------------------------------------------------
                    // Exibe as divs ocultadas ------------------------------------
                    // ------------------------------------------------------------
                    document.getElementById("secao-estatisticas").style.display = 'block';
                    // ------------------------------------------------------------

                    toastSuccess("Informações atualizadas!");
                //}
            } else {
                var mensagem = resposta.mensagem;
                toastError("Erro: " + mensagem);
            }
        },
        error: function(erro) {
            toastError("Não foi possível estabelecer conexão com o servidor!");
        }
    });
}
