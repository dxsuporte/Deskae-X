"use strict"

/*--------------------------------------------------------------
# Loading Site - Carregando Site
--------------------------------------------------------------*/
function aos_init() {
  AOS.init({
    duration: 1000,
    once: true
  });
}
$(window).on('load', () => {
  aos_init();
});

$(window).on('load', () => {
  if ($('.loading').length) {
    $('.loading').delay(100).fadeOut('slow', () => {
      $(this).remove()
    });
  }
})

/*--------------------------------------------------------------
# Alert menseger - Mensagem de alerta
--------------------------------------------------------------*/
setTimeout(() => {
  $(".toastsAlerts").fadeOut(4000)
}, 4000)

/*--------------------------------------------------------------
# Initiate venobox lightbox - Galeria de Imagem
--------------------------------------------------------------*/
$(document).ready(() => {
  $('.venobox').venobox();
})

/*--------------------------------------------------------------
# FUNÇÃO DE MASCARA CPF CNPJ
--------------------------------------------------------------*/
$(".cpfcnpj").keydown(function () {
  try {
    $(".cpfcnpj").unmask();
  } catch (e) { }

  var tamanho = $(".cpfcnpj").val().length;

  if (tamanho < 11) {
    $(".cpfcnpj").mask("999.999.999-99");
  } else {
    $(".cpfcnpj").mask("99.999.999/9999-99");
  }

  // ajustando foco
  var elem = this;
  setTimeout(function () {
    // mudo a posição do seletor
    elem.selectionStart = elem.selectionEnd = 10000;
  }, 0);
  // reaplico o valor para mudar o foco
  var currentValue = $(this).val();
  $(this).val('');
  $(this).val(currentValue);
});

/*--------------------------------------------------------------
# FUNÇÃO DE MASCARA IMPUT
--------------------------------------------------------------*/
$(function () {
  $('.hora').mask('00:00', { clearIfNotMatch: true });
  $('.celular').mask('(00)00000-0000', { clearIfNotMatch: true });
  $('.telefone').mask('(00)0000-0000', { clearIfNotMatch: true });
  $('.cep').mask('00.000-000', { clearIfNotMatch: true });
  $(".cpf").mask("000.000.000-00", { clearIfNotMatch: true });
  $(".cnpj").mask("00.000.000/0000-00", { clearIfNotMatch: true });
  $('.money').mask('00.000.000,00', { reverse: true });
  $('.percent').mask('000.00', { reverse: true });
});
