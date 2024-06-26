import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import { PaginaDetalhes } from "../pages/PaginaDetalhes";

let pgDetalhes = new PaginaDetalhes();
let baseUrl = "https://rarocrud-frontend-88984f6e4454.herokuapp.com/users";
let emailUser;
let userId;
let userName;
let emailJaRegistrado;

Before(function () {
  cy.cadastrarUsuário().then(function (resposta) {
    emailUser = resposta.email;
    userId = resposta.id;
    userName = resposta.nome;
  });

  cy.intercept("GET", `api/v1/users/*`).as("paginaDetalhes");
});

Before({ tags: "@usuarioJaExistente" }, function () {
  cy.cadastrarUsuário().then(function (resposta) {
    emailJaRegistrado = resposta.email;
  });
});

After({ tags: "@apagarUsuarioJaExistente" }, function () {
  cy.deletarUsuario(userId);
});

After(function () {
  cy.deletarUsuario(userId);
});

Given("que acessei a página de detalhes do usuário desejado", function () {
  cy.visit(`/users/${userId}`);
  cy.wait("@paginaDetalhes");
});

When("clico no botão editar", function () {
  pgDetalhes.clicarBotaoEditar();
});

When(
  "altero o nome e email do usuário {string}, {string}",
  function (novoNome, novoEmail) {
    pgDetalhes.apagarNome();
    pgDetalhes.apagarEmail();
    pgDetalhes.mudarNome(novoNome);
    pgDetalhes.mudarEmail(novoEmail);
  }
);

When("clico no botão salvar", function () {
  pgDetalhes.clicarBotaoSalvar();
});

When("clico no botão de cancelar", function () {
  cy.contains("Cancelar").click();
});

When("digito o email de um usuário já cadastrado", function () {
  pgDetalhes.apagarEmail();
  pgDetalhes.mudarEmail(emailJaRegistrado);
});

When("digito um nome com 101 caracteres", function () {
  let nomeCriado = "";
  for (let i = 1; i <= 101; i++) {
    nomeCriado += "a";
  }

  cy.get(pgDetalhes.InputName).type(nomeCriado);
});

When("digito um email com 60 caracteres", function () {
  pgDetalhes.apagarEmail();
  let emailCriado = "nomeutilizado@dominio.com";
  for (let i = 1; i <= 35; i++) {
    emailCriado += "m";
  }

  cy.get(pgDetalhes.InputEmail).type(emailCriado);
});

When("apago o nome", function () {
  pgDetalhes.apagarNome();
});

When("apago o email", function () {
  pgDetalhes.apagarEmail();
});

When("informo um nome inválido {string}", function (nomelInvalido) {
  pgDetalhes.mudarNome(nomelInvalido);
});

When("informo um nome com menos de 3 caracteres", function () {
  pgDetalhes.mudarNome("Ana");
});

When("escrevo um id inexistente na URL", function () {
  cy.visit(baseUrl + "/9823342abcds");
});

When("digito um nome com 100 caracteres", function () {
  pgDetalhes.apagarNome();
  let nomeCriado = "";
  for (let i = 1; i <= 100; i++) {
    nomeCriado += "a";
  }

  cy.get(pgDetalhes.InputName).type(nomeCriado);
});

When("digito um email com 61 caracteres", function () {
  pgDetalhes.apagarEmail();
  let emailCriado = "email@.com";
  for (let i = 1; i <= 51; i++) {
    emailCriado += "m";
  }

  cy.get(pgDetalhes.InputEmail).type(emailCriado);
});

When("informo um email inválido {string}", function (emailIvalido) {
  pgDetalhes.mudarEmail(emailIvalido);
});

Then(
  "deverá aparecer uma mensagem de sucesso dizendo {string}",
  function (mensagem) {
    cy.contains(mensagem).should("exist");
  }
);

Then(
  "o usuário será redirecionado para a página principal do site",
  function () {
    cy.url().should("equal", baseUrl);
  }
);

Then("o nome do card deverá ser {string}", function (nome) {
  cy.contains("p", "Nome:")
    .invoke("text")
    .should("be.equal", "Nome: " + nome);
});

Then("o email deverá ser {string}", function (mensagem) {
  cy.contains("p", "E-mail:")
    .invoke("text")
    .should("be.equal", "E-mail: " + mensagem);
});

Then("os inputs de nome e email devem estar desabilitados", function () {
  cy.get(pgDetalhes.InputName).should("be.disabled");
  cy.get(pgDetalhes.InputEmail).should("be.disabled");
});

Then("os inputs nome e email ficarão habilitados", function () {
  cy.get(pgDetalhes.InputName).should("be.enabled");
  cy.get(pgDetalhes.InputEmail).should("be.enabled");
});

Then("o input de id permanecerá desabilitado", function () {
  cy.get(pgDetalhes.InputId).should("be.disabled");
});

Then("ele se torna um botão de cancelar", function () {
  cy.contains("Cancelar").should("exist");
});

Then("o botão de salvar se torna habilitado", function () {
  cy.get(pgDetalhes.buttonSalvar).should("be.enabled");
});

Then("ele volta a ser um botão de editar", function () {
  cy.contains("Editar").should("exist");
});

Then("o botão de salvar fica desabilitado", function () {
  cy.get(pgDetalhes.buttonSalvar).should("be.disabled");
});

Then("recebo a mensagem {string}", function (mensagemDeErro) {
  cy.contains("p", mensagemDeErro).should("exist");
});

Then("aparecerá uma mensagem dizendo {string}", function (mensagem) {
  cy.contains(mensagem).should("exist");
});

Then(
  "deveverá aparecer uma mensagem de erro dizendo {string}",
  function (mensagemDeErro) {
    cy.contains(mensagemDeErro).should("exist");
  }
);

Then("deverá aparecer uma mensagem dizendo: {string}", function (mensagem) {
  cy.contains("span", mensagem).should("be.visible");
});

Then("aparecerá uma mensagem dizendo: {string}", function (mensagem) {
  cy.contains("span", mensagem).should("be.visible");
});

Then("aparece o card {string}", function (mensagem) {
  cy.contains(mensagem).should("exist");
});
