
import { faker } from '@faker-js/faker'

module.exports = {

     CreateAndDelete() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            cy.request({
                method: 'GET', 
                url: Cypress.env('url').userType, // lista todos os tipos de usuários existentes
                headers: headers

        }).then((response)=>{
              
            cy.request({ // Cria um novo usuário a partir do tipo de usuário listado acima
                method: 'POST',
                url: Cypress.env('url').users,
                headers: headers,
                body: {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    status: "active",
                    phone_number: faker.phone.number(),
                    user_type_id: response.body.data[0].id
                    }
                })
            
            }).then((response)=>{ 
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
                expect(response.body.data).is.not.empty
                })                                
            
// A PARTIR DAQUI APAGA O USUÁRIO QUE FOI CRIADO EXCLUSIVAMENTE PARA O TESTE

            cy.request({ // lista todos os usuários existentes
                method: 'GET', 
                url: Cypress.env('url').users,
                headers: headers

            }).then((response)=>{ // apaga o usuário criado exclusivamente para o teste
                cy.request({
                    method: 'DELETE', 
                    url: `${Cypress.env('url').users}${response.body.data[0].id}`, // pega o último usuário da lista, que foi criado acima, e o apaga
                    headers: headers  
            }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body).is.not.empty
            })
            
        })

    })
    
    },
    
    List() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            
            cy.request({ // lista todos os usuários existentes
                method: 'GET', 
                url: Cypress.env('url').users,
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
            url: Cypress.env('url').users, // lista todos os usuários existentes
            headers: headers
        })
          .then((response)=>{
          
            cy.request({
              method: 'GET', 
              url: `${Cypress.env('url').users}${response.body.data[0].id}`, // pega o primeiro usuário da lista e mostra-o
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
                url: Cypress.env('url').users, // lista todos os usuários existentes
                headers: headers

            }).then((response)=>{
          
              cy.request({
              method: 'PUT', 
              url: `${Cypress.env('url').users}${response.body.data[0].id}`, // pega o último usuário listado e o edita (sem alterar nenhum dado)
              headers: headers,
              body: {
          
                name: response.body.data[0].name,
                email: response.body.data[0].email,
                password: response.body.data[0].password,
                status: response.body.data[0].status,
                phone_number: response.body.data[0].phone_number,
                user_type_id: response.body.data[0].userType.id
                
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