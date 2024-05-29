/// <reference types="cypress" /> 
import categories from './pages/categories_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NLF - ENDPOINT CATEGORIES', () => {

  beforeEach(() =>{

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste

})
qase(97,
  it('CREATE and DELETE- Deve Criar uma nova categoria com sucesso e apagá-lo no fim', () => {
    
    categories.CreateAndDelete()
})
)
qase(96, 
  it('LIST - Deve obter a lista de categorias cadastrados', () => {
  
    categories.List()
})
)
qase(99,               
  it('SHOW - Deve mostrar uma categoria já existente com sucesso', () => {

    categories.Show()
})
)
qase(98,
  it('EDIT - Deve editar uma categoria já existente com sucesso', () => {
    
    categories.Edit()
})
)

})