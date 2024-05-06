import { Given, When, Then, Before } from "cypress-cucumber-preprocessor/steps";
import { PaginaPrincipal } from "../pages/PaginaPrincipal";
import { PaginaDetalhes } from "../pages/PaginaDetalhes";

let pgPrincipal = new PaginaPrincipal();
let pagDetalhes = new PaginaDetalhes();
let baseURL = "https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/";

Before({ tags: "@tag6Usuarios" }, function () {
  cy.intercept("GET", "/api/v1/users", {
    statusCode: 200,
    fixture: "lista6Usuarios.json",
  }).as("intercept6Usuarios");
});

Then("que acessei a página principal", function () {
  cy.visit("/users");
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
