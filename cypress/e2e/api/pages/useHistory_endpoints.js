
import { faker } from '@faker-js/faker'

module.exports = {

     CreateAndDelete() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            
            cy.request({ // Cria um novo hitórico de utilização
                method: 'POST',
                url: Cypress.env('url').useHistory,
                headers: headers,
                body: {
                    length_stay: '02:05:10',
                    client_id: Cypress.env('clientId')
                    }
            }).then((response)=>{ 
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
                expect(response.body.data.id).is.not.empty
                })                                
            
// A PARTIR DAQUI APAGA O HISTÓRICO DE UTILIZAÇÃO QUE FOI CRIADO EXCLUSIVAMENTE PARA O TESTE

            cy.request({ // lista todos os históricos de utilização existentes
                method: 'GET', 
                url: Cypress.env('url').useHistory,
                headers: headers

            }).then((response)=>{ // apaga o histórico de utilização criado exclusivamente para o teste
                cy.request({
                    method: 'DELETE', 
                    url: `${Cypress.env('url').useHistory}${response.body.data[0].id}`, // pega o último histórico de utilização da lista, que foi criado acima, e o apaga
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
            
            cy.request({ // lista todos os históricos de utilização existentes
                method: 'GET', 
                url: Cypress.env('url').useHistory,
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
            url: Cypress.env('url').useHistory, // lista os históricos de utilização existentes
            headers: headers
        })
          .then((response)=>{
          
            cy.request({
              method: 'GET', 
              url: `${Cypress.env('url').useHistory}${response.body.data[0].id}`, // pega o primeiro histórico de utilização da lista e mostra-o
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
                url: Cypress.env('url').useHistory, // lista todos os históricos de utilização existentes
                headers: headers

            }).then((response)=>{
          
              cy.request({
              method: 'PUT', 
              url: `${Cypress.env('url').useHistory}${response.body.data[0].id}`, // pega o último histórico de utilização listado e o edita (sem alterar nenhum dado)
              headers: headers,
              body: {
          
                length_stay: response.body.data[0].length_stay,
                client_id: response.body.data[0].client.id
                
              }
          
            })
              }).then((response)=>{
          
                  expect(response.status).to.eq(200)
                  expect(response.body).to.have.property('data')
                  expect(response.body.data.id).is.not.empty // garante que o body.data contém propriedades e não está vazio
          
              })

            })

    

    
    }
}