/*
	Util.JS
	Último update: 14/08/2017
*/

toastr.options = {
	  "closeButton": false,
	  "debug": false,
	  "newestOnTop": true,
	  "progressBar": true,
	  "positionClass": "toast-bottom-center",
	  "preventDuplicates": false,
	  "onclick": null,
	  "showDuration": "1000",
	  "hideDuration": "1000",
	  "timeOut": "1500",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
}

function myToast(tipo, mensagem) {
	if(tipo == "success") {
		toastr.success(mensagem);
	} else if(tipo == "warning") {
		toastr.warning(mensagem);
	} else if(tipo == "info") {
		toastr.info(mensagem);
	} else if(tipo == "error") {
		toastr.error(mensagem);
	}
}

function myToastNoHide(tipo, mensagem) {
	myToast(tipo, mensagem);
}

function toastSuccess(mensagem) {
    myToast("success", mensagem);
}

function toastInfo(mensagem) {
    myToast("info", mensagem);
}

function toastInfoNoHide(mensagem) {
    myToastNoHide("info", mensagem);
}

function toastError(mensagem) {
    myToast("error", mensagem);
}

function toastWarning(mensagem) {
    myToast("warning", mensagem);
}

function getDiasSemana(tipo){
	if(tipo == "cp") { // CP = RETORNA DIAS COMPLETO
		return ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
	} else if(tipo == "sc") { // SC = RETORNA DIAS SUPER CURTO
		return ["D", "S", "T", "Q", "Q", "S", "S"];
	} else if(tipo == "ct") { // CT = RETORNA DIAS CURTO
		return ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
	}
}

function getNomeMeses(tipo){
	if(tipo == 'cp') {
		return ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
	} else if(tipo == 'ct') {
		return ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
	}
}

function setMeta(meta){
	var storage = window.localStorage;
	storage.setItem("meta", JSON.stringify(meta));
}

function getMeta(){
	var storage = window.localStorage;
	var meta = JSON.parse(storage.getItem("meta"));
	return meta;
}

function setInicializacao(loja, tipo){
	var storage = window.localStorage;
 	storage.setItem("loja-init", JSON.stringify(loja));
	storage.setItem("tipo-init", JSON.stringify(tipo));
}

function getInicializacao(obj){
	var storage = window.localStorage;
	if(obj == "loja"){
		var loja = JSON.parse(storage.getItem("loja-init"));
		return loja;
	} else if(obj == "tipo"){
		var tipo = JSON.parse(storage.getItem("tipo-init"));
		return tipo;
	}
}

function getDataAtual(){
	var data = new Date();
	return String(("0" + data.getDate()).slice(-2)) + "/" + ("0" + (data.getMonth() + 1)).slice(-2) + "/" + String(data.getFullYear());
}

function getDias(quantidade){
	return moment().subtract('days', quantidade).format('DD/MM/YYYY');
}

function valorEmReais(valor){
	return valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

function checarVazio(valor){
    return !valor || !/[^\s]+/.test(valor);
}

function checarNegativo(valor){
	if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8)) {
        return false;
    }
}

function removerAspas(strg){
	var str = strg.replace(/"/g, "");
	var string = str.replace(/^\s+|\s+$/g, "");
	return string;
}

// Criação das novas funções que realizam o novo fluxo de login
function getUser(){
	var storage = window.localStorage;
	var usuario = JSON.parse(storage.getItem("user"));
	return usuario;
}

function setUser(user){
	var storage = window.localStorage;
	storage.setItem("user", JSON.stringify(user));
}

function getSenha(){
	var storage = window.localStorage;
	var senha = JSON.parse(storage.getItem("password"));
	return senha;
}

function setSenha(senha){
	var storage = window.localStorage;
	storage.setItem("password", JSON.stringify(senha));
}

function getEmpresa(){
	var storage = window.localStorage;
	var empresa = JSON.parse(storage.getItem("empresa"));
	return empresa;
}

function setEmpresa(empresa){
	var storage = window.localStorage;
	storage.setItem("empresa", JSON.stringify(empresa));
}

function getUrlbase(){
	var storage = window.localStorage;
	var url = JSON.parse(storage.getItem("urlbase"));
	return url;
}

function setUrlbase(url){
	var storage = window.localStorage;
	storage.setItem("urlbase", JSON.stringify(url));
}
// O status serve para separar usuários cloud de usuários com servidor interno
function getStatus(){
	var storage = window.localStorage;
	var status = JSON.parse(storage.getItem("status"));
	return status;
}

function setStatus(status){
	var storage = window.localStorage;
	storage.setItem("status", JSON.stringify(status));
}

function getSSL(){
	var storage = window.localStorage;
	var ssl = JSON.parse(storage.getItem("ssl"));
	return ssl;
}

function setSSL(ssl){
	var storage = window.localStorage;
	storage.setItem("ssl", JSON.stringify(ssl));
}

function getDataInicial(){
	var storage = window.localStorage;
	var data_inicial = JSON.parse(storage.getItem("data_inicial"));
	return data_inicial;
}

function setDataInicial(data){
	var storage = window.localStorage;
	storage.setItem("data_inicial", JSON.stringify(data));
}

function getDataFinal(){
	var storage = window.localStorage;
	var data_final = JSON.parse(storage.getItem("data_final"));
	return data_final;
}

function setDataFinal(data){
	var storage = window.localStorage;
	storage.setItem("data_final", JSON.stringify(data));
}

function logout(){
	var storage = window.localStorage;
	storage.removeItem("user");
	storage.removeItem("ConecSeg");
	storage.removeItem("empresa");
	storage.removeItem("endereco-servidor");
	storage.removeItem("password");
	storage.removeItem("status");
	storage.removeItem("urlbase");
	storage.removeItem("ssl");
}

function gerarToken(){
	var usr = getUser();
	var senha = getSenha();
	var token = criarToken(usr,senha);
	return token;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

/*
	 Error Catch // -- Produção --

	 Dados requisitados:
	 - Nenhum;

	 Dados resultantes:
	 - Nenhum;

	 OBS: Método retorna erros no console;
*/

window.addEventListener('error', function(event){

		console.log("Erro de JS:");
		console.log("Mensagem: " + event.message);
		console.log("Em: " + event.filename);
		console.log("Linha: " + event.lineno);

		/*
    var boxError = document.createElement( 'div' );
    boxError.className  = 'box-error';

    boxError.innerHTML  = '<h4>Erro de JS:</h4>';
    boxError.innerHTML += '<p class="msg">'+ event.message +'</p>';
    boxError.innerHTML += '<p>Em: '+ event.filename +'</p>';
    boxError.innerHTML += '<p>Linha: '+ event.lineno +'</p>';

    document.body.appendChild( boxError );
		*/

		toastError("Ooops... Algo deu errado!");
    return false;
});
