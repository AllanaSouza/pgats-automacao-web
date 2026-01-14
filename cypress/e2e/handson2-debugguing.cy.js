describe('Cadastrar entradas e saídas com bugs', () => {
  it('Cadastrar uma nova transação de entrada - falha 1', () => {
    //todo teste precisa ter 3 bloco - arrange, act, assert (está faltando o assert nesse teste)
    cy.visit("https://devfinance-agilizei.netlify.app")
 
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    //cy.contains("Salvar").contains().get().click() - contais duplicado e get sem necessidade
    cy.contains("Salvar").click() // comando coreto

    // Assert - Validar o resultado
    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 2', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.contains("Nova Transação").click()
    //cy.get("#description").sendKeys("Mesada") - não existe o comando sendKeys no cypress. O comando correto é type
    //cy.get("#amount").sendKeys(100)
    //cy.get("#date").sendKeys("2023-02-01")
    cy.get("#description").type("Mesada") 
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    //cy.contains("Add").click() //o botão não tem o texto Add, o texto correto é Salvar
    cy.contains("Salvar").click()
    
    cy.get("tbody tr").should("have.length", 1)
  });  

  it('Cadastrar uma nova transação de entrada - falha 3', () => {

    //Está faltando o arrange - visitar a página
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)

    //cy.get("#date").type("02/01/2023") - formato de data incorreto, o formato correto é YYYY-MM-DD
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()
    
//    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 4', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.contains("Nova Transação").click() // faltava clicar no botão para abrir o formulário

    cy.get("#amount").type(100) 
    cy.get("#description").type("Mesada")
    cy.get("#date").type("2023-02-01")
    // cy.contains("Nova Transação").click() - ação desnecessária, estava clicando no botão de nova transação novamente
    cy.contains("Salvar").click()

    cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 5', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    // cy.contains("Nueva Transación").click() - texto incorreto, o texto correto é "Nova Transação"
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    //cy.get(".alert").should("not.exist") - asserção sem sentido nesse contexto
    cy.get("tbody tr").should("have.length", 1)
  });

  //it.skip('Cadastrar uma nova transação de entrada - falha 6', () => { - o teste estava ignorado com o .skip
  it('Cadastrar uma nova transação de entrada - falha 6', () => {
    cy.visit("https://devfinance-agilizei.netlify.app") - //faltava visitar a página
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    //cy.get("tbody tr").should("have.length", 100) - número incorreto de transações esperadas
    cy.get("tbody tr").should("have.length", 1)
  });
}); 