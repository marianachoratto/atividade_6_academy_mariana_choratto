import {
  Given,
  When,
  Then,
  After,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";
import { PaginaDeCastrato } from "../pages/CadastrarUsuarios";
let cadastroUsuario = new PaginaDeCastrato();
let userId;
let nomeUser;
let emailUser;
let baseURL = "https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/";

Before({ tags: "@criarUsuarioNoBd" }, function () {
  cy.cadastrarUsuário().then(function (resposta) {
    emailUser = resposta.email;
    userId = resposta.id;
  });
});

After({ tags: "@deletarUsuario" }, function () {
  cy.deletarUsuario(userId);
});

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

When("informo um email já utilizado em outro cadastro", function () {
  cy.get(cadastroUsuario.inputEmail).type(emailUser);
});

When("clico no botão de salvar", function () {
  cadastroUsuario.clickcadastrar();
  cy.wait("@criarUsuario");
});

When("crio um usuário", function () {
  cadastroUsuario.typeNome();
  cadastroUsuario.typeEmail();
  cadastroUsuario.clickcadastrar();
  cy.wait("@criarUsuario").then(function (resposta) {
    userId = resposta.response.body.id;
  });
});

When("vejo a confirmação de que o usuário foi salvo", function () {
  cy.contains("Usuário salvo com sucesso!").should("be.visible");
});

When("informo um email válido", function () {
  cadastroUsuario.typeEmail();
});

When("informo um nome válido", function () {
  cadastroUsuario.typeNome();
});

When("clico no botão de cadastrar", function () {
  cadastroUsuario.clickcadastrar();
});

When("não informo um nome", function () {});

When("não é possível cadastrar o usuário sem nome e email", function () {
  cy.contains("span", "O campo nome é obrigatório.").should("be.visible");
  cy.contains("span", "O campo e-mail é obrigatório.").should("be.visible");
});

When("informo um nome inválido {string}", function (nomelInvalido) {
  cy.get(cadastroUsuario.inputName).type(nomelInvalido);
});

When("informo um nome com 100 caracteres", function () {
  let nomeCriado = "";
  for (let i = 1; i <= 100; i++) {
    nomeCriado += "a";
  }

  cy.get(cadastroUsuario.inputName).type(nomeCriado);
});

When("informo um nome com 101 caracteres", function () {
  let nomeCriado = "";
  for (let i = 1; i <= 101; i++) {
    nomeCriado += "a";
  }

  cy.get(cadastroUsuario.inputName).type(nomeCriado);
});

When("informo um nome com menos de 3 caracteres", function () {
  cy.get(cadastroUsuario.inputName).type("Ana");
});

When("informo um email com 61 caracteres", function () {
  let emailCriado = "email@.com";
  for (let i = 1; i <= 51; i++) {
    emailCriado += "m";
  }

  cy.get(cadastroUsuario.inputEmail).type(emailCriado);
});

When("não informo um nome", function () {});

When("não informo um email", function () {});

When("informo um email inválido {string}", function (emailInvalido) {
  cy.get(cadastroUsuario.inputEmail).type(emailInvalido);
});

Then("tenho um usuário cadastrado", function () {
  cy.contains("Usuário salvo com sucesso!").should("be.visible");
});

Then(
  "aparecerá uma mensagem informando que o email já foi utilizado",
  function () {
    cy.contains("Este e-mail já é utilizado por outro usuário.");
  }
);

Then("escrevo o id do usuário na URL", function () {
  cy.visit(`/users/${userId}`);
});

Then(
  "vejo se existe uma página de perfil para aquele usuário em específico",
  function () {
    cy.url().should("equal", baseURL + `${userId}`);
  }
);

Then("não é possível cadastrar o usuário sem nome", function () {
  cy.contains("span", "O campo nome é obrigatório.").should("be.visible");
});

Then("não é possível cadastrar o usuário sem email", function () {
  cy.contains("span", "O campo e-mail é obrigatório.").should("be.visible");
});

Then(
  "aparecerá uma mensagem dizendo que o formato do email é inválido",
  function () {
    cy.contains("span", "Formato de e-mail inválido").should("be.visible");
  }
);

Then(
  "aparecerá uma mensagem dizendo que o formato do nome é inválido",
  function () {
    cy.contains("span", "Formato do nome é inválido.").should("be.visible");
  }
);

Then(
  "aparecerá uma mensagem que dizendo que o nome só pode ter 100 caracteres",
  function () {
    cy.contains("Informe no máximo 100 caracteres para o nome").should("exist");
  }
);

Then(
  "aparecerá uma mensagem dizendo que o nome deve ter no mínimo 4 caracteres",
  function () {
    cy.contains("span", "Informe pelo menos 4 letras para o nome.").should(
      "exist"
    );
  }
);

Then(
  "aparecerá uma mensagem informando que o email suporta apenas 60 caracteres",
  function () {
    cy.contains("Informe no máximo 60 caracteres para o e-mail").should(
      "exist"
    );
  }
);
