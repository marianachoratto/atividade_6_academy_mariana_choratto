#language: pt
Funcionalidade: cadastrar usuário 

Contexto: O usuário deve ter acessado a página de cadastro
    Dado que acessei a funcionalidade de cadastro

Cenário: cadastrar usuário com sucesso 
    Quando informo um nome e email válido 
    E clico no botão salvar
    Então tenho um usuário cadastrado