function pesquisar() {

  toastInfo("Validando Informações...");

  if (!$("#txt-loja").val() || parseInt($("#txt-loja").val()) < 1 || parseInt($("#txt-loja").val()) > 999 || !$("#txt-data-inicial").val() /*|| !$("#txt-data-final").val()*/) {
      toastError("Informações inválidas...");
      return;
  }

  toastr.remove();

  toastInfoNoHide("Atualizando Informações...");

  //----------------------------------
  // Grava as datas ------------------
  //----------------------------------

  setEmpresa($("#txt-loja").val());

  setDataInicial($("#txt-data-inicial").val());

  setDataFinal($("#txt-data-inicial").val());

  //-----------------------------------
  // Carrega as Divs principais -------
  //-----------------------------------

  DivsPrincipais();

  //-------------------------------------------
  // Carrega o primeiro gráfico com a tabela --
  //-------------------------------------------

  graficoUm();

  //-------------------------------------------
  // Carrega o segundo gráfico com a tabela ---
  //-------------------------------------------

  graficoDois();

  //-------------------------------------------
  // Limpeza final para demonstração na tela --
  //-------------------------------------------

  toastr.remove();

}

function onLoad() {
    var status = getStatus();
    if(status == true){
      var server = "www.gzcloud.com.br";
    }else {
      var server = getUrlbase();
    }
    $("#txt-servidor").text(server);
    // Exibe endereço do usuário
    //var usuario = getEmpresa();
    //$("#txt-loja").val(usuario);

    /*

    if (usuario.multiLoja != 'S') { // Se o usuário não for multiloja...
        $("#txt-loja").prop("disabled", true); // Desabilita campo loja

    }

    */

    // Inicializa Datepicker
    $("#txt-data-inicial, #txt-data-final").datepicker({
        format: 'dd/mm/yyyy',
        dateFormat: 'dd/mm/yy',
        firstDay: 0,
        currentText: "Hoje",
        gotoCurrent: true,
        dayNames: getDiasSemana("cp"),
        dayNamesMin: getDiasSemana("sc"),
        dayNamesShort: getDiasSemana("ct"),
        monthNames: getNomeMeses("cp"),
        monthNamesShort: getNomeMeses("ct"),
        nextText: "Próximo",
        prevText: "Anterior",
        showOtherMonths: true
    });

    // Inicializa dados padrão
    $("#txt-loja").val(getInicializacao("loja"));

    var tipoinit = getInicializacao("tipo");
    if (tipoinit == "DIA") {
        $("#txt-data-inicial, #txt-data-final").val(getDataAtual());
        pesquisar();
    } else if (tipoinit == "SEM") {
        $("#txt-data-inicial").val(getDias(7));
        $("#txt-data-final").val(getDataAtual());
        pesquisar();
    } else if (tipoinit == "MES") {
        $("#txt-data-inicial").val(getDias(31));
        $("#txt-data-final").val(getDataAtual());
        pesquisar();
    } else {
        $("#txt-data-inicial, #txt-data-final").val(getDataAtual());
    }
}

$("#btn-pesquisar").click(function(e) {
    pesquisar();
});

$("#btn-total").click(function(e) {
    DivsPrincipais();
});

$("#btn-caixa").click(function(e) {
    graficoUm();
});

$("#btn-pagamentos").click(function(e) {
    graficoDois();
});
