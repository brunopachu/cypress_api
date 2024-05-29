/// <reference types="cypress" /> 
import users from './pages/users_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NLF - ENDPOINT USERS', () => {

  beforeEach(() =>{

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste

})
qase(117,  
  it('CREATE and DELETE- Deve Criar um novo usuário com sucesso e apagá-lo no fim', () => {
  
    users.CreateAndDelete()
})
)
qase(116,
  it('LIST - Deve obter a lista de usuários cadastrados', () => {
  
    users.List()
})
) 
qase(119,                   
  it('SHOW - Deve mostrar um usuário já existente com sucesso', () => {

    users.Show()
})
)
qase(118,
  it('EDIT - Deve editar um usuário já exisstente com sucesso', () => {
    
    users.Edit()
})
)
})