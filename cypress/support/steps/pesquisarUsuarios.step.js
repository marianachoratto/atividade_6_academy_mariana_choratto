import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import { PaginaPrincipal } from "../pages/PaginaPrincipal";

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

Given("não tem nada escrito na barra de pesquisa", function () {});

Given("digito uma pesquisa no input", function () {
  pgPrincipal.digitarPesquisa();
});

When("digito um usuário existente na barra de pesquisa", function () {
  cy.get(pgPrincipal.inputDePesquisa).type(userName);
  cy.wait("@getPesquisa");
});

When(
  "digito o email de um usuário existente na barra de pesquisa",
  function () {
    cy.get(pgPrincipal.inputDePesquisa).type(emailUser);
    cy.wait("@getPesquisa");
  }
);

When("digito o id de um usuário existente na barra de pesquisa", function () {
  cy.get(pgPrincipal.inputDePesquisa).type(userId);
  cy.wait("@getPesquisa");
});

When("clico no botão de apagar", function () {
  cy.get(pgPrincipal.buttonsPesquisar).eq(1).click();
});

When(
  "digito o nome de um usuário inexistente {string}",
  function (idInexistente) {
    cy.get("input").type(idInexistente);
  }
);

When("clico no link de cadastrar usuário", function () {
  cy.contains("Cadastre um novo usuário").click();
});

Then("o site retorna o card do usuário pesquisado", function () {
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

Then("o site retorna a mensagem {string}", function (mensagem) {
  cy.contains("h3", mensagem).should("exist");
});

Then("nenhuma pesquisa será realizada", function () {
  cy.get("@getPesquisa").should("not.exist");
});

Then("devo ser direcionado para a página de cadastro de usuário", function () {
  cy.url().should("equal", baseURL + "novo");
});

Then("a pesquisa deve ser apagada do input", function () {
  cy.get(pgPrincipal.inputDePesquisa).should("be.empty");
});
