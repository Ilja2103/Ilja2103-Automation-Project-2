describe('Time estimation functionality', () => {
    beforeEach(() => {
        visitBoard();
        cy.contains('This is an issue of type: Task.').should('be.visible').click();
    });
      });
    describe('Time estimation functionality', () => {
        const estimatedHours = '71';
        const newEstimatedHours = '66';
        const timeSpent = '86';
        const newTimeSpent = '67';
        const timeRemaining = '159';
        const newTimeRemaining = '172';
    
        const visitBoard = () => {
            cy.visit('/');
            cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
                cy.visit(url + '/board');
                cy.contains('This is an issue of type: Task.').click();
            });
        };
    
        const getIssueDetails = () => cy.get('[data-testid="modal:issue-details"]');
        const getTimeWindow = () => cy.get('[data-testid="modal:tracking"]');
    
        beforeEach(() => {
            visitBoard();
        });
    
        it('Should add, edit, and remove time estimation', () => {
            // ADDING ESTIMATION
            getIssueDetails().within(() => {
                cy.get('.sc-dxgOiQ.HrhWu').click().clear().type(estimatedHours).type('{enter}');
                cy.get('.sc-dxgOiQ.HrhWu').should('value', estimatedHours);
                cy.get('.sc-rBLzX.irwmBe').should('contain', estimatedHours);
                cy.get('.sc-bMvGRv.IstSR').click();
            });
    
            // ASSERT
            getTimeWindow().within(() => {
                cy.get('.sc-fhYwyz.jxvanQ').should('contain', estimatedHours);
                cy.get('[data-testid="icon:close"]').click().should('not.exist');
            });
    
            // EDITING ESTIMATION
            getIssueDetails().within(() => {
                cy.get('.sc-dxgOiQ.HrhWu').click().clear().type(newEstimatedHours).type('{enter}');
                cy.get('.sc-dxgOiQ.HrhWu').should('value', newEstimatedHours);
                cy.get('.sc-rBLzX.irwmBe').should('contain', newEstimatedHours);
                cy.get('.sc-bMvGRv.IstSR').click();
            });
    
            // ASSERT
            getTimeWindow().within(() => {
                cy.get('.sc-fhYwyz.jxvanQ').should('contain', newEstimatedHours);
                cy.get('[data-testid="icon:close"]').click().should('not.exist');
            });
    
            // DELETING ESTIMATION
            getIssueDetails().within(() => {
                cy.get('.sc-dxgOiQ.HrhWu').click().clear().type('{enter}');
                cy.get('.sc-dxgOiQ.HrhWu').should('be.empty');
                cy.get('.sc-rBLzX.irwmBe').find('div').should('have.length', 1);
                cy.get('.sc-bMvGRv.IstSR').click();
            });
    
            // ASSERT
            getTimeWindow().within(() => {
                cy.get('.sc-rBLzX.irwmBe').find('div').should('have.length', 1);
                cy.get('[data-testid="icon:close"]').click().should('not.exist');
            });
        });
    
        it('Should add, edit, and remove time spent and remaining', () => {
            // ADD TIME SPENT AND REMAINING
            getIssueDetails().within(() => {
                cy.get('.sc-bMvGRv.IstSR').click();
            });
    
            getTimeWindow().within(() => {
                cy.get('input[placeholder="Number"]').first().click().clear().type(timeSpent);
                cy.get('input[placeholder="Number"]').eq(1).clear().type(timeRemaining);
            });
    
            getTimeWindow().within(() => {
                cy.contains('button', 'Done').click().should('not.exist');
            });
    
            // ASSERT
            cy.get('.sc-rBLzX.irwmBe').should('contain', timeSpent).and('contain', 'logged');
            cy.get('.sc-rBLzX.irwmBe').should('contain', timeRemaining).and('contain', 'remaining');
    
            // EDIT TIME SPENT AND REMAINING
            getIssueDetails().within(() => {
                cy.get('.sc-bMvGRv.IstSR').click();
            });
    
            getTimeWindow().within(() => {
                cy.get('input[placeholder="Number"]').first().should('have.value', timeSpent).clear().type(newTimeSpent);
                cy.get('input[placeholder="Number"]').eq(1).should('have.value', timeRemaining).clear().type(newTimeRemaining);
            });
    
            getTimeWindow().within(() => {
                cy.contains('button', 'Done').click().should('not.exist');
            });
    
            // ASSERT
            cy.get('.sc-rBLzX.irwmBe').should('contain', newTimeSpent).and('contain', 'logged');
            cy.get('.sc-rBLzX.irwmBe').should('contain', newTimeRemaining).and('contain', 'remaining');
    
            // DELETE TIME SPENT AND REMAINING
            getIssueDetails().within(() => {
                cy.get('.sc-bMvGRv.IstSR').click();
            });
    
            getTimeWindow().within(() => {
                cy.get('input[placeholder="Number"]').first().click().clear();
                cy.get('input[placeholder="Number"]').eq(1).click().clear();
            });
    
            getTimeWindow().within(() => {
                cy.contains('button', 'Done').click().should('not.exist');
            });
    
            // ASSERT
            cy.get('.sc-rBLzX.irwmBe').should('contain', 'No time logged');
            getIssueDetails().within(() => {
                cy.get('[class="sc-dxgOiQ HrhWu"]').click().clear().type('{enter}');
                cy.get('.sc-dxgOiQ.HrhWu').should('be.empty');
            });
            cy.get('.sc-rBLzX.irwmBe').find('div').should('have.length', 1);
        });
    });