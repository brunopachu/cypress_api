
import { faker } from '@faker-js/faker'

module.exports = {

     CreateAndDelete() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            
            cy.request({ // Cria um novo cliente para receber os dados de ICE
                method: 'POST',
                url: Cypress.env('url').clients,
                headers: headers,
                body: {

                    user_id:"",
                    responsible_id: Cypress.env('responsibleId'),
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
                                
            cy.request({ // lista todos os clientes existentes
                method: 'GET', 
                url: Cypress.env('url').clients,
                headers: headers

            }).then((response)=>{
                
                cy.request({ // Cria um novo dado ICE dentro do cliente recém criado
                    method: 'POST', 
                    url: Cypress.env('url').clientMedical,
                    headers: headers,
                    body: {
                        client_id: response.body.data[0].id,
                        health_number: faker.number.int({ min: 100, max: 999999999 }),
                        notes: faker.string.alphanumeric(30),
                        ice_number: faker.number.int({ min: 100, max: 999999999 }),
                        ice_relation: faker.string.alpha(8)
                        }
                    }).then((response)=>{

                            expect(response.status).to.eq(200)
                            expect(response.body).to.have.property('data')
                            expect(response.body.data).is.not.empty // garante que o body.data contém propriedades e não está vazio
                    })
            })

// A PARTIR DAQUI APAGA O CLIENTE E O ICE QUE FORAM CRIADOS EXCLUSIVAMENTE PARA O TESTE

            cy.request({ // lista todos os clientes existentes
                method: 'GET', 
                url: Cypress.env('url').clients,
                headers: headers

            }).then((response)=>{ // apaga o cliente criado exclusivamente para o teste
                cy.request({
                    method: 'DELETE', 
                    url: `${Cypress.env('url').clients}${response.body.data[0].id}`, // pega o último cliente da lista que foi criado acima e o apaga
                    headers: headers  
            }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
                expect(response.body.data).is.not.empty
            })
            
        })

        cy.request({ // lista todos os dados de ICE
            method: 'GET', 
            url: Cypress.env('url').clientMedical,
            headers: headers

        }).then((response)=>{ // apaga o dado de ICE criado exclusivamente para o teste
            cy.request({
                method: 'DELETE', 
                url: `${Cypress.env('url').clientMedical}${response.body.data[0].id}`, // pega o último dado de ICE da lista, que foi criado acima, e o apaga
                headers: headers  
        })
        })
    })
    
    },
    
    List() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            
            cy.request({
                method: 'GET', 
                url: Cypress.env('url').clientMedical,
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
            url: Cypress.env('url').clientMedical, // lista os dados de ICE existentes
            headers: headers
        })
          .then((response)=>{
          
            cy.request({
              method: 'GET', 
              url: `${Cypress.env('url').clientMedical}${response.body.data[0].id}`, // pega o primeiro dado de ICE da lista e mostra-o
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
                url: Cypress.env('url').clientMedical, // lista todos os dados de ICE
                headers: headers

            }).then((response)=>{
          
              cy.request({
              method: 'PUT', 
              url: `${Cypress.env('url').clientMedical}${response.body.data[0].id}`, // pega o último dado de ICE listado e o edita (sem alterar nenhum dado)
              headers: headers,
              body: {
          
                client_id: response.body.data[0].client.id,
                health_number: response.body.data[0].health_number,
                notes: response.body.data[0].notes,
                ice_number: response.body.data[0].ice_number,
                ice_relation: response.body.data[0].ice_relation,
                client_id:response.body.data[0].client.id,
                health_number: response.body.data[0].health_number,
                notes: response.body.data[0].notes,
                ice_number: response.body.data[0].ice_number,
                ice_relation: response.body.data[0].ice_relation
              }
          
            })
              }).then((response)=>{
          
                  expect(response.status).to.eq(200)
                  expect(response.body).to.have.property('data')
                  expect(response.body.data).is.not.empty // garante que o body.data contém propriedades e não está vazio
          
              })

            })

    

    
    }
}