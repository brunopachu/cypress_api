
import { faker } from '@faker-js/faker'

module.exports = {

     CreateAndDelete() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            cy.request({
                method: 'GET', 
                url: Cypress.env('url').categoryType, // lista todos os tipos de categorias existentes
                headers: headers

        }).then((response)=>{    
            cy.request({ // Cria uma nova categoria com base no tipo de categoria listada acima
                method: 'POST',
                url: Cypress.env('url').categories,
                headers: headers,
                body: {
                    category_type_id: response.body.data[0].id,
                    name: faker.string.alpha(15)
                    }
                })
            }).then((response)=>{ 
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
                expect(response.body.data).is.not.empty // verifica se a resposta contém dados
                })                                
            
// A PARTIR DAQUI APAGA A CATEGORIA QUE FOI CRIADA EXCLUSIVAMENTE PARA O TESTE

            cy.request({ // lista todas as categorias existentes
                method: 'GET', 
                url: Cypress.env('url').categories,
                headers: headers

            }).then((response)=>{ // apaga a categoria criada exclusivamente para o teste
                cy.request({
                    method: 'DELETE', 
                    url: `${Cypress.env('url').categories}${response.body.data[0].id}`, // pega a última categoria da lista, que foi criada acima, e a apaga
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
            
            cy.request({ // lista todos os tipos de categorias existentes
                method: 'GET', 
                url: Cypress.env('url').categories, 
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
            url: Cypress.env('url').categories, // lista as categorias existentes
            headers: headers
        })
          .then((response)=>{
          
            cy.request({
              method: 'GET', 
              url: `${Cypress.env('url').categories}${response.body.data[0].id}`, // pega a primeira categoria da lista e mostra-a
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
                url: Cypress.env('url').categories, // lista todas as categorias existentes
                headers: headers

            }).then((response)=>{
          
              cy.request({
              method: 'PUT', 
              url: `${Cypress.env('url').categories}${response.body.data[0].id}`, // pega a última categoria listada e a edita (sem alterar nenhum dado)
              headers: headers,
              body: {
          
                category_type_id: response.body.data[0].category_type_id,
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