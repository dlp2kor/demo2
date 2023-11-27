import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
Given ('visit dummy website',()=>{
    cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/')
})

When ('pwd and username kottaga',()=>{
    cy.log('ok sari')
})

Then ('login aagbeku',()=>{
    cy.log('saaku nadi')
})
