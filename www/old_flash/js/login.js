/*
 * DECLARAÇÃO DE FUNÇÕES
 */
function enderecoDefinido() {
    return $("#txt-cnpj").val();
}
function login() {
    if(!enderecoDefinido()) {
        toastWarning("CNPJ / Servidor não definido!");
        return;
    }
    if(!$("#txt-usuario").val() || !$("#txt-senha").val()){
        toastError("Login inválido!");
        return;
    }
    setEnderecoServidor($("#txt-cnpj").val());
    toastInfoNoHide("Aguarde... Fazendo login.");
    $.ajax({
        url: "http://"+enderecoFormatado()+"/services/login",
        headers: {
            "Accept":"application/json"
        },
        data: {
            usuario: $("#txt-usuario").val(),
            senha: $("#txt-senha").val()
        },
        success: function (resposta) {
            $.toast().reset("all");
            var isOk = resposta.ok;
            if(isOk) {
                var usuario = resposta.extra.usuario;
                guardarUsuario(usuario);
                window.location.replace("flash.html");
            }else{
                toastError("Login inválido!");
            }
        },
        error: function (erro) {
            $.toast().reset("all");
            toastError("Não foi possível estabelecer conexão com o servidor!");
        }
    });
}
function onLoad() {
    $("#txt-cnpj").val(getEnderecoServidor());
    //if(!$("#txt-cnpj").val()) {
    //    toastWarning("CNPJ / Servidor não definido!");
    //}
    var usuario = getUsuario();
    $("#txt-usuario").val(usuario.nomeUsuario);
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