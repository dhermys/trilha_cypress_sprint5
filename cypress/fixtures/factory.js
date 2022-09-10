const { faker } = require('@faker-js/faker');

export default class Factory {

    static gerarProduto() {
        return {
            "nome": faker.commerce.productName(),
            "preco": faker.datatype.number(),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number()
        }
    }

    static gerarInteiroAleatorio(qtd = 0) {
        return faker.datatype.number(qtd)
    }

    static gerarUsuarioInvalido() {
        return {
            "email": faker.internet.email(),
            "password": faker.internet.password()
        }
    }

}