export class Pagination {
  private static readonly paginationSel = `span:contains(Řádků):contains(100)`;
  private static readonly rowsSel = `span:contains(Řádky na stránku) + span`;
  private static readonly menuItemSel = `[role="menuitem"]`;

  static assertRows(index: number): void {
    cy.get(this.paginationSel).should('have.text', `Řádků 1-${index} z 100`);
  }
  static changeNumberOfRows(index: number): void {
    cy.get(this.rowsSel).click();
    cy.get(this.menuItemSel).contains(index).click();
  }
}
