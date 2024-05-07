#language: pt
Funcionalidade: Pesquisar usuários 

Contexto: O usuário deve acessar a página principal 
    Dado que acessei a página principal

@createUser @deletarUsuario @ignore
Cenário: Deve pesquisar usuário pelo nome
    Quando digito um usuário existente na barra de pesquisa
    Então o site retorna o card do usuário pesquisado
    E o nome e email do usuário pesquisado 

@createUser @deletarUsuario @ignore
Cenário: Deve pesquisar usuário pelo email
    Quando digito o email de um usuário existente na barra de pesquisa
    Então o site retorna o card do usuário pesquisado
    E o nome e email do usuário pesquisado

@createUser @deletarUsuario @ignore
Cenário:Não deve pesquisar um usuário pelo id
    Quando digito o id de um usuário existente na barra de pesquisa
    Então o site retorna a mensagem "Ops! Não existe nenhum usuário para ser exibido."

@ignore
Cenário: Não deverá pesquisar se não houver nada escrito na barra de pesquisa
    E não tem nada escrito na barra de pesquisa
    Então nenhuma pesquisa será realizada

@ignore
Cenário: O botão de apagar a pesquisa deve funcionar quando clicado
    E digito uma pesquisa no input
    Quando clico no botão de apagar 
    Então a pesquisa deve ser apagada do input


