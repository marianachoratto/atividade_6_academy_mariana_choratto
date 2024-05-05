import {
  Given,
  When,
  Then,
  After,
  But,
} from "cypress-cucumber-preprocessor/steps";
import { PaginaDeCastrato } from "../pages/CadastrarUsuarios";
let cadastroUsuario = new PaginaDeCastrato();
let userId;

Given("que acessei a funcionalidade de cadastro", function () {
  cy.visit("/users/novo");
  cy.intercept("POST", "/api/v1/users").as("criarUsuario");
});

When("informo um nome e email válido", function () {
  cadastroUsuario.typeNome();
  cadastroUsuario.typeEmail();
});

When("clico no botão salvar", function () {
  cadastroUsuario.clickcadastrar();
  cy.wait("@criarUsuario").then(function (resposta) {
    userId = resposta.response.body.id;
  });
});

Then("tenho um usuário cadastrado", function () {
  cy.contains("Usuário salvo com sucesso!").should("be.visible");
});

after({ tags: "@criarUsuarioNoBd" }, function () {
  cy.deletarUsuario(userId);
});

When("informo um email válido", function () {
  cadastroUsuario.typeEmail();
});

But("não informo um nome", function () {});

Then("não é possível cadastrar o usuário sem nome", function () {
  cy.contains("span", "O campo nome é obrigatório.").should("be.visible");
});

When("informo um nome válido", function () {
  cadastroUsuario.typeNome();
});

But("não informo um email", function () {});

When("clico no botão de cadastrar", function () {
  cadastroUsuario.clickcadastrar();
});

Then("não é possível cadastrar o usuário sem email", function () {
  cy.contains("span", "O campo e-mail é obrigatório.").should("be.visible");
});

When("não informo um nome", function () {});

When("não é possível cadastrar o usuário sem nome e email", function () {
  cy.contains("span", "O campo nome é obrigatório.").should("be.visible");
  cy.contains("span", "O campo e-mail é obrigatório.").should("be.visible");
});

But("informo um email inválido {string}", function (emailInvalido) {
  cy.get("input#email").type(emailInvalido);
});

Then(
  "aparecerá uma mensagem dizendo que o formato do email é inválido",
  function () {
    cy.contains("span", "Formato de e-mail inválido").should("be.visible");
  }
);

When("informo um nome inválido {string}", function (nomelInvalido) {
  cy.get("input#name").type(nomelInvalido);
});

Then(
  "aparecerá uma mensagem dizendo que o formato do nome é inválido",
  function () {
    cy.contains("span", "Formato do nome é inválido.").should("be.visible");
  }
);
