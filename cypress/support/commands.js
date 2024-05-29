import { faker } from '@faker-js/faker'

Cypress.Commands.add('login', () => {

    cy.request({
        method: "POST",
        url: Cypress.env('url').login, // login está salvo na pastas cypress.config.js
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: {
            "email": Cypress.env('user_email'), // precisa ser digitado no momento da execução do teste
            "password": Cypress.env('user_password') // precisa ser digitado no momento da execução do teste
        }
    }).then((response) => {
        const token = response.body.token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        };
        
        cy.wrap(headers).as('headers'); // Salva os headers como um alias
    })
    

})



