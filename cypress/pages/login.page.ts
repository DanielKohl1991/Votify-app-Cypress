export class LoginPage {
  private static readonly emailInputSel = `[data-testid="emailInput"] [type="email"]`;
  private static readonly pwdInputSel = `[data-testid="passwordInput"]`;
  private static readonly loginConfirmButtonSel = `[data-testid="submitAction"]`;

  static assertLoginPage(): void {
    cy.get(this.emailInputSel).should('exist');
    cy.get(this.loginConfirmButtonSel).should('exist');
  }

  static setEmail(email: string): void {
    cy.get(this.emailInputSel).type(email);
  }

  static setPwd(pwd: string): void {
    cy.get(this.pwdInputSel).type(pwd);
  }

  static confirmLogin(): void {
    cy.get(this.loginConfirmButtonSel).click();
  }
}
