/// <reference types="cypress" /> 
import products from './pages/products_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NLF - ENDPOINT DOCUMENTS', () => {

  beforeEach(() =>{

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste

})
qase(137,
  it('CREATE and DELETE- Deve Criar um novo documento com sucesso e apagá-lo no fim', () => {
  
    products.CreateAndDelete()
})
)
qase(136,
  it('LIST - Deve obter a lista de documentos cadastrados', () => {
  
    products.List()
})
)
qase(139,            
  it('SHOW - Deve mostrar um documento já existente com sucesso', () => {

    products.Show()
})
)
qase(138,
  it('EDIT - Deve editar um documento já exisstente com sucesso', () => {
    
    products.Edit()
})
)
})