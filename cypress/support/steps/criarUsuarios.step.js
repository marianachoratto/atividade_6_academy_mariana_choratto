import { Given, When, Then, After } from "cypress-cucumber-preprocessor/steps";
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

after(function () {
  cy.deletarUsuario(userId);
});
