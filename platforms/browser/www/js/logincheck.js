/*

$(function (e) {
	if(window.localStorage.getItem("sessao").length <= 0) {
		window.localStorage.setItem("sessao", 0);
	} else {
		window.setInterval(timer, 1);
		renovaSessao();
	}
});

function verificaSessao() {
	if(window.localStorage.getItem("sessao") == 0) {
		acabaSessao();
	}
}

function renovaSessao() {
	var storage = window.localStorage;
	storage.setItem("sessao", 300000);
}

function acabaSessao() {
	var storage = window.localStorage;
	storage.setItem("sessao", 0);
	window.location.href = "login.html";
}

function timer() {
	window.localStorage.setItem("sessao", (window.localStorage.getItem("sessao") - 1));
	verificaSessao();
}

*/