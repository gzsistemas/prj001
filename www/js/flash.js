var vcaixa = [];
var vpagamentos = [];

function pesquisar() {
    if (!$("#txt-loja").val() || parseInt($("#txt-loja").val()) < 1 || parseInt($("#txt-loja").val()) > 999 || !$("#txt-data-inicial").val() || !$("#txt-data-final").val()) {
        toastError("Oops. Algo está errado.");
        return;
    }

    toastInfoNoHide("Atualizando informações...");

    var conecSeg = storage.getItem("ConecSeg");

    var URL = "";

    if(conecSeg == "true"){
    	URL = "https://" + enderecoFormatado() + "/services/modulo/flash";
    }else {
    	URL = "http://" + enderecoFormatado() + "/services/modulo/flash";
    }

    $.ajax({
        url: URL,
        data: {
            loja: $("#txt-loja").val(),
            dataInicial: $("#txt-data-inicial").val(),
            dataFinal: $("#txt-data-final").val()
        },
        success: function(resposta) {
            $.toast().reset("all");
            var isOk = resposta.ok;

            if (isOk) {

                // Inicializa as variáveis ------------------------------------
                var dadosFlash = resposta.extra.DadosFlash;

                var valorVenda = dadosFlash.valorVenda;
                var clientesAtendidos = dadosFlash.clientesAtendidos;
                var ticketMedio = dadosFlash.ticketMedio;

                var caixas = $(dadosFlash.vendasCaixa);
                var pagamentos = $(dadosFlash.vendasFormaPagamento);
                // ------------------------------------------------------------

                if (valorVenda.toFixed(2) <= 0) {

                    toastError("Não existem dados na data informada.");

                    // Oculta as divs se estiverem exibidas -----------------------
                    document.getElementById("secao-estatisticas").style.display = 'none';
                    document.getElementById("secao-caixa").style.display = 'none';
                    document.getElementById("secao-pagamento").style.display = 'none';
                    // ------------------------------------------------------------

                } else {

                    // Remove dados anteriores se existirem -----------------------
                    $("#tbody-tabela-caixas").find("tr").remove(); // Remove a tabela de venda por caixa
                    $('#venda-por-caixa').empty(); // Remove o gráfico de venda por caixa

                    $("#tbody-tabela-forma-pagamento").find("tr").remove(); // Remove a tabela de venda por forma de pagamento
                    $("#venda-por-fpagamento").unbind();
					$("#venda-por-fpagamento").empty(); // Remove o gráfico de venda por forma de pagamento

					vpagamentos = [];
					vcaixa = [];
                    // ------------------------------------------------------------

                    // Carrega as divs de estatísticas ----------------------------
                    $("#princ-valor-venda").text("R$ " + valorEmReais(valorVenda));
                    $("#princ-clientes-atendidos").text(clientesAtendidos);
                    $("#princ-ticket-medio").text("R$ " + valorEmReais(ticketMedio));
                    // ------------------------------------------------------------

					var TEMPORARIO1 = 2016; // APENAS PARA FIM DE TESTES: AGUARDANDO CALL DO WEBSERVICE

                    caixas.each(function(i, obj) {
                        var cxCaixa = obj.caixa;
                        var cxValorVenda = "R$ " + valorEmReais(obj.valorVenda);
                        var cxClientesAtendidos = obj.clientesAtendidos;
                        var cxTicketMedio = "R$ " + valorEmReais(obj.ticketMedio);
                        var cxPercentual = obj.percentual.toFixed(2) + "%";
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

                        vcaixa.push({
                            "periodo": TEMPORARIO1,
                            "caixa": "Caixa " + obj.caixa,
                            "valorvenda": obj.valorVenda.toFixed(2)
                        });

						TEMPORARIO1 = TEMPORARIO1 + 1; // APENAS PARA FIM DE TESTES: AGUARDANDO CALL DO WEBSERVICE
                    });

                    pagamentos.each(function(i, obj) {
                        var pgDescricao = obj.descricao;
                        var pgValor = "R$ " + valorEmReais(obj.valor);
                        var tr = $("<tr>").append($("<td class='coluna-descricao'>"));

                        tr.find(".coluna-descricao").text(pgDescricao);
                        $(tr).append($("<td class='coluna-valor'>"));
                        tr.find(".coluna-valor").text(pgValor);
                        $(tr).appendTo($("#tbody-tabela-forma-pagamento"));

                        vpagamentos.push({
                            label: pgDescricao,
                            data: Number(obj.valor.toFixed(2))
                        });
                    });

                    // Carrega gráfico de venda por caixa -------------------------
                    /* Morris.Line({
                        element: 'venda-por-caixa',
                        data: vcaixa,
                        xkey: 'periodo',
                        ykeys: ['caixa', 'valorvenda'],
                        labels: ["Caixa", "Valor"],
                        smooth: false,
                        parseTime: false
                    }); */
					Morris.Bar({
						element: 'venda-por-caixa',
						resize: true,
						barColors: ['#1e90ff'],
						data: vcaixa,
					    xkey: 'caixa',
					    ykeys: ['valorvenda'],
					    labels: ['Valor']
					});
                    // ------------------------------------------------------------

                    // Carrega gráfico de venda por forma de pagamento ------------
                    $.plot('#venda-por-fpagamento', vpagamentos, {
                        series: {
                            pie: {
                                show: true,
                                resize: true,
                                radius: 1,
                                label: {
                                    show: true,
                                    radius: 3 / 4,
                                    formatter: labelFormatter
                                }
                            }
                        },
                        legend: {
                            show: false
                        }
                    });
                    // ------------------------------------------------------------

                    // Exibe as divs ocultadas ------------------------------------
                    document.getElementById("secao-estatisticas").style.display = 'block';
                    document.getElementById("secao-caixa").style.display = 'block';
                    document.getElementById("secao-pagamento").style.display = 'block';
                    // ------------------------------------------------------------

                    toastSuccess("Informações atualizadas!");
                }
            } else {
                var mensagem = resposta.mensagem;
                toastError("Erro: " + mensagem);
            }
        },
        error: function(erro) {
            $.toast().reset("all");
            toastError("Não foi possível estabelecer conexão com o servidor!");
        }
    });
}

function labelFormatter(label, series) {
    return "<div style='font-size:10pt;text-align:center padding:2px;color:white;background-color:rgba(0, 0, 0, 0.5);padding:2px 2px 2px 2px;'>" + label + "</div>";
}

function onLoad() {
    // Exibe endereço do usuário
    var usuario = getUsuario();
    $("#txt-loja").val(usuario.loja);

    if (usuario.multiLoja != 'S') { // Se o usuário não for multiloja...
        $("#txt-loja").prop("disabled", true); // Desabilita campo loja
    }

    // Inicializa Datepicker
    $("#txt-data-inicial, #txt-data-final").datepicker({
        format: 'dd/mm/yyyy',
        dateFormat: 'dd/mm/yy',
        firstDay: 0,
        currentText: "Hoje",
        gotoCurrent: true,
        dayNames: obterDiasSemana("cp"),
        dayNamesMin: obterDiasSemana("sc"),
        dayNamesShort: obterDiasSemana("ct"),
        monthNames: obterNomeMeses("cp"),
        monthNamesShort: obterNomeMeses("ct"),
        nextText: "Próximo",
        prevText: "Anterior",
        showOtherMonths: true
    });

    // Inicializa dados padrão
    $("#txt-loja").val(obterInicializacao("loja"));
    $("#txt-meta").val(obterMeta());

    var tipoinit = obterInicializacao("tipo");
    if (tipoinit == "DIA") {
        $("#txt-data-inicial, #txt-data-final").val(obterDataAtual());
        pesquisar();
    } else if (tipoinit == "SEM") {
        $("#txt-data-inicial").val(obterDias(7));
        $("#txt-data-final").val(obterDataAtual());
        pesquisar();
    } else if (tipoinit == "MES") {
        $("#txt-data-inicial").val(obterDias(31));
        $("#txt-data-final").val(obterDataAtual());
        pesquisar();
    } else {
        $("#txt-data-inicial, #txt-data-final").val(obterDataAtual());
    }
}

$("#btn-pesquisar").click(function(e) {
    pesquisar();
});
