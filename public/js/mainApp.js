"use strict"

/*--------------------------------------------------------------
# Title DropDown
--------------------------------------------------------------*/
$(() => {
  $('[data-toggle="tooltip"]').tooltip()
})

/*--------------------------------------------------------------
# FUNÇÃO TABELA
--------------------------------------------------------------*/
$(function () {
  $(".dataTable").dataTable({
    "bJQueryUI": true,
    "order": [],
    "bSort": true,
    "oLanguage": {
      "sProcessing": "Processando...",
      "sLengthMenu": "Mostrar _MENU_ registros",
      "sZeroRecords": "Não foram encontrados resultados para a sua pesquisa...",
      "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
      "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
      "sSearch": "Buscar:",
      "sUrl": "",
      "oPaginate": {
        "sFirst": "<span class='sr-only'>Anterior</span>",
        "sPrevious": "<span aria-hidden='true'>&laquo;</span>",
        "sNext": "<span aria-hidden='true'>&raquo;</span>",
        "sLast": "<i class='large material-icons'>last_page</i>"
      }
    }
  })
})

/*--------------------------------------------------------------
# FUNÇÃO Text Input File
--------------------------------------------------------------*/
$('input[type="file"]').change((e) => {
  var fileName = e.target.files[0].name
  $('.custom-file-label').html(fileName)
})

/*--------------------------------------------------------------
# FUNÇÃO Editor de texto Tiny
--------------------------------------------------------------*/
$(() => {
  tinymce.init({
    language: 'pt_BR',
    selector: ".tiny",
    plugins: [
      'advlist autolink link image lists print preview hr searchreplace wordcount fullscreen insertdatetime media save table paste emoticons'
    ]
  })
})
//Tiny Laudo
$(() => {
  tinymce.init({
    menubar: false,
    language: 'pt_BR',
    selector: ".tinyLaudo",
  })
})

/*--------------------------------------------------------------
# FUNÇÃO Marca Todos Checkbox
--------------------------------------------------------------*/
$(() => {
  $("#marcarTodos").change(function () {
    $("input:checkbox").prop('checked', $(this).prop("checked"))
  })
})
