import { LoginPage } from '../pages/login.page';
import { Users } from '../pages/users.page';
import { Pagination } from '../components/pagination.component';
import { Group } from '../components/group.component';
import { pageUsers } from '../support/enums';
import { generatePaginationResponse } from '../fixtures/responses';

describe('Users page', () => {
  const email = Cypress.env('username');
  const pwd = Cypress.env('password');
  const url = 'https://app.votify.app/';

  beforeEach(() => {
    cy.viewport(2560, 1440);
  });

  describe('Pagination - mocked data, groups and selecting all users', () => {
    const paginationIntercept10 = generatePaginationResponse(10, 100);
    const paginationIntercept25 = generatePaginationResponse(25, 100);
    const paginationIntercept50 = generatePaginationResponse(50, 100);
    const paginationIntercept100 = generatePaginationResponse(100, 100);
    beforeEach(() => {
      cy.intercept(
        'POST',
        'https://api.votify.app/general/v1/users/search?page=0&size=100',
        paginationIntercept100
      );

      cy.intercept(
        'POST',
        'https://api.votify.app/general/v1/users/search?page=0&size=10',
        paginationIntercept10
      );

      cy.intercept(
        'POST',
        'https://api.votify.app/general/v1/users/search?page=0&size=25',
        paginationIntercept25
      );

      cy.intercept(
        'POST',
        'https://api.votify.app/general/v1/users/search?page=0&size=50',
        paginationIntercept50
      );

      cy.visit(url);
      LoginPage.assertLoginPage();
      LoginPage.setEmail(email);
      LoginPage.setPwd(pwd);
      LoginPage.confirmLogin();
      Users.goToUsers();
    });

    it('adding and deleting groups', () => {
      [
        ['Group1', 'Text1'],
        ['Group2', 'Text2'],
        ['Group3', 'Text3'],
      ].forEach((el) => {
        Group.createNewGroup(el[0], el[1]);
      });
      Group.assertNumOfGroups(3);
      Group.deleteGroup('Group1');
      Group.assertNumOfGroups(2);
      Group.deleteAllGroups();
      Group.assertNumOfGroups(0);
    });

    it('tick all users and check correct count', () => {
      Users.tickAllUsers();
      Users.assertTickAllUsers();
    });

    Object.values(pageUsers)
      .filter((value) => typeof value === 'number')
      .forEach((value) => {
        it(`should check correct users per page for selected option: ${value} rows`, () => {
          const nameToNum = Number(value);
          Pagination.changeNumberOfRows(nameToNum);
          Pagination.assertRows(nameToNum);
          Users.assertNumOfUsers(nameToNum);
        });
      });
  });

  describe('User interactions - real data', () => {
    beforeEach(() => {
      cy.visit(url);
      LoginPage.assertLoginPage();
      LoginPage.setEmail(email);
      LoginPage.setPwd(pwd);
      LoginPage.confirmLogin();
      Users.goToUsers();
    });

    it('should delete all users', () => {
      //This test will always fail, because its not possible to delete users (dont know if because of bug or admin rights)
      Users.assertNumOfUsers(5);
      Users.tickAllUsers();
      Users.clickDeleteUserButton();
      Users.assertNumOfUsers(0);
    });

    it.skip('it should create new user', () => {
      //Test is skipped because since I cant delete all users before test, I dont want to create new ones
      Users.assertNumOfUsers(4);
      Users.createUser('new1@email.cz');
      Users.assertNumOfUsers(5);
    });

    it('it should not create new user if email is in wrong format', () => {
      Users.createUser('new1');
      Users.assertInvalidFormat();
    });
    it('it should change number of vote shares and check their count', () => {
      Users.changeUserProps('new1@email.cz');
      Users.assertNumOfShareCountUsed(0);
      Users.assertNumOfShareCountAvailable(2);
      Users.changeShares(1);
      Users.assertSaveSuccess();

      Users.changeUserProps('new1@email.cz');
      Users.assertNumOfShareCountUsed(1);
      Users.assertNumOfShareCountAvailable(1);
      Users.changeShares(0);
      Users.assertSaveSuccess();
    });
  });
});
