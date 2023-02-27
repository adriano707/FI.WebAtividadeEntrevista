
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #CPF').val(obj.CPF);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "CPF": $(this).find("#CPF").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
            },

            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                    window.location.href = urlRetorno;
                }
        });
    });   

    $('#btnIncluir').on('click', function (e) {
        e.preventDefault();

        IncluirBeneficiario();
        LimparFormularioDeCliente();
    });
})

function LimparFormularioDeCliente() {
    $("#Nome").val('');
    $("#CEP").val('');
    $("#Email").val('');
    $("#Sobrenome").val('');
    $("#Nacionalidade").val('');
    $("#CPF").val('');
    $("#Estado").val('');
    $("#Cidade").val('');
    $("#Logradouro").val('');
    $("#Telefone").val('');
}

function LimparModalDeBeneficiario() {
    $("#modalNome").val('');
    $("#modalCPF").val('');
}

function ObterModalBeneficiario() {
    var beneficiario = {
        IdCliente: obj.Id,
        Nome: $("#modalNome").val(),
        CPF: $("#modalCPF").val()
    }
    return beneficiario;
}

function AlterarBeneficiario() {
    $.ajax({
        url: urlAlterarBeneficiario,
        method: "POST",
        data: ObterModalBeneficiario(),
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#modalBeneficiarios")[0].reset();
                window.location.href = urlRetorno;

                MostrarGradeDeBeneficiarios();
            }
    })
}

function IncluirBeneficiario() {
    $.ajax({
        url: urlPostBeneficiario,
        method: "POST",
        data: ObterModalBeneficiario(),
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#modalBeneficiarios")[0].reset();
                window.location.href = urlRetorno;

                MostrarGradeDeBeneficiarios();
                LimparModalDeBeneficiario();
            }
    });
}

function DeletarBeneficiario(idBeneficiario) {
    $.ajax({
        url: urlExcluirBeneficiario,
        method: "POST",
        data: {
            idBeneficiario: idBeneficiario
        },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#modalBeneficiarios")[0].reset();
                window.location.href = urlRetorno;

                MostrarGradeDeBeneficiarios();
            }
    })
}

function MostrarGradeDeBeneficiarios() {
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable({
            title: 'Beneficiarios',                  
            actions: {
                listAction: urlListarBeneficiario,
            },
            fields: {
                Nome: {
                    title: 'Nome',
                    width: '50%'
                },
                CPF: {
                    title: 'CPF',
                    width: '35%'
                },
                Alterar: {
                    title: '',
                    display: function (data) {
                        return `<button data-beneficiario-id="${data.Id}" class="btn btn-primary btn-sm alterar" onclick="AlterarBeneficiario()">Alterar</button>`;
                    }
                },
                Excluir: {
                    title: '',
                    display: function (data) {
                        return `<button data-beneficiario-id="${data.Id}" class="btn btn-primary btn-sm excluir" onclick="DeletarBeneficiario()">Excluir</button>`;
                    }
                }
            }
        });

    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load');
}


function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

$("#btnBeneficiarios").on('click', function () {
    $("#modalBeneficiarios").modal();

    MostrarGradeDeBeneficiarios();
})

$("#btnFechar").on('click', function () {
    $("#formCadastro");
})
