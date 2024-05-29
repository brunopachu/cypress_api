/// <reference types="cypress" /> 
import productType from './pages/productType_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NLF - ENDPOINT PRODUCTTYPE', () => {

  beforeEach(() =>{

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste

})
qase(132,
  it('CREATE and DELETE- Deve Criar um novo tipo de produto com sucesso e apagá-lo no fim', () => {
  
    productType.CreateAndDelete()
})
)
qase(131,
  it('LIST - Deve obter a lista de tipos de produtos cadastrados', () => {
  
    productType.List()
})
)
qase(134,                
  it('SHOW - Deve mostrar um tipo de produto já existente com sucesso', () => {

    productType.Show()
})
)
qase(133,
  it('EDIT - Deve editar um tipo de produto já existente com sucesso', () => {
    
    productType.Edit()
})
)

})