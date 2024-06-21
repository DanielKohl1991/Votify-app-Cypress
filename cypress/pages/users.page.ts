export class Users {
  private static readonly usersSel = `li > [data-testid="goToUsersLayoutAction"]`;
  private static readonly tableSel = `tbody tr`;
  private static readonly tickAllSel = `table > thead > tr > th:has(input)`;
  private static readonly deleteBtnSel = `[type="button"][title="Smazat"]`;
  private static readonly deleteBtnConfirmSel = `[type="button"]:has(span:contains(Smazat))`;
  private static readonly addUserSel = `[type="button"]:has(span:contains(Přidat uživatele))`;
  private static readonly saveBtnConfirmSel = `[type="button"]:has(span:contains(Uložit))`;
  private static readonly invalidFormatSel = `span:contains(Některá položka má nevalidní formát)`;
  private static readonly succesSaveSel = `span:contains(Uloženo)`;

  static assertTickAllUsers(): void {
    cy.get(this.tableSel).each(($user) => {
      cy.wrap($user).find('input[type="checkbox"]').should('be.checked');
    });
    cy.get('div:contains(100 vybraných položek)').should('exist');
  }

  static assertNumOfUsers(count: number): void {
    cy.get(this.tableSel).should('have.length', count);
  }

  static assertInvalidFormat(): void {
    cy.get(this.invalidFormatSel).should('exist');
  }

  static assertSaveSuccess(): void {
    cy.get(this.succesSaveSel).should('exist');
  }

  static assertNumOfShareCountUsed(count: number): void {
    cy.get(`span:contains(použité)`)
      .parent()
      .prev()
      .then(($prevDiv) => {
        cy.wrap($prevDiv).should('have.text', count);
      });
  }
  static assertNumOfShareCountAvailable(count: number): void {
    cy.get(`span:contains(k dispozici)`)
      .parent()
      .prev()
      .then(($prevDiv) => {
        cy.wrap($prevDiv).should('have.text', count);
      });
  }

  static goToUsers(): void {
    cy.get(this.usersSel).click();
  }

  static tickAllUsers(): void {
    cy.get(this.tickAllSel).click();
  }

  static tickOneUser(): void {
    cy.get(`${this.tableSel}:has(input)`).click();
  }

  static createUser(name: string): void {
    cy.get(this.addUserSel).click({ multiple: true });
    cy.get(`[placeholder="name@gmail.com"]`).type(name);
    cy.get(this.saveBtnConfirmSel).click();
  }

  static clickDeleteUserButton(): void {
    cy.get(this.deleteBtnSel).click();
    cy.get(this.deleteBtnConfirmSel).click();
  }

  static changeUserProps(username: string): void {
    cy.get(`${this.tableSel}:contains(${username}) [title="Upravit"]`).click();
  }

  static changeShares(shares: number): void {
    cy.get(`input[name="shares"]`).clear().type(shares.toString());
    cy.get(this.saveBtnConfirmSel).click();
  }
}
