/// <reference types="cypress" /> 
import documents from './pages/documents_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NLF - ENDPOINT DOCUMENTS', () => {

  beforeEach(() =>{

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste

})
qase(107,
  it('CREATE and DELETE- Deve Criar um novo documento com sucesso e apagá-lo no fim', () => {
  
    documents.CreateAndDelete()
})
)
qase(106,
  it('LIST - Deve obter a lista de documentos cadastrados', () => {
  
    documents.List()
})
)
qase(109,                
  it('SHOW - Deve mostrar um documento já existente com sucesso', () => {

    documents.Show()
})
)
qase(108,
  it('EDIT - Deve editar um documento já exisstente com sucesso', () => {
    
    documents.Edit()
})
)

})