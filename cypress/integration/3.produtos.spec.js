/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste sobre a rota /produtos da API Serverest', () => {

    it('Deve buscar todos os produtos cadastrados', () => {
        Serverest.buscarProdutos().then(res => {
            cy.contractValidation(res, '7.get-produtos', 200)
            ValidaServerest.validarBuscaDeProdutos(res)
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

        it('Deve postar um novo produto com sucesso', () => {
            Serverest.cadastrarProdutoComSucesso().then(res => {
                ValidaServerest.validarCadastroDeProdutoComSucesso(res)
            })
        })

        it('Deve alterar um produto com sucesso', () => {
            Serverest.alterarProdutoCadastrado().then(res => {
                cy.contractValidation(res, '11.put-produtos-by-id', 200)
                ValidaServerest.validarAlteracaoDeProdutoComSucesso(res)
            })
        })

        it('Deve deletar um produto com sucesso', () => {
            Serverest.deletarProdutoCadastrado().then(res => {
                cy.contractValidation(res, '10.delete-produtos-by-id', 200)
                ValidaServerest.validarExclusaoDeProdutoComSucesso(res)
            })
        })
    })
})