
import { faker } from '@faker-js/faker'

module.exports = {

     CreateAndDelete() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            
            cy.request({ // Cria uma nova origem de lead
                method: 'POST',
                url: Cypress.env('url').leadsOrigin,
                headers: headers,
                body: {
                    name: faker.string.alpha(10),
                      }
            }).then((response)=>{ 
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('data')
                expect(response.body.data.id).is.not.empty // valida que foi criado um novo ID
                })                                
            
// A PARTIR DAQUI APAGA A ORIGEM DE LEAD QUE FOI CRIADA EXCLUSIVAMENTE PARA O TESTE

            cy.request({ // lista todas as origens de lead
                method: 'GET', 
                url: Cypress.env('url').leadsOrigin,
                headers: headers

            }).then((response)=>{ // apaga a origem de lead criada exclusivamente para o teste
                cy.request({
                    method: 'DELETE', 
                    url: `${Cypress.env('url').leadsOrigin}${response.body.data[0].id}`, // pega a última origem de lead da lista, que foi criada acima, e a apaga
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
            
            cy.request({
                method: 'GET', 
                url: Cypress.env('url').leadsOrigin,
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
            url: Cypress.env('url').leadsOrigin, // lista as origens de lead existentes
            headers: headers
        })
          .then((response)=>{
          
            cy.request({
              method: 'GET', 
              url: `${Cypress.env('url').leadsOrigin}${response.body.data[0].id}`, // pega a primeira origem de lead da lista e mostra-a
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
                url: Cypress.env('url').leadsOrigin, // lista as origens de lead existentes
                headers: headers

            }).then((response)=>{
          
              cy.request({
              method: 'PUT', 
              url: `${Cypress.env('url').leadsOrigin}${response.body.data[0].id}`, // pega a última origem de lead listada e a edita (sem alterar nenhum dado)
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