/// <reference types="cypress" />

import produtosPage from "../support/page_objects/produtos.page";
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })

        // Ação de ir para a página de PRODUTOS, a partir da MINHA CONTA
        cy.log('IR PARA A PÁGINA DE PRODUTOS')
        cy.get('.logo-img').eq(1).click()
        cy.get('[class="btn btn-block btn-view-all"]').eq(0).click()

        // Ação de selecioar 4 produtos, e suas respectivas: cor, tamanho e quantidade
        cy.log('SELECIONAR 4 PRODUTOS ALEATÓRIOS')
        produtosPage.produtos_lote(4)
        cy.log('FIM DA SELEÇÃO DOS 4 PRODUTOS ALEATÓRIOS')

        // Ação de ir para CHEKOUT
        cy.log('IR PAR AO CHECKOUT')
        cy.get('[class="button wc-forward"]').eq(0).click()
        cy.get('[class="checkout-button button alt wc-forward"]').click()

        // Ação de preencher tela de CHEKOUT
        cy.log('PREENCHENDO DADOS DE CHECKOUT')
        cy.checkout(faker.location.street(), faker.location.streetAddress(), faker.location.city(), '23075000', faker.number.int()).wait(3000)
        // WAIT foi necessário, pois o tempo de processamento do encerramento do pedido estava longo, impactando na ação da validação posterior
        cy.log('FIM DO PREENCHIMENTO DOS DADOS DE CHECKOUT')

        // Ação de validar a finalização do PEDIDO
        cy.get('[class="page-title"]').should('contain', 'Pedido recebido')

    });


})