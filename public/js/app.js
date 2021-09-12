!(function ($) {
    "use strict";

    /*--------------------------------------------------------------
    # Loading
    --------------------------------------------------------------*/
    function aos_init() {
        AOS.init({
            duration: 1000,
            once: true
        });
    }
    $(window).on('load', function () {
        aos_init();
    });

    $(window).on('load', function () {
        if ($('.loading').length) {
            $('.loading').delay(100).fadeOut('slow', function () {
                $(this).remove();
            });
        }
    });

    /*--------------------------------------------------------------
    # Alert menseger - Mensagem de alerta  
    --------------------------------------------------------------*/
    setTimeout(function () {
        $(".dx-alert").hide();
    }, 5000);

    //FUNÇÃO Editor de texto Tiny 
    $(function () {
        tinymce.init({
            language: 'pt_BR',
            selector: ".tiny",
            plugins: [
                'advlist autolink link image lists print preview hr searchreplace wordcount fullscreen insertdatetime media save table paste emoticons'
            ]
        })
    });

    /*--------------------------------------------------------------
    # Modal Logout 
    --------------------------------------------------------------*/
    $(document).on('click', '.modalLogout', function (event) {
        $('.urlFormDefault')[0].reset();
        $(".urlFormDefault").attr('action', '/logout');
        $('.modalTitleDefault').html('<i class="icofont-logout"></i> Sair do sistema');
        $('.modalBodyDefault').html('<p class="h6 text-center"> Deseja Sair do Sistema? </p>');
    });

    //FUNÇÃO DE MASCARA CPFCNPJ
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

    //FUNÇÃO DE MASCARA 
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

    //FUNÇÃO TABELA
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
    });

})(jQuery);