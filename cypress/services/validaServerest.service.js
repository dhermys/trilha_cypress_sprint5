
export default class ValidaServerest {

    //Validações das ações que podemos realizar na API
    // Validar a busca de usuários
    // Validar o cadastro de novos usuários
    // Validar o login

    static validarBuscaDeUsuarios(resposta) {
        expect(resposta.status).to.equal(200);
        expect(resposta.body.quantidade).to.be.greaterThan(5)
    }

    static validarCadastroDeUsuarioComSucesso(resposta) {
        expect(resposta.status).to.equal(201)
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('_id')
        Cypress.env('idUsuarioCadastrado', resposta.body._id)
    }

    static validarLoginComSucesso(resposta) {
        expect(resposta.status).to.equal(200);
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body).to.haveOwnProperty('authorization')
    }

    static validarLoginSemSucesso(resposta) {
        expect(resposta.status).to.equal(400)
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body).to.haveOwnProperty('message')
    }

    static validarBuscaDeProdutos(resposta) {
        expect(resposta.status).to.equal(200)
        expect(resposta).to.be.a('object')
        expect(resposta.body.quantidade).to.be.a('number')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('nome')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('preco')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('descricao')
    }

    static validarCadastroDeProdutoComSucesso(resposta) {
        expect(resposta.status).to.equal(201)
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('_id')
        Cypress.env('idProdutoCadastrado', resposta.body._id)
    }

    static validarAlteracaoDeProdutoComSucesso(resposta) {
        expect(resposta.status).to.equal(200)
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Registro alterado com sucesso')
    }

    static validarExclusaoDeProdutoComSucesso(resposta) {
        expect(resposta.status).to.equal(200)
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.not.have.any.keys('Registro excluído com sucesso', 'Nenhum registro excluído')
    }

    static validarCadastroDeCarrinhoComSucesso(resposta) {
        expect(resposta.status).to.equal(201)
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('_id')
        Cypress.env('idCarrinhoCadastrado', resposta.body._id)
    }

    static validarBuscaDeCarrinho(resposta) {
        expect(resposta.status).to.equal(200)
        expect(resposta).to.be.a('object')
        expect(resposta.body.quantidade).to.be.a('number')
        expect(resposta.body.carrinhos[0]).to.haveOwnProperty('produtos')
        expect(resposta.body.carrinhos[0]).to.haveOwnProperty('precoTotal')
        expect(resposta.body.carrinhos[0]).to.haveOwnProperty('quantidadeTotal')
    }

    static validarExclusaoDeCarrinhoComSucesso(resposta) {
        expect(resposta.status).to.equal(200)
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.not.have.any.keys('Registro excluído com sucesso', 'Não foi encontrado carrinho para esse usuário')
    }
}