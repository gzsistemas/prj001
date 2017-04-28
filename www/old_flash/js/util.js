function getEnderecoServidor() {
    //var storage = window.localStorage;
    //var value = storage.getItem(key); // Pass a key name to get its value.
    //storage.setItem(key, value) // Pass a key name and its value to add or update that key.
    //storage.removeItem(key) // Pass a key name to remove that key from storage.
    var storage = window.localStorage;
    var enderecoServidor = storage.getItem("endereco-servidor"); // Pass a key name to get its value.
    return enderecoServidor;
}
function setEnderecoServidor(enderecoServidor) {
    var storage = window.localStorage;
    storage.setItem("endereco-servidor", enderecoServidor);
}
function guardarUsuario(usuario){
    var storage = window.localStorage;
    storage.setItem("usuario", JSON.stringify(usuario));
}
function getUsuario(){
    var storage = window.localStorage;
    var usuario = JSON.parse(storage.getItem("usuario")); // Pass a key name to get its value.
    return usuario;
}
function myToast(tipo, mensagem) {
    $.toast({
        text: mensagem, // Text that is to be shown in the toast

        icon: tipo, // Type of toast icon
        showHideTransition: 'slide', // fade, slide or plain
        allowToastClose: false, // Boolean value true or false
        hideAfter: 2000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
        stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
        position: 'bottom-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values



        textAlign: 'left',  // Text alignment i.e. left, right or center
        loader: true,  // Whether to show loader or not. True by default
        loaderBg: '#9EC600',  // Background color of the toast loader
        beforeShow: function () {}, // will be triggered before the toast is shown
        afterShown: function () {}, // will be triggered after the toat has been shown
        beforeHide: function () {}, // will be triggered before the toast gets hidden
        afterHidden: function () {}  // will be triggered after the toast has been hidden
    });
}
function myToastNoHide(tipo, mensagem) {
    $.toast({
        text: mensagem, // Text that is to be shown in the toast

        icon: tipo, // Type of toast icon
        showHideTransition: 'slide', // fade, slide or plain
        allowToastClose: false, // Boolean value true or false
        hideAfter: false, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
        stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
        position: 'bottom-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values



        textAlign: 'left',  // Text alignment i.e. left, right or center
        loader: true,  // Whether to show loader or not. True by default
        loaderBg: '#9EC600',  // Background color of the toast loader
        beforeShow: function () {}, // will be triggered before the toast is shown
        afterShown: function () {}, // will be triggered after the toat has been shown
        beforeHide: function () {}, // will be triggered before the toast gets hidden
        afterHidden: function () {}  // will be triggered after the toast has been hidden
    });
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
function validarCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

function servidorGZCloud(cnpj){
    return cnpj+".gzcloud.com.br";
}

function enderecoFormatado(){
    var endereco = getEnderecoServidor();
    if(validarCNPJ(endereco)){
        return endereco+".gzcloud.com.br";
    }else{
        return endereco;
    }
}