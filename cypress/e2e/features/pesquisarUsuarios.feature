#language: pt
Funcionalidade: Pesquisar usuários 

Contexto: O usuário deve acessar a página principal 
    Dado que acessei a página principal

@createUser
Cenário: Pesquisar usuário pelo nome
    Quando digito um usuário existente na barra de pesquisa
    Então o site me retorna o card do usuário pesquisado
    E o nome e email do usuário pesquisado 
