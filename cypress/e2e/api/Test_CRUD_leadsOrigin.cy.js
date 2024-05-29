/// <reference types="cypress" /> 
import leadsOrigin from './pages/leadsOrigin_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NLF - ENDPOINT LEADSORIGIN', () => {

  beforeEach(() =>{

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste

})
qase(92,
  it('CREATE and DELETE- Deve Criar uma nova origem de lead com sucesso e apagá-la no fim', () => {
  
    leadsOrigin.CreateAndDelete()
})
)
qase(91,
  it('LIST - Deve obter a lista de origens de lead cadastrados', () => {
  
    leadsOrigin.List()
})
)
qase(94,                  
  it('SHOW - Deve mostrar uma origem de lead já existente com sucesso', () => {

    leadsOrigin.Show()
})
)
qase(93,
  it('EDIT - Deve editar uma origem de lead já existente com sucesso', () => {
    
    leadsOrigin.Edit()
})
)
})