/// <reference types="cypress" /> 
import clients from './pages/clients_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NLF - ENDPOINT CLIENT', () => {

  beforeEach(() =>{

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste

})
qase(77,
  it('CREATE and DELETE- Deve Criar um novo cliente com sucesso e apagá-lo no fim', () => {
  
    clients.CreateAndDelete()
})
)
qase(76,
  it('LIST - Deve obter a lista de clientes cadastrados', () => {
  
    clients.List()
})
)
qase (79,                  
  it('SHOW - Deve mostrar um cliente já existente com sucesso', () => {

    clients.Show()
})
)
qase (78,
  it('EDIT - Deve editar um cliente já existente com sucesso', () => {
    
    clients.Edit()
})
)

})