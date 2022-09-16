
import Factory from "../fixtures/factory"

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {

    // Usuários //

    static buscarUsuarios() {
        return cy.rest('GET', URL_USUARIOS)
    }

    static buscarUsuarioParaLogin() {
        cy.request(URL_USUARIOS).then(res => {
            cy.wrap({
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password,
            }).as('usuarioLogin')
        })
    }

    static logarUsuarioFalso() {
        let usuario = Factory.gerarUsuarioInvalido()
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            body: usuario,
            failOnStatusCode: false
        })
    }

    static logar(usuario) {
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static postarUsuarioValido() {
        let usuario = Factory.gerarUsuarioValido()
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: usuario
        })
    }

    static salvarBearer(resposta) {
        Cypress.env('bearer', resposta.body.authorization.slice(7))
    }

    // Produtos //

    static buscarProdutos() {
        return cy.rest('GET', URL_PRODUTOS)
    }

    static cadastrarProdutoComSucesso() {
        let produto = Factory.gerarProduto()
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static alterarProdutoCadastrado() {
        let produto = Factory.gerarProduto()
        return cy.request({
            method: 'PUT',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
            body: produto,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static deletarProdutoCadastrado() {
        return cy.request({
            method: 'DELETE',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    // Carrinhos //

    static buscarProdutoParaCarrinho() {
        cy.request(URL_PRODUTOS).then(res => {
            cy.wrap({
                "produtos": [
                    {
                        idProduto: res.body.produtos[0]._id,
                        quantidade: 1
                    }
                ]
            }).as('produtoCarrinho')
        })
    }

    static adicionarProdutoAoCarrinho(produto) {
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: produto,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }

    static buscarCarrinho() {
        return cy.rest('GET', URL_CARRINHOS)
    }

    static concluirCompra() {
        return cy.request({
            method: 'DELETE',
            url: `${URL_CARRINHOS}/concluir-compra`,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }
}