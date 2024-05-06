import {
  Given,
  When,
  Then,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";
import { PaginaPrincipal } from "../pages/PaginaPrincipal";
import { PaginaDetalhes } from "../pages/PaginaDetalhes";

let pgPrincipal = new PaginaPrincipal();
let pagDetalhes = new PaginaDetalhes();
let baseURL = "https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/";
let emailUser;
let userId;
let userName;

Before({ tags: "@criarUsuarioNoBd" }, function () {
  cy.cadastrarUsuário().then(function (resposta) {
    emailUser = resposta.email;
    userId = resposta.id;
    userName = resposta.nome;

    cy.intercept("GET", "api/v1/users", {
      statusCode: 200,
      body: [
        {
          id: userId,
          name: userName,
          email: emailUser,
          createdAt: "2024-04-27T20:56:45.656Z",
          updatedAt: "2024-04-27T20:56:45.656Z",
        },
      ],
    }).as("getUsers");
  });
});

After({ tags: "@deletarUsuario" }, function () {
  cy.deletarUsuario(userId);
});

Before({ tags: "@tag6Usuarios" }, function () {
  cy.intercept("GET", "/api/v1/users", {
    statusCode: 200,
    fixture: "lista6Usuarios.json",
  }).as("intercept6Usuarios");
});

Before({ tags: "@tag2Usuarios" }, function () {
  cy.intercept("GET", "api/v1/users", {
    statusCode: 200,
    fixture: "lista2Usuarios.json",
  }).as("intercept2Usuarios");
});

Before({ tags: "@tag12Usuarios" }, function () {
  cy.intercept("GET", "api/v1/users", {
    statusCode: 200,
    fixture: "lista12Usuarios.json",
  }).as("intercept12Usuarios");
});

Before({ tags: "@noUsers" }, function () {
  cy.intercept("GET", "api/v1/users", {
    statusCode: 200,
  }).as("interceptnoUsers");
});

Then("que acessei a página principal", function () {
  cy.visit("/users");
});

Given("desejo dar refresh na página principal", function () {
  cy.get(pgPrincipal.anchorRaro).should("be.visible");
});

When("clico no link R na esquerda da página", function () {
  cy.get(pgPrincipal.anchorRaro).click();
});

Then("ela atualiza", function () {
  cy.url().should(
    "equal",
    "https://rarocrud-frontend-88984f6e4454.herokuapp.com/users"
  );
});

Given("desejo ir para a página de cadastro", function () {
  cy.get(pgPrincipal.anchorNovo).should("be.visible");
});

When("clico no link Novo, na esquerda da página", function () {
  cy.get(pgPrincipal.anchorNovo).click();
});

Then("o site vai até a página esperada", function () {
  cy.url().should("equal", baseURL + "novo");
});

Given("vi que havia 6 usuários cadastrados", function () {
  cy.wait("@intercept6Usuarios");
});

Then("o total de cards de usuário deve ser 6", function () {
  cy.get(pgPrincipal.divListaDeUsuarios).should("have.length", 6);
});

Then("o total de páginas do site deve ser 1", function () {
  cy.get(pgPrincipal.liTextoPaginas)
    .invoke("text")
    .should("be.equal", "1 de 1");
});

Then("os botões de anterior e próximo estarão desabilitados", function () {
  cy.get(pgPrincipal.paginaAnterior).should("be.disabled");
  cy.get(pgPrincipal.paginaProxima).should("be.disabled");
});

Then(
  "todos os usuários devem mostrar as informações de nome e email",
  function () {
    cy.get(pgPrincipal.divListaDeUsuarios).each(function (item) {
      expect(item.text()).to.include("Nome:");
      expect(item.text()).to.include("E-mail:");
    });
  }
);

Given("vi que havia 2 usuários cadastrados", function () {
  cy.wait("@intercept2Usuarios");
});

Then("o total de cards de usuários deve ser 2", function () {
  cy.get(pgPrincipal.divListaDeUsuarios).should("have.length", 2);
});

Given("vi que havia 12 usuários cadastrados", function () {
  cy.wait("@intercept12Usuarios");
});

Then("na primeira página haverá os usuários de 1 a 6", function () {
  cy.get(pgPrincipal.divListaDeUsuarios).should("have.length", 6);
  cy.get(pgPrincipal.liTextoPaginas).should("have.text", "1 de 2");
  cy.contains("p", "Nome:")
    .invoke("text")
    .should("be.equal", "Nome: Usuário mockado");
  cy.contains("p", "E-mail:")
    .invoke("text")
    .should("be.equal", "E-mail: usariomockado@qa.com");
});

Then("o botão de anterior estará desabilitado", function () {
  cy.get(pgPrincipal.paginaAnterior).should("be.disabled");
});

Then("o botão de próximo estará habilitado", function () {
  cy.get(pgPrincipal.paginaProxima).should("be.enabled");
});

Then("a segunda página deverá trazer os usuários de 7 a 12", function () {
  cy.get(pgPrincipal.paginaProxima).click();

  cy.get(pgPrincipal.liTextoPaginas).should("have.text", "2 de 2");
  cy.contains("p", "Nome:")
    .invoke("text")
    .should("be.equal", "Nome: Usuário mockado Pg 2");
  cy.contains("p", "E-mail:")
    .invoke("text")
    .should("be.equal", "E-mail: usariomockado@qa.com");
});

Then("o botão de anterior estará habilitado", function () {
  cy.get(pgPrincipal.paginaAnterior).should("be.enabled");
});

Then("o botão de próximo estará desabilitado", function () {
  cy.get(pgPrincipal.paginaProxima).should("be.disabled");
});

Given("vi que não haviam usuários cadastrados", function () {
  cy.wait("@interceptnoUsers");
});

Then(
  "aparecerá uma mensagem dizendo que não há usuários para serem exibidos",
  function () {
    cy.contains(
      "h3",
      "Ops! Não existe nenhum usuário para ser exibido."
    ).should("be.visible");
  }
);

Then("aparecerá um link de cadastro de usuário", function () {
  cy.contains("p", "Cadastre um novo usuário").should("be.visible");
  cy.get(pgPrincipal.divDadosUsuarios).should("not.exist");
});

Then("clico no link de cadastro de usuário", function () {
  cy.contains("p", "Cadastre um novo usuário").click();
});

Then("serei redirecionado para a página de cadastro", function () {
  cy.url().should("equal", baseURL + "novo");
});

When("aperto o botão ver detalhes", function () {
  cy.wait("@getUsers");
  cy.visit("/users");
  cy.get(pgPrincipal.anchorVerDetalhes).click();
});

Then("serei redirecionada para a página de detalhes", function () {
  cy.url().should(
    "equal",
    `https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/${userId}`
  );
});

Then("ali estarão as informações de id, nome e email do usuário", function () {
  cy.get(pagDetalhes.InputId).should("have.value", userId);
  cy.get(pagDetalhes.InputName).should("have.value", userName);
  cy.get(pagDetalhes.InputEmail).should("have.value", emailUser);
});
