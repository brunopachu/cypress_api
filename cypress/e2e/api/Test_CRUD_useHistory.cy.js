/// <reference types="cypress" /> 
import useHistory from './pages/useHistory_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NLF - ENDPOINT USEHISTORY', () => {

  beforeEach(() =>{

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste

})
qase(127,
  it('CREATE and DELETE- Deve Criar um novo histórico de utilização com sucesso e apagá-lo no fim', () => {
  
    useHistory.CreateAndDelete()
})
)
qase(126,
  it('LIST - Deve obter a lista de histórico de utilização existentes', () => {
  
    useHistory.List()
})
)
qase(129,                  
  it('SHOW - Deve mostrar um histórico de utilização já existente com sucesso', () => {

    useHistory.Show()
})
)
qase(128,
  it('EDIT - Deve editar um histórico de utilização já existente com sucesso', () => {
    
    useHistory.Edit()
})
)
})