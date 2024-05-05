import { faker } from "@faker-js/faker";

export class PaginaDeCastrato {
  inputName = "input#name";
  inputEmail = "input#email";
  buttonSave = '[type="submit"]';
  anchorRaro = '[href="/users"]';
  anchorVoltar = "a img";

  pgDetalhesInputName = "[name='name']";
  pgDetalhesInputEmail = "[name='email']";
  pgDetalhesInputId = "[name='id']";

  typeNome() {
    let nome = "faker" + faker.person.firstName();
    cy.get(this.inputName).type(nome);
  }

  typeEmail() {
    let email = faker.internet.email();
    cy.get(this.inputEmail).type(email);
  }

  clickcadastrar() {
    cy.get(this.buttonSave).click();
  }

  voltarPaginaInicial() {
    cy.get(this.anchorVoltar).click();
  }

  voltarLinkRaro() {
    cy.get(this.anchorRaro).click();
  }
}
