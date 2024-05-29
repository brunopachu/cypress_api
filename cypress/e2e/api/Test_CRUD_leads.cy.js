/// <reference types="cypress" /> 
import leads from './pages/leads_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NLF - ENDPOINT LEADS', () => {

  beforeEach(() =>{

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste

})
qase(87,
  it('CREATE and DELETE- Deve Criar um novo lead com sucesso e apagá-lo no fim', () => {
  
    leads.CreateAndDelete()
})
)
qase(86,
  it('LIST - Deve obter a lista de leads cadastrados', () => {
  
    leads.List()
})
)
qase(89,              
  it('SHOW - Deve mostrar um lead já existente com sucesso', () => {

    leads.Show()
})
)
qase(88,
  it('EDIT - Deve editar um lead já existente com sucesso', () => {
    
    leads.Edit()
})
)

})