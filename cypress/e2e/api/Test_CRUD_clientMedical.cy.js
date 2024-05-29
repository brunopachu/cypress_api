/// <reference types="cypress" /> 
import clientMedical from './pages/clientMedical_endpoints'
import { qase } from 'cypress-qase-reporter/mocha'

describe('TESTES DE API NFL - ENDPOINT CLIENTMEDICAL', () => {
  
  beforeEach(() => {

    cy.login() // comando personalizado para fazer login e disponibilizar os headers para o teste
})
qase(83,
  it('CREATE and DELETE- Deve Criar um novo cliente com sucesso e apagá-lo no fim', () => {
    
    clientMedical.CreateAndDelete()
})
)
qase(81,
  it('LIST - Deve obter a lista de dados de ICE cadastrados', () => {
  
    clientMedical.List()
})
)
qase(84,
  it('SHOW - Deve mostrar os dados ICE já existente de um cliente com sucesso', () => {

    clientMedical.Show()
})
)
qase(82,
  it('EDIT - Deve editar um dado ICE de um cliente já existente com sucesso', () => {

    clientMedical.Edit() // FALHA JÁ REPORTADA
})
)
})