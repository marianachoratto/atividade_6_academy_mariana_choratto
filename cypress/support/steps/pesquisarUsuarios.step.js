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
let baseURL = "https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/";
let emailUser;
let userId;
let userName;

Before({ tags: "@createUser" }, function () {
  cy.cadastrarUsuário().then(function (resposta) {
    emailUser = resposta.email;
    userId = resposta.id;
    userName = resposta.nome;
  });
});

After({ tags: "@deletarUsuario" }, function () {
  cy.deletarUsuario(userId);
});

Given("que acessei a página principal", function () {
  cy.visit("/users");
  cy.intercept("GET", "/api/v1/search?value=*").as("getPesquisa");
});

When("digito um usuário existente na barra de pesquisa", function () {
  cy.get(pgPrincipal.inputDePesquisa).type(userName);
  //   cy.wait("@getPesquisa");
});

Then("o site me retorna o card do usuário pesquisado", function () {
  cy.get(pgPrincipal.divDadosUsuarios).should("have.length", 1);
});

Then("o nome e email do usuário pesquisado", function () {
  cy.contains("Nome:")
    .invoke("text")
    .should("be.equal", "Nome: " + userName);
  cy.contains("E-mail:")
    .invoke("text")
    .then(function (email) {
      let emailCorreto = email
        .split("E-mail: ")
        .toString()
        .split("...")
        .toString()
        .split(",")[1];

      expect(emailUser.includes(emailCorreto)).to.equal(true);
    });
});
