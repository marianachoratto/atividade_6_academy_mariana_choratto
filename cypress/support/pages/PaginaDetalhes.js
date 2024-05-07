export class PaginaDetalhes {
  InputName = "[name='name']";
  InputEmail = "[name='email']";
  InputId = "[name='id']";
  buttonEditar = '[type="button"]';
  buttonSalvar = '[type="submit"]';

  mudarNome(nomeAlterado) {
    cy.get(this.InputName).type(nomeAlterado);
  }

  mudarEmail(emailAlterado) {
    cy.get(this.InputEmail).type(emailAlterado);
  }

  clicarBotaoEditar() {
    cy.get(this.buttonEditar).click();
  }

  clicarBotaoSalvar() {
    cy.get(this.buttonSalvar).click();
  }

  apagarNome() {
    cy.get(this.InputName).clear();
  }

  apagarEmail() {
    cy.get(this.InputEmail).clear();
  }
}
