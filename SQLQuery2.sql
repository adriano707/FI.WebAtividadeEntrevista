USE [C:\PROJETOS\FI.WEBATIVIDADEENTREVISTA\FI.WEBATIVIDADEENTREVISTA\FI.WEBATIVIDADEENTREVISTA\APP_DATA\BANCODEDADOS.MDF]
GO

DECLARE	@return_value Int

EXEC	@return_value = [dbo].[FI_SP_PesqCliente]
		@iniciarEm = NULL,
		@quantidade = NULL,
		@campoOrdenacao = N'',
		@crescente = NULL

SELECT	@return_value as 'Return Value'

GO
