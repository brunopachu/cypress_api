
import { faker } from '@faker-js/faker'

module.exports = {

     CreateAndDelete() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            
            cy.request({ // Cria um novo tipo de documento
                method: 'POST',
                url: Cypress.env('url').documentType,
                headers: headers,
                body: {
                    name: faker.string.alpha(15)
                    }
            }).then((response)=>{ 
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
                expect(response.body.data).is.not.empty // garante que o body.data contém propriedades e não está vazio
                })                                
            
// A PARTIR DAQUI APAGA O TIPO DE DOCUMENTO QUE FOI CRIADO EXCLUSIVAMENTE PARA O TESTE

            cy.request({ // lista tods os tipos de documento existentes
                method: 'GET', 
                url: Cypress.env('url').documentType,
                headers: headers

            }).then((response)=>{ // apaga o tipo de documento criado exclusivamente para o teste
                cy.request({
                    method: 'DELETE', 
                    url: `${Cypress.env('url').documentType}${response.body.data[0].id}`, // pega o último tipo de documento da lista, que foi criado acima, e o apaga
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
            
            cy.request({ // lista todos os tipos de documentos existentes
                method: 'GET', 
                url: Cypress.env('url').documentType,
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
            url: Cypress.env('url').documentType, // lista os tipos de documento existentes
            headers: headers
        })
          .then((response)=>{
          
            cy.request({
              method: 'GET', 
              url: `${Cypress.env('url').documentType}${response.body.data[0].id}`, // pega o primeiro tipo de documento da lista e mostra-o
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
                url: Cypress.env('url').documentType, // lista todos os tipos de documentos existentes
                headers: headers

            }).then((response)=>{
          
              cy.request({
              method: 'PUT', 
              url: `${Cypress.env('url').documentType}${response.body.data[0].id}`, // pega o último tipo de documento listado e o edita (sem alterar nenhum dado)
              headers: headers,
              body: {
          
                name: response.body.data[0].name,
                
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