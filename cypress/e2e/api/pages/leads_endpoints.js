
import { faker } from '@faker-js/faker'

module.exports = {

     CreateAndDelete() {
        
        cy.get('@headers').then((headers) => { // Usando os headers disponibilizados pelo comando personalizado cy.login()
            cy.request({
                method: 'GET', 
                url: Cypress.env('url').leadsOrigin, // lista todas as origens de lead
                headers: headers

        }).then((response)=>{    
            cy.request({ // Cria um novo lead
                method: 'POST',
                url: Cypress.env('url').leads,
                headers: headers,
                body: {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    phone_number: faker.phone.number(),
                    status: "contacted",
                    followed_by: faker.person.fullName(),
                    notes: faker.string.alphanumeric(50),
                    origin_id: response.body.data[0].id // pega a primeira origem de lead da lista
                    }
                })
            }).then((response)=>{ 
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('data')
                expect(response.body.data).is.not.empty
                })                                
            
// A PARTIR DAQUI APAGA O LEAD QUE FOI CRIADO EXCLUSIVAMENTE PARA O TESTE

            cy.request({ // lista todos os leads
                method: 'GET', 
                url: Cypress.env('url').leads,
                headers: headers

            }).then((response)=>{ // apaga o lead criado exclusivamente para o teste
                cy.request({
                    method: 'DELETE', 
                    url: `${Cypress.env('url').leads}${response.body.data[0].id}`, // pega o último lead da lista que foi criado acima e o apaga
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
            
            cy.request({ // lista todos os leads existentes
                method: 'GET', 
                url: Cypress.env('url').leads,
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
            url: Cypress.env('url').leads, // lista todos os leads existentes
            headers: headers
        })
          .then((response)=>{
          
            cy.request({
              method: 'GET', 
              url: `${Cypress.env('url').leads}${response.body.data[0].id}`, // pega o primeiro lead da lista e mostra-o
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
                url: Cypress.env('url').leads, // lista todos os leads existentes
                headers: headers

            }).then((response)=>{
          
              cy.request({
              method: 'PUT', 
              url: `${Cypress.env('url').leads}${response.body.data[0].id}`, // pega o último lead listado e o edita (sem alterar nenhum dado)
              headers: headers,
              body: {
          
                id: response.body.data[0].id,
                name: response.body.data[0].name,
                email: response.body.data[0].email,
                phone_number: response.body.data[0].phone_number,
                status: response.body.data[0].status,
                followed_by: response.body.data[0].followed_by,
                notes: response.body.data[0].notes,
                origin_id: response.body.data[0].origin.id
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