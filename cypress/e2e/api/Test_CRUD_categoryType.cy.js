/// <reference types="cypress" /> 
import categoryType from './pages/categoryType_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NLF - ENDPOINT CATEGORYTYPE', () => {

  beforeEach(() =>{

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste

})
qase(102,
  it('CREATE and DELETE- Deve Criar um novo tipo de categoria com sucesso e apagá-lo no fim', () => {
  
    categoryType.CreateAndDelete()
})
)
qase (101,
  it('LIST - Deve obter a lista de tipos de categorias cadastrados', () => {
  
    categoryType.List()
})
)
qase(104,                 
  it('SHOW - Deve mostrar um tipo de categoria já existente com sucesso', () => {

    categoryType.Show()
})
)
qase(103,
  it('EDIT - Deve editar um tipo de categoria já existente com sucesso', () => {
    
    categoryType.Edit()
})
)

})