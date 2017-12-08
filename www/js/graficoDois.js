var vpagamentos = [];

function graficoDois() {

    var storage = window.localStorage;

    toastr.remove();

    toastInfoNoHide("Carregando informações...");

    var status = getStatus();
    var ssl = getSSL();

    var URL = "";

    if(status == true){
  		var url = getUrlbase();
  		URL = url + "/services/flash_venda/grafico_pagamento?token=" + gerarToken() + "&loja=" + getEmpresa() + "&data_inicial=" + getDataInicial() + "&data_final=" + getDataFinal();
  	} else{
  		var url = getUrlbase();
  		var protocolo = "http";
  		if(ssl == true){
  		 procotolo = protocolo + "s";
  		}
  		protocolo = protocolo + "://";
  		var URL = protocolo + url + "/services/flash_venda/grafico_pagamento?token=" + gerarToken() + "&loja=" + getEmpresa() + "&data_inicial=" + getDataInicial() + "&data_final=" + getDataFinal();
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
                var dadosFlash = resposta.extra.lista_flash_venda_grafico_pagamento;
                var pagamentos = $(dadosFlash.flash_venda_grafico_pagamento);
                // ------------------------------------------------------------

                if (resposta.extra.lista_flash_venda_grafico_pagamento.flash_venda_grafico_pagamento.length == 0) {

                    toastError("Não existem dados na data informada.");

                } else {
                    //------------------------------------------------------------
                    // Remove dados anteriores se existirem ----------------------
                    //------------------------------------------------------------
                    $("#tbody-tabela-forma-pagamento").find("tr").remove(); // Remove a tabela de venda por forma de pagamento
                    $("#venda-por-fpagamento").unbind();
					          $("#venda-por-fpagamento").empty(); // Remove o gráfico de venda por forma de pagamento
          					vpagamentos = [];

                    pagamentos.each(function(i, obj) {
                        var pgDescricao = obj.descricao;
                        var pgValor = "R$ " + valorEmReais(obj.total);

                        var tr = $("<tr>").append($("<td class='coluna-descricao'>"));
                        tr.find(".coluna-descricao").text(pgDescricao);
                        $(tr).append($("<td class='coluna-valor'>"));
                        tr.find(".coluna-valor").text(pgValor);
                        $(tr).appendTo($("#tbody-tabela-forma-pagamento"));

                        vpagamentos.push({
                            label: pgDescricao,
                            data: Number(obj.total.toFixed(2))
                        });
                    });

                    // ------------------------------------------------------------
                    // Carrega gráfico de venda por forma de pagamento ------------
                    // ------------------------------------------------------------
                    $.plot('#venda-por-fpagamento', vpagamentos, {
                        series: {
                            pie: {
                                show: true,
                                resize: true,
                                radius: 0.7
                            }
                        },
                        legend: {
                            position: 'left'
                        }
                    });

                    document.getElementById("secao-pagamento").style.display = 'block';

                    toastSuccess("Informações atualizadas!");
                }
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

function labelFormatter(label, series) {
    return "<div style='font-size:10pt;text-align:center padding:2px;color:white;background-color:rgba(0, 0, 0, 0.5);padding:2px 2px 2px 2px;'>" + label + "</div>";
}
