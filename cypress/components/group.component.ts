export class Group {
  private static readonly groupSel = `span:contains(Skupiny)+div`;
  private static readonly groupAddSel = `${this.groupSel} [type="button"]:contains(Přidat)`;
  private static readonly newGroupNameSel = `[placeholder="Napiště jméno skupiny"]`;
  private static readonly newGroupDescSel = `[placeholder="Popište skupinu"]`;
  private static readonly newGroupSaveSel = `[type="button"]:contains(Uložit)`;
  private static readonly allGroupsSel = `${this.groupSel} div:has(button)`;
  private static readonly groupDeleteSel = `${this.allGroupsSel}:not(:has(span:contains(Přidat)))`;
  private static readonly deleteBtnSel = `[type="button"]:has(span:contains(Smazat))`;

  static assertNumOfGroups(count: number): void {
    cy.get(this.groupDeleteSel).should('have.length', count);
  }

  static clickAddNewGroup(): void {
    cy.get(this.groupAddSel).click();
  }

  static createNewGroup(name: string, desc: string): void {
    this.clickAddNewGroup();
    cy.get(this.newGroupNameSel).type(name);
    cy.get(this.newGroupDescSel).type(desc);
    cy.get(this.newGroupSaveSel).click();
  }

  static deleteGroup(name: string): void {
    cy.get(`${this.allGroupsSel}:contains(${name}) button:last-child`).click();
    cy.get(this.deleteBtnSel).click();
  }

  static deleteAllGroups(): void {
    cy.get(`${this.groupDeleteSel} button:last-child`).each(($button) => {
      cy.wrap($button).click();
      cy.get(this.deleteBtnSel).click();
    });
  }
}
