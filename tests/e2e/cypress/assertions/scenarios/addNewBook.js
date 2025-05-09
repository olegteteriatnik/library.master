import data from '../../data/scenarios/addNewBook';

const { generateExpectedBookData } = data;

function assertCreatedBookMatchesExpected() {
    cy.get('@createdBook').then((createdBook) => {
        const expected = generateExpectedBookData(createdBook.id);
        expect(createdBook).to.deep.equal(expected);
    });
}

export default {
    assertCreatedBookMatchesExpected,
};
