
import { faker } from '@faker-js/faker'

module.exports = {

     CreateAndDelete() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            cy.request({
                method: 'GET', 
                url: Cypress.env('url').productType, // lista todos os tipos de produtos existentes
                headers: headers

        }).then((response)=>{
              
            cy.request({ // Cria um novo produto a partir do tipo de produto listado acima
                method: 'POST',
                url: Cypress.env('url').products,
                headers: headers,
                body: {
                    product_type_id: response.body.data[0].id,
                    category_id: Cypress.env('categoryTypeId'),
                    sku: `${"SKU-"}${faker.number.int({min: 1000, max: 9999})}${faker.string.alpha(2)}`,
                    name: faker.commerce.productName(),
                    quantity: faker.number.int(100),
                    access_numbers: faker.number.int(30),
                    period: faker.number.int(365),
                    price: faker.commerce.price()
                    }
                })
            
            }).then((response)=>{ 
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
                expect(response.body.data).is.not.empty // garante que o body.data contém propriedades e não está vazio
                })                                
            
// A PARTIR DAQUI APAGA O PRODUTO QUE FOI CRIADO EXCLUSIVAMENTE PARA O TESTE

            cy.request({ // lista todos os produtos existentes
                method: 'GET', 
                url: Cypress.env('url').products,
                headers: headers

            }).then((response)=>{ // apaga o produto criado exclusivamente para o teste
                cy.request({
                    method: 'DELETE', 
                    url: `${Cypress.env('url').products}${response.body.data[0].id}`, // pega o último produto da lista, que foi criado acima, e o apaga
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
            
            cy.request({ // lista todos os produtos existentes
                method: 'GET', 
                url: Cypress.env('url').products,
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
            url: Cypress.env('url').products, // lista os produtos existentes
            headers: headers
        })
          .then((response)=>{
          
            cy.request({
              method: 'GET', 
              url: `${Cypress.env('url').products}${response.body.data[0].id}`, // pega o primeiro produto da lista e mostra-o
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
                url: Cypress.env('url').products, // lista todos os produtos existentes
                headers: headers

            }).then((response)=>{
          
              cy.request({
              method: 'PUT', 
              url: `${Cypress.env('url').products}${response.body.data[0].id}`, // pega o último produto listado e o edita (sem alterar nenhum dado)
              headers: headers,
              body: {
          
                product_type_id: response.body.data[0].productType.id,
                category_id: response.body.data[0].category.id,
                sku: response.body.data[0].sku,
                name: response.body.data[0].name,
                quantity: response.body.data[0].quantity,
                access_numbers: response.body.data[0].access_numbers,
                period: response.body.data[0].period,
                price: response.body.data[0].price
                
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