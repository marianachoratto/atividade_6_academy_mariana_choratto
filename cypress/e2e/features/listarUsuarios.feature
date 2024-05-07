#language: pt

Funcionalidade: Listar usuários 

Contexto: O usuário deve acessar a página principal 
    Dado que acessei a página principal

@ignore
Cenário: Atualizandoa página principal ao clicar no link 'R'
    E desejo dar refresh na página principal
    Quando clico no link R na esquerda da página
    Então ela atualiza

@ignore
Cenário: ir para página de cadastro de usuário
    E desejo ir para a página de cadastro
    Quando clico no link Novo, na esquerda da página
    Então o site vai até a página esperada

@tag6Usuarios @ignore
Cenário: Acessando o site com 6 usuários cadastrados no banco de dados
    E vi que havia 6 usuários cadastrados
    Então o total de cards de usuário deve ser 6
    E o total de páginas do site deve ser 1
    E os botões de anterior e próximo estarão desabilitados
    E todos os usuários devem mostrar as informações de nome e email

@tag2Usuarios @ignore
Cenário: Acessando o site com 2 usuários cadastrados no banco de dados
    E vi que havia 2 usuários cadastrados
    Então o total de cards de usuários deve ser 2
    E o total de páginas do site deve ser 1
    E os botões de anterior e próximo estarão desabilitados
    E todos os usuários devem mostrar as informações de nome e email

@tag12Usuarios @ignore
Cenário: Acessando o site com 12 usuários cadastrados no banco de dados
    E vi que havia 12 usuários cadastrados
    Então na primeira página haverá os usuários de 1 a 6
    E o botão de anterior estará desabilitado
    E o botão de próximo estará habilitado
    Então a segunda página deverá trazer os usuários de 7 a 12
    E o botão de anterior estará habilitado
    E o botão de próximo estará desabilitado

@noUsers @ignore
Cenário: Acessando site com 0 usuários cadastrados no banco de dados
    E vi que não haviam usuários cadastrados
    Então aparecerá uma mensagem dizendo que não há usuários para serem exibidos
    E aparecerá um link de cadastro de usuário
    Então clico no link de cadastro de usuário
    E serei redirecionado para a página de cadastro

@criarUsuario @deletarUsuario
Cenário: Apertando o botão ver detalhes de um card de usuário
    Quando aperto o botão ver detalhes
    Então serei redirecionada para a página de detalhes
    E ali estarão as informações de id, nome e email do usuário

# Escrever um id louco na URL "aparece a notificação usuário não encontrado"
