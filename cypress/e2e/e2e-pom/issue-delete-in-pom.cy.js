import IssueModal from "../../pages/IssueModal";

const issueTitle = "This is an issue of type: Task.";

describe("Issue delete", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("eq", `${Cypress.env("baseUrl")}project/board`).then((url) => {
      // Open issue detail modal with title from line 16
      cy.contains(issueTitle).click();
    });
  });

  it("Should delete issue", () => {
    // Click the delete button and confirm deletion
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();

    // Validate that the issue is not visible
    IssueModal.validateIssueVisibilityState(issueTitle, false);
  });

  it("Should cancel deletion process", () => {
    // Ensure the issue detail modal is visible
    IssueModal.getIssueDetailModal().should("be.visible");

    // Click the delete button, cancel deletion, and validate state
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();

    // Confirm that the confirmation dialog is not present
    cy.get('[data-testid="modal:confirmation-dialog"]').should("not.exist");

    // Close the detail modal and validate that the issue is still visible
    IssueModal.closeDetailModal();
    IssueModal.validateIssueVisibilityState(issueTitle, true);
  });
});
