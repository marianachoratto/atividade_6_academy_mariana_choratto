#language: pt
Funcionalidade: cadastrar usuário 

Contexto: O usuário deve ter acessado a página de cadastro
    Dado que acessei a funcionalidade de cadastro

@criarUsuarioNoBd
Cenário: cadastrar usuário com sucesso 
    Quando informo um nome e email válido 
    E clico no botão salvar
    Então tenho um usuário cadastrado

Cenário: Não deve ser possível cadastrar usuário sem nome 
    Quando informo um email válido
    Mas não informo um nome
    E clico no botão de cadastrar
    Então não é possível cadastrar o usuário sem nome

Cenário: Não deve ser possível cadastrar usuário sem email
    Quando informo um nome válido
    Mas não informo um email
    E clico no botão de cadastrar
    Então não é possível cadastrar o usuário sem email

Cenário: Não deve ser possível cadastrar usuário sem nome e email
    Quando não informo um nome 
    E não informo um email
    Quando clico no botão de cadastrar
    Então não é possível cadastrar o usuário sem nome e email

Esquema do Cenário: Não deve ser possível cadastrar usuário com email inválido
    Quando informo um nome válido
    Mas informo um email inválido "<emailInvalido>"
    Quando clico no botão de cadastrar
    Então aparecerá uma mensagem dizendo que o formato do email é inválido

    Exemplos: 
    |emailInvalido    |
    |marianagmail.com |
    |@gmail.com       |
    |mariana@gmail    |
    |mariana          |
    |@gmail.com       |


Esquema do Cenário: Não deve ser possível cadastrar usuário com nome com números e símbolos 
    Quando informo um nome inválido "<nomelInvalido>"
    E informo um email válido
    Então aparecerá uma mensagem dizendo que o formato do nome é inválido

    Exemplos: 
    |nomelInvalido   |
    |mariana1234     |
    |mariana 1234    |
    |mariana_choratto|
    |$abrina         |
