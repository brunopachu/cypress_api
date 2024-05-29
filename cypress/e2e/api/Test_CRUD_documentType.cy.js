/// <reference types="cypress" /> 
import documentType from './pages/documentType_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NLF - ENDPOINT DOCUMENTTYPE', () => {

  beforeEach(() =>{

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste

})
qase(112,
  it('CREATE and DELETE- Deve Criar um novo tipo de documento com sucesso e apagá-lo no fim', () => {
  
    documentType.CreateAndDelete()
})
)
qase(111,
  it('LIST - Deve obter a lista de tipos de documentos cadastrados', () => {
  
    documentType.List()
})
)
qase(114,                  
  it('SHOW - Deve mostrar um tipo de documento já existente com sucesso', () => {

    documentType.Show()
})
)
qase(113,
  it('EDIT - Deve editar um tipo de documento já existente com sucesso', () => {
    
    documentType.Edit()
})
)


})