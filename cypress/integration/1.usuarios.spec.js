/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'

describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {

    it('Deve buscar todos os usuários cadastrados na Serverest', () => {
        Serverest.buscarUsuarios().then(res => {
            cy.contractValidation(res, '2.get-usuarios', 200)
            ValidaServerest.validarBuscaDeUsuarios(res)
        })
    })

    it('Não deve postar um novo usuário admnistrador existente', () => {
        cy.postarUsuarioSemSucesso().then(res => {
            cy.contractValidation(res, '4.post-usuarios', 400)
            expect(res.body.message).to.be.eq('Este email já está sendo usado')
        })
    })

    it('Deve realizar login com sucesso', () => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then(usuario => {
            Serverest.logar(usuario).then(res => {
                ValidaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
    })

    it('Deve buscar e salvar um usuário em um arquivo json', () => {
        Serverest.buscarUsuarios().then(res => {
            let limite = res.body.quantidade - 1
            cy.log(limite)
            let inteiro = Factory.gerarInteiroAleatorio(limite)
            cy.writeFile('./cypress/fixtures/usuario.json', res.body.usuarios[inteiro])
            ValidaServerest.validarBuscaDeUsuarios(res)
        })
    })

    it('Deve buscar o usuario de um arquivo json', () => {
        cy.fixture('usuario.json').then(json => {
            let usuario = {
                email: json.email,
                password: json.password
            }
            Serverest.logar(usuario).then(res => {
                ValidaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
    })
})