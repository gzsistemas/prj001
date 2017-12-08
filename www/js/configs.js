/**
 *
 *  Configs.js
 *
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
  conexaoSegura = getSSL();
  var status = getStatus();

  $('#tgl-conexao-segura').toggles({
		on: conexaoSegura
	});

  $('.carousel').carousel({
    interval: false
  });

  if(status == true){
    var usr = getUser();
    var senha = getSenha();
    //var empresa = getEmpresa();
    $("#txt-usuario-cloud").val(usr);
    $("#txt-senha-cloud").val(senha);
  } else{
    //var empresa = getEmpresa();
    var url = getUrlbase();
    //$("#txt-empresa").val(empresa);
    $("#txt-url-base").val(url);
  }

}

function guardar(){
  var user = $("#txt-usuario-cloud").val();
  var senha = $("#txt-senha-cloud").val();
  //var empresa = $("#txt-empresa").val();
  var url = "https://homologacao.gzcloud.com.br";
  var status = true;
  setUser(user);
  setSenha(senha);
  //setEmpresa(empresa);
  setUrlbase(url);
  setStatus(status);
  toastInfoNoHide("Configurações salvas!");
}

function salvar() {
  /*
  if($("#txt-empresa").val() == ""){
    toastError("Empresa / Loja não pode ser nula!");
  } else {
  */
    if($("#txt-usuario-cloud").val() == "" | $("#txt-senha-cloud").val() == ""){
      if($("#txt-url-base").val() == ""){
        toastError("Existem campos em branco!");
      } else{
        var user = "P7pNVB64vHuwt6V2Mr4u6hmj";
        var senha = "QufPbwujrvu2bYJyjRQYnAVp";
        //var empresa = $("#txt-empresa").val();
        var url = $("#txt-url-base").val();
        var status = false;
        setUser(user);
        setSenha(senha);
        //setEmpresa(empresa);
        setUrlbase(url);
        setStatus(status);
        setSSL(conexaoSegura);
        toastInfoNoHide("Configurações salvas!");
        login();
      }
    } else {
      var storage = window.localStorage;
      var user = JSON.parse(storage.getItem("user"));
      if(user == null){
        guardar();
        login();
      } else{
        confirmar();
      }
    }
  //}
}

function confirmar() {
  bootbox.confirm({
      message: "Utilizar dados Cloud ?",
      size: "small",
      buttons: {
          confirm: {
              label: 'Sim',
              className: 'btn-success'
          },
          cancel: {
              label: 'Não',
              className: 'btn-danger'
          }
      },
      callback: function (result) {
        if (result == true) {
          guardar();
          login();
        } else {
          login();
        }
      }
  });
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
