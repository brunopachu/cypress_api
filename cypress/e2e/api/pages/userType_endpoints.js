
import { faker } from '@faker-js/faker'

module.exports = {

     CreateAndDelete() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            
            cy.request({ // Cria um novo tipo de usuário
                method: 'POST',
                url: Cypress.env('url').userType,
                headers: headers,
                body: {
                    name: faker.string.alpha(10),
                    clients: faker.datatype.boolean(0.5),
                    sells: faker.datatype.boolean(0.5),
                    cash_flow_control: faker.datatype.boolean(0.5),
                    marketing: faker.datatype.boolean(0.5),
                    leads: faker.datatype.boolean(0.5)
                    }
            }).then((response)=>{ 
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
                expect(response.body.data).is.not.empty
                })                                
            
// A PARTIR DAQUI APAGA O TIPO DE USUÁRIO QUE FOI CRIADO EXCLUSIVAMENTE PARA O TESTE

            cy.request({ // lista todos os tipos de usuários existentes
                method: 'GET', 
                url: Cypress.env('url').userType,
                headers: headers

            }).then((response)=>{ // apaga o tipo de usuário criado exclusivamente para o teste
                cy.request({
                    method: 'DELETE', 
                    url: `${Cypress.env('url').userType}${response.body.data[0].id}`, // pega o último tipo de usuário da lista, que foi criado acima, e o apaga
                    headers: headers  
            }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body).is.not.empty // garante que o body.data contém propriedades e não está vazio
            })         
        })
    })    
},
    
    List() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            
            cy.request({ // lista todos os tipos de usuário existentes
                method: 'GET', 
                url: Cypress.env('url').userType,
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
            url: Cypress.env('url').userType, // lista os tipos de usuário existentes
            headers: headers
        })
          .then((response)=>{
          
            cy.request({
              method: 'GET', 
              url: `${Cypress.env('url').userType}${response.body.data[0].id}`, // pega o primeiro tipo de usuário da lista e mostra-o
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
                url: Cypress.env('url').userType, // lista todos os tipos de usuário existentes
                headers: headers

            }).then((response)=>{
          
              cy.request({
              method: 'PUT', 
              url: `${Cypress.env('url').userType}${response.body.data[0].id}`, // pega o último tipo de usuário listado e o edita (sem alterar nenhum dado)
              headers: headers,
              body: {
          
                name: response.body.data[0].name,
                clients: response.body.data[0].clients,
                sells: response.body.data[0].sell,
                cash_flow_control: response.body.data[0].cash_flow_control,
                marketing: response.body.data[0].marketing,
                leads: response.body.data[0].leads,
                
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