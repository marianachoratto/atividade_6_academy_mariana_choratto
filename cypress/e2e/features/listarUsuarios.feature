#language: pt

Funcionalidade: Listar usuários 

Contexto: O usuário deve acessar a página principal 
    Dado que acessei a página principal

@tag6Usuarios
Cenário: Acessando o site com 6 usuários cadastrados no banco de dados
    E vi que havia 6 usuários cadastrados
    Então o total de cards de usuário deve ser 6
    E o total de páginas do site deve ser 1
    E os botões de anterior e próximo estarão desabilitados
    E todos os usuários devem mostrar as informações de nome e email 