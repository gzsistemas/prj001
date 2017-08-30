/*
	Login.JS
*/

/*
 * DECLARAÇÃO DE FUNÇÕES
 */
function onLoad() {
  var user = getUser();
  if(user == null){
    configs();
  } else{
    login();
  }
}

function login() {
  var storage = window.localStorage;
  toastInfoNoHide("Aguarde... Fazendo login!");
  var status = getStatus();
  var ssl = getSSL();
  // Criação do token
  var token = gerarToken();

  // ------
  var URL = "";
  // Parte que decide qual url usar
  // Status define se é cloud ou não
  if(status == true){
    var url = getUrlbase();
    URL = url + "/services/mobile/login?token=" + token;
  } else{
    var url = getUrlbase();
    var protocolo = "http";
    if(ssl == true){
     procotolo = protocolo + "s";
    }
    protocolo = protocolo + "://";
    var URL = protocolo + url + "/services/mobile/login?token=" + token;
  }
  $.ajax({
    url:URL,
    headers: {
      "Accept":"application/json"
    },
    data: {
    },
    success: function (resposta) {

      var isOk = resposta.ok;
      if(isOk) {
        window.location.replace("flash.html");
      }else{
        toastError("Login inválido! Verificar configurações!");
      }
    },
    error: function (erro) {
      toastError("Não foi possível estabelecer conexão com o servidor!");
    }
  });
}

function configs() {
  window.location.replace("configs.html");
}
/*
 * FIM DA DECLARAÇÃO DE FUNÇÕES
 */

/*
 * COMANDOS EXECUTADOS AO CARREGAR O SCRIPT
 */
$("#btn-login").click(function (e) {
    login();
});

$("#btn-configs").click(function (e) {
    configs();
});
