/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste sobre o fluxo de compra da API Serverest', () => {

    it('Deve postar um novo usuario com sucesso', () => {
        Serverest.postarUsuarioValido().then(res => {
            cy.contractValidation(res, '4.post-usuarios', 201)
            ValidaServerest.validarCadastroDeUsuarioComSucesso(res)
        })
    })

    context('Logar com sucesso', () => {
        beforeEach('Logar', () => {
            Serverest.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then(usuario => {
                Serverest.logar(usuario).then(res => {
                    cy.contractValidation(res, '1.Login', 200)
                    ValidaServerest.validarLoginComSucesso(res)
                    Serverest.salvarBearer(res)
                })
            })
        })

        it('Deve buscar todos os produtos cadastrados', () => {
            Serverest.buscarProdutos().then(res => {
                cy.contractValidation(res, '7.get-produtos', 200)
                ValidaServerest.validarBuscaDeProdutos(res)
            })
        })

        it('Deve adicionar um produto ao carrinho', () => {
            Serverest.buscarProdutoParaCarrinho()
            cy.get('@produtoCarrinho').then(produto => {
                Serverest.adicionarProdutoAoCarrinho(produto).then(res => {
                    cy.contractValidation(res, '14.post-carrinhos', 201)
                    ValidaServerest.validarCadastroDeCarrinhoComSucesso(res)
                })
            })
        })

        it('Deve buscar carrinho cadastrado', () => {
            Serverest.buscarCarrinho().then(res => {
                cy.contractValidation(res, '12.get-carrinhos', 200)
                ValidaServerest.validarBuscaDeCarrinho(res)
            })
        })

        it('Deve excluir um carrinho ao concluir compra', () => {
            Serverest.concluirCompra().then(res => {
                cy.contractValidation(res, '15.delete-carrinhos-concluir-compra', 200)
                ValidaServerest.validarExclusaoDeCarrinhoComSucesso(res)
            })
        })

    })
})

