import staticParams from '../../../params/constants';

export class BooksApiService {
    search(userAccessToken, data) {
        return cy.request({
            method: 'GET',
            url: `${staticParams.baseUrl}${staticParams.routes.books.search}`,
            qs: data,
            headers: { Authorization: `Bearer ${userAccessToken}` },
        }).then((response) => response.body);
    }

    create(userAccessToken, data) {
        return cy.request({
            method: 'POST',
            url: `${staticParams.baseUrl}${staticParams.routes.books.create}`,
            headers: { Authorization: `Bearer ${userAccessToken}` },
            body: data,
        }).then((response) => response.body);
    }

    delete(userAccessToken, id) {
        return cy.request({
            method: 'DELETE',
            url: `${staticParams.baseUrl}${staticParams.routes.books.delete}`,
            headers: { Authorization: `Bearer ${userAccessToken}` },
            body: { id },
        }).then(() => true);
    }
}
