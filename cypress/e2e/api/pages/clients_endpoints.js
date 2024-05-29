
import { faker } from '@faker-js/faker'


module.exports = {

     CreateAndDelete() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
          cy.request({
            method: 'GET',
            url: Cypress.env('url').users, // lista todos os usuários cadastrados - para uso do ID abaixo
            headers: headers

          }).then((response)=>{
            
            cy.request({ // cria um novo cliente com base no ID de usuário acima
                method: 'POST',
                url: Cypress.env('url').clients,
                headers: headers,
                body: {
                    user_id: "",
                    responsible_id: response.body.data[0].id, // pega o id do primeiro usuário da lista acima
                    photo: faker.image.avatar(),
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    phone_number: faker.phone.number(),
                    gender: faker.person.sex(),
                    birthday: faker.date.birthdate(),
                    address: faker.location.streetAddress(),
                    postal_code: faker.location.zipCode(),
                    client_status: "active",
                    locker: faker.string.alphanumeric(3),
                    notes: faker.string.alphanumeric(30),
                    iban: faker.finance.iban(),
                    tax_number: faker.string.numeric(9)
                }
              })
            }).then((response) => {

                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('data');
                expect(response.body.data).is.not.empty; // garante que o body.data contém propriedades e não está vazio
            })
      
      // A PARTIR DAQUI APAGA O CLIENTE QUE FOI CRIADO EXCLUSIVAMENTE PARA O TESTE

            cy.request({ // lista todos os clientes existentes
                method: 'GET', 
                url: Cypress.env('url').clients,
                headers: headers

                }).then((response)=>{
                  
                cy.request({
                    method: 'DELETE', 
                    url: `${Cypress.env('url').clients}${response.body.data[0].id}`, // pega o último cliente da lista, que foi criado acima, e o apaga
                    headers: headers  
                  }).then((response) => {

                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('data');
                    expect(response.body.data).is.not.empty; // garante que o body.data contém propriedades e não está vazio
                  
            })
        })
    })
    
    },
    
    List() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            
            cy.request({
                method: 'GET', 
                url: Cypress.env('url').clients, // lista todos os clientes existentes
                headers: headers
            }).then((response)=>{
                  
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
                expect(response.body.data).to.be.an('array').that.is.not.empty // garante que o body.data contém propriedades e não está vazio
          
              })

            })
        
        },

    Show() {

        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
        cy.request({
            method: 'GET', 
            url: Cypress.env('url').clients, // lista os clientes existentes
            headers: headers
        })
          .then((response)=>{
          
            cy.request({
              method: 'GET', 
              url: `${Cypress.env('url').clients}${response.body.data[0].id}`, // pega o primeiro cliente da lista e mostra-o
              headers: headers  
            })
            .then((response)=>{
        
              expect(response.status).to.eq(200)
              expect(response.body).to.have.property('data')
              expect(response.body.data).to.be.an('object').that.is.not.empty // garante que o body.data contém propriedades e não está vazio
        
          })
        })
    })
},

    Edit() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()

            cy.request({
                method: 'GET', 
                url: Cypress.env('url').clients, // lista todos os clientes existentes
                headers: headers

            }).then((response)=>{
          
              cy.request({
              method: 'PUT', 
              url: `${Cypress.env('url').clients}${response.body.data[0].id}`, // pega o último cliente listado e o edita (sem alterar nenhum dado)
              headers: headers,
              body: {
          
                "photo": response.body.data[0].photo,
                "name": response.body.data[0].name,
                "email": response.body.data[0].email,
                "phoneNumber": response.body.data[0].phoneNumber,
                "gender": response.body.data[0].gender,
                "birthday": response.body.data[0].birthday,
                "address": response.body.data[0].adress,
                "postal_code": response.body.data[0].postal_code,
                "client_status": response.body.data[0].client_status,
                "locker": response.body.data[0].locker,
                "notes": response.body.data[0].notes,
                "iban": response.body.data[0].iban,
                "tax_number": response.body.data[0].tax_number,
                "user": response.body.data[0].user,
                "responsible_id": response.body.data[0].responsible.id
              }
          
            })
              }).then((response)=>{
          
                  expect(response.status).to.eq(200)
                  expect(response.body).to.have.property('data')
                  expect(response.body.data).is.not.empty // garante que o body.data contém propriedades e não está vazio
          
              })

            })

    },

    
}
