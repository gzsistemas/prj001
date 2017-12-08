var vcaixa = [];

function graficoUm() {

    var storage = window.localStorage;

    toastr.remove();

    toastInfoNoHide("Carregando informações...");

    var status = getStatus();
    var ssl = getSSL();

    var URL = "";

    if(status == true){
  		var url = getUrlbase();
  		URL = url + "/services/flash_venda/grafico_caixa?token=" + gerarToken() + "&loja=" + getEmpresa() + "&data_inicial=" + getDataInicial() + "&data_final=" + getDataFinal();
  	} else{
  		var url = getUrlbase();
  		var protocolo = "http";
  		if(ssl == true){
  		 procotolo = protocolo + "s";
  		}
  		protocolo = protocolo + "://";
  		var URL = protocolo + url + "/services/flash_venda/grafico_caixa?token=" + gerarToken() + "&loja=" + getEmpresa() + "&data_inicial=" + getDataInicial() + "&data_final=" + getDataFinal();
  	}

    //console.log(URL);

    $.ajax({
        url: URL,
        data: {

        },
        success: function(resposta) {
            toastr.remove();
            var isOk = resposta.ok;

            if (isOk) {

                //------------------------------------------------------------
                // Inicializa as variáveis -----------------------------------
                //------------------------------------------------------------
                var dadosFlash = resposta.extra.lista_flash_venda_grafico_caixa;
                var caixas = $(dadosFlash.flash_venda_grafico_caixa);
                // ------------------------------------------------------------

                if (resposta.extra.lista_flash_venda_grafico_caixa.flash_venda_grafico_caixa.length == 0) {

                    toastError("Não existem dados na data informada.");

                } else {
                    //------------------------------------------------------------
                    // Remove dados anteriores se existirem ----------------------
                    //------------------------------------------------------------
                    $("#tbody-tabela-caixas").find("tr").remove(); // Remove a tabela de venda por caixa
                    $('#venda-por-caixa').empty(); // Remove o gráfico de venda por caixa
          					vcaixa = [];

                    // ------------------------------------------------------------
                    // Carregamento da tabela -------------------------------------
                    // ------------------------------------------------------------
                    caixas.each(function(i, obj) {
                        var cxCaixa = obj.caixa;
                        var cxValorVenda = "R$ " + valorEmReais(obj.total);

                        //---------------------------------------------------------
                        //----- Carrega a tabela de flash de vendas ---------------
                        //---------------------------------------------------------
                          var tr = $("<tr>").append($("<td class='coluna-numero-caixa'>"));
                          tr.find(".coluna-numero-caixa").text(cxCaixa);
                          $(tr).append($("<td class='coluna-valor-venda'>"));
                          tr.find(".coluna-valor-venda").text(cxValorVenda);
                          $(tr).appendTo($("#tbody-tabela-caixas"));
                        //---------------------------------------------------------

                        vcaixa.push({
                            "caixa": "Caixa " + obj.caixa,
                            "valorvenda": obj.total.toFixed(2)
                        });

                    });

                    // ------------------------------------------------------------
                    // Carrega gráfico de venda por caixa -------------------------
                    // ------------------------------------------------------------
                    /*
                     Morris.Line({
                        element: 'venda-por-caixa',
                        data: vcaixa,
                        xkey: 'periodo',
                        ykeys: ['caixa', 'valorvenda'],
                        labels: ["Caixa", "Valor"],
                        smooth: false,
                        parseTime: false
                      });
                    */
              					Morris.Bar({
              						element: 'venda-por-caixa',
              						resize: true,
              						barColors: ['#1e90ff'],
              						data: vcaixa,
              					  xkey: 'caixa',
              					  ykeys: ['valorvenda'],
              					  labels: ['Valor']
              					});

                        document.getElementById("secao-caixa").style.display = 'block';

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
