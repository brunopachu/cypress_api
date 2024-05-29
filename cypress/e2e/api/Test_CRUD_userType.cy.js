/// <reference types="cypress" /> 
import userType from './pages/userType_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NLF - ENDPOINT USERTYPE', () => {

  beforeEach(() =>{

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste

})
qase(122,
  it('CREATE and DELETE- Deve Criar um novo tipo de usuário com sucesso e apagá-lo no fim', () => {
  
    userType.CreateAndDelete()
})
)
qase(121,
  it('LIST - Deve obter a lista de tipos de usuários cadastrados', () => {
  
    userType.List()
})
)
qase(124,                 
  it('SHOW - Deve mostrar um tipo de usuário já existente com sucesso', () => {

    userType.Show()
})
)
qase (123,
  it('EDIT - Deve editar um tipo de usuário já existente com sucesso', () => {
    
    userType.Edit()
})
)
})