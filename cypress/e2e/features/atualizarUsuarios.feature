#language: pt

Funcionalidade: Atualizar cadastros de usuários

Contexto: O cliente deve ter acessado a página de detalhes do usuário desejado
    Dado que acessei a página de detalhes do usuário desejado

@deletarUsuario @ignore
Cenário: Deve conseguir alterar cadastro do usuário (nome e email)
    Quando clico no botão editar
    E altero o nome e email do usuário "Usuário Alterado", "emailalterado@gmail.com"
    Quando clico no botão salvar
    Então deverá aparecer uma mensagem de sucesso dizendo "Informações atualizadas com sucesso!"
    E o usuário será redirecionado para a página principal do site


# Cenário: Checando se as alterações foram efetuadas

@ignore
Cenário: Ao entrar na página de detalhes os inputs nome e id devem estar desabilitados
    Então os inputs de nome e email devem estar desabilitados

@ignore
Cenário: Ao clicar no botão de editar os inputs nome e email ficarão habilitados, enquanto id ficará desabilitado
    Quando clico no botão editar
    Então os inputs nome e email ficarão habilitados
    E o input de id permanecerá desabilitado

@ignore
Cenário: Ao clicar no botão de editar ele vira cancelar e botão salvar fica habilitado
    Quando clico no botão editar
    Então ele se torna um botão de cancelar
    E o botão de salvar se torna habilitado

@ignore
Cenário: Ao clicar no botão de cancelar ele volta a ser editar e o botão de salvar fica desabilitado
    Quando clico no botão editar
    Então ele se torna um botão de cancelar
    Quando clico no botão de cancelar
    Então ele volta a ser um botão de editar
    E o botão de salvar fica desabilitado


@usuarioJaExistente @apagarUsuarioJaExistente @ignore
Cenário: Não deve ser possível atualizar o e-mail de um usuário para um e-mail que já está em uso por outro usuário registrado
    Quando clico no botão editar
    E digito o email de um usuário já cadastrado
    Quando clico no botão salvar
    Então recebo a mensagem "Este e-mail já é utilizado por outro usuário."

@ignore
Cenário:  Não deve ser possível atualizar o nome para que tenha mais de 100 caracteres
    Quando clico no botão editar
    E digito um nome com 101 caracteres
    Quando clico no botão salvar
    Então aparecerá uma mensagem dizendo "Informe no máximo 100 caracteres para o nome"

@ignore
Cenário:  Deve ser possível atualizar o nome para que tenha até 100 caracteres
    Quando clico no botão editar
    E digito um nome com 100 caracteres
    Quando clico no botão salvar
    Então deverá aparecer uma mensagem de sucesso dizendo "Informações atualizadas com sucesso!"

@ignore
Cenário: Não deve ser possível atualizar o e-mail para que tenha mais de 60 caracteres.
    Quando clico no botão editar
    E digito um email com 61 caracteres
    Quando clico no botão salvar
    Então deveverá aparecer uma mensagem de erro dizendo "Informe no máximo 60 caracteres para o e-mail"

@ignore
Cenário: Deve ser possível atualizar o e-mail para que tenha até 60 caracteres.
    Quando clico no botão editar
    E digito um email com 60 caracteres
    Quando clico no botão salvar
    Então deverá aparecer uma mensagem de sucesso dizendo "Informações atualizadas com sucesso!"

@ignore
Cenário: Não deve ser possível alterar dados de usuário sem nome
    Quando clico no botão editar
    E apago o nome
    Quando clico no botão salvar
    Então deverá aparecer uma mensagem dizendo: "O campo nome é obrigatório."

@ignore
Cenário: Não deve ser possível alterar dados de usuário sem email 
    Quando clico no botão editar
    E apago o email
    Quando clico no botão salvar
    Então aparecerá uma mensagem dizendo: "O campo e-mail é obrigatório."

Esquema do Cenário: Não deve ser possível alterar dados de usuário com email inválido
    

# Esquema do Cenário: Não deve ser possível alterar dados de usuário com nome com números e símbolos 


