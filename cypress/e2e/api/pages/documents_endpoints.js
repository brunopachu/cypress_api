
import { faker } from '@faker-js/faker'

module.exports = {

     CreateAndDelete() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            cy.request({
                method: 'GET', 
                url: Cypress.env('url').documentType, // lista todos os tipos de documento existentes
                headers: headers

        }).then((response)=>{
              
            cy.request({ // Cria um novo documento a partir do tipo de documento listado acima
                method: 'POST',
                url: Cypress.env('url').document,
                headers: headers,
                body: {
                    document_type_id: response.body.data[0].id,
                    client_id: Cypress.env('clientId'), // o cliente teste será usado aqui - preenchimento manual na env
                    identify_number: faker.number.int({ min: 100, max: 999999999 }),
                    document_validate: faker.date.future()
                    }
                })
            
            }).then((response)=>{ 
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
                expect(response.body.data).is.not.empty // garante que o body.data contém propriedades e não está vazio
                })                                
            
// A PARTIR DAQUI APAGA O DOCUMENTO QUE FOI CRIADO EXCLUSIVAMENTE PARA O TESTE

            cy.request({ // lista todos os documentos existentes
                method: 'GET', 
                url: Cypress.env('url').document,
                headers: headers

            }).then((response)=>{ // apaga o documento criado exclusivamente para o teste
                cy.request({
                    method: 'DELETE', 
                    url: `${Cypress.env('url').document}${response.body.data[0].id}`, // pega o último documento da lista, que foi criado acima, e o apaga
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
            
            cy.request({ // lista todos os documentos existentes
                method: 'GET', 
                url: Cypress.env('url').document,
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
            url: Cypress.env('url').document, // lista os documentos existentes
            headers: headers
        })
          .then((response)=>{
          
            cy.request({
              method: 'GET', 
              url: `${Cypress.env('url').document}${response.body.data[0].id}`, // pega o primeiro documento da lista e mostra-o
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
                url: Cypress.env('url').document, // lista todos os documentos existentes
                headers: headers

            }).then((response)=>{
          
              cy.request({
              method: 'PUT', 
              url: `${Cypress.env('url').document}${response.body.data[0].id}`, // pega o último documento listado e o edita (sem alterar nenhum dado)
              headers: headers,
              body: {
          
                document_type_id: Cypress.env('documentTypeId'),
                client_id: response.body.data[0].client.id,
                identify_number: response.body.data[0].identify_number,
                document_validate: response.body.data[0].document_validate,
                
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