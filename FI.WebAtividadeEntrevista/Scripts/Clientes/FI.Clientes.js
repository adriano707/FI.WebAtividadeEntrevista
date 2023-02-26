
$(document).ready(function () {
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
				"Nacionalidade": $(this).find("#Nacionalidade").val(),
				"CPF": $(this).find("#CPF").val(),
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
				}
		});
	})
})

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
})

$("#btnFechar").on('click', function () {

})

function ListarBeneficiarios(idCliente) {
	if (document.getElementById("gridBeneficiarios"))
		$('#gridBeneficiarios').jtable({
			title: 'Beneficiarios',
			actions: {
				listAction: urlBeneficiarioList,
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
						return '<button onclick="window.location.href=\'' + urlAlteracao + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Alterar</button>';
					}
				},
				Excluir: {
					title: '',
					display: function (data) {
						return '<button onclick="window.location.href=\'' + urlExclusao + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Alterar</button>';
					}
				}
			}

}


