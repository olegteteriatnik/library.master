import staticParams from '../../../params/constants';

export class AuthApiService {
    generateUserToken(userData) {
        return cy.request({
            method: 'POST',
            url: `${staticParams.baseUrl}${staticParams.routes.login}`,
            body: userData,
            headers: { 'Content-Type': 'application/json', },
        }).then((response) => {
            return response.body.token;
        });
    }
}
