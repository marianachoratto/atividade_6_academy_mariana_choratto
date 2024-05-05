#language: pt
Funcionalidade: cadastrar usuário 

Contexto: O usuário deve ter acessado a página de cadastro
    Dado que acessei a funcionalidade de cadastro

@deletarUsuario 
Cenário: cadastrar usuário com sucesso 
    Quando informo um nome e email válido 
    E clico no botão salvar
    Então tenho um usuário cadastrado

@criarUsuarioNoBd @deletarUsuario
Cenário: Não deve ser possível cadastrar um usuário com e-mail já utilizado
    Quando informo um nome válido
    E informo um email já utilizado em outro cadastro
    E clico no botão de salvar
    Então aparecerá uma mensagem informando que o email já foi utilizado

@deletarUsuario
Cenário: deve ser possível abrir a página de perfil do usuário através do seu id
    Quando crio um usuário
    E vejo a confirmação de que o usuário foi salvo
    Então escrevo o id do usuário na URL
    E vejo se existe uma página de perfil para aquele usuário em específico





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

@deletarUsuario
Cenário: Deve ser possível cadastrar usuário com nome de até 100 caracteres
    Quando informo um nome com 100 caracteres 
    E informo um email válido
    E clico no botão salvar
    Então tenho um usuário cadastrado


Cenário: Não deve ser possível cadastrar um nome com mais de 100 caracteres
    Quando informo um nome com 101 caracteres
    E informo um email válido
    E clico no botão de cadastrar
    Então aparecerá uma mensagem que dizendo que o nome só pode ter 100 caracteres


Cenário: Não deve ser possível cadastrar um nome com menos de 4 caracteres
    Quando informo um nome com menos de 3 caracteres
    E informo um email válido
    E clico no botão de cadastrar
    Então aparecerá uma mensagem dizendo que o nome deve ter no mínimo 4 caracteres


Cenário: Não deve ser possível cadastrar um e-mail com mais de 60 caracteres
    Quando informo um nome válido
    E informo um email com 61 caracteres
    E clico no botão de cadastrar
    Então aparecerá uma mensagem informando que o email suporta apenas 60 caracteres
