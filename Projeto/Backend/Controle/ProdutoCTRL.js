import Produto from "../Modelo/Produto.js";

export default class ProdutoCTRL {

    // HTTP POST
    gravar(requisicao, resposta) {
        resposta.setHeader("Content-Type", "application/json");
        if (requisicao.method === "POST") {
            if (requisicao.is("application/json")) {
                const dados = requisicao.body;
                const descricao = dados['descricao'];
                const validade = dados['validade'];
                const preco_custo = dados['preco_custo'];
                const preco_venda = dados['preco_venda'];
                const estoque = dados['estoque'];
                const cod_barra = dados['cod_barra'];

                //verificação dos dados
                if (descricao && validade && preco_custo && preco_venda && estoque &&  cod_barra) {
                    const produto = new Produto(0, descricao, validade, preco_custo, preco_venda, estoque, cod_barra);
                    produto.gravar().then(() => {
                        resposta.json({
                            "status": true,
                            "codigo": produto.codigo,
                            "mensagem": "Produto gravado com Sucesso!!"
                        });
                    }).catch((erro) => {
                        resposta.json({
                            "status": false,
                            "mensagem": "Erro ao gravar o produto : " + erro.mensagem
                        });
                    });
                }
                else {
                    resposta.json({
                        "status": false,
                        "mensagem": "Verificar a documentação da API e informe todos os dados necessarios de um produto"
                    });
                }
            }
            else {
                resposta.json({
                    "status": false,
                    "mensagem": "A requisição deve possuir um Payloud em application/json"
                });
            }
        }
        else {
            resposta.json({
                "status": false,
                "mensagem": "Para registrar um produto, utilise o metodo HTTP POST!"
            });
        }
    }

    // HTTP PUT
    atualizar(requisicao, resposta) {
        resposta.setHeader("Content-Type", "application/json");
        if (requisicao.method === "PUT") {
            if (requisicao.is("application/json")) {
                const dados = requisicao.body;
                const codigo = dados['codigo'];
                const descricao = dados['descricao'];
                const validade = dados['validade'];
                const preco_custo = dados['preco_custo'];
                const preco_venda = dados['preco_venda'];
                const estoque = dados['estoque'];
                const cod_barra = dados['cod_barra'];

                //verificação dos dados
                if (codigo && descricao && validade && preco_custo && preco_venda && estoque &&  cod_barra) {
                    const produto = new Produto(codigo, descricao, validade, preco_custo, preco_venda, estoque, cod_barra);
                    produto.atualizar().then(() => {
                        resposta.json({
                            "status": true,
                            "mensagem": "Produto atualizado com Sucesso!!"
                        });
                    }).catch((erro) => {
                        resposta.json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o produto : " + erro.mensagem
                        });
                    });
                }
                else {
                    resposta.json({
                        "status": false,
                        "mensagem": "Verificar a documentação da API e informe todos os dados necessarios de um produto"
                    });
                }
            }
            else {
                resposta.json({
                    "status": false,
                    "mensagem": "A requisição deve possuir um Payloud em application/json"
                });
            }
        }
        else {
            resposta.json({
                "status": false,
                "mensagem": "Para alterar um produto, utilise o metodo PUT!"
            });
        }
    }

    // HTTP DELETE
    excluir(requisicao, resposta) {
        resposta.setHeader("Content-Type", "application/json");
        if (requisicao.method === "DELETE") {
            if (requisicao.is("application/json")) {
                const dados = requisicao.body;
                const codigo = dados['codigo'];
                const descricao = dados['descricao'];
                const validade = dados['validade'];
                const preco_custo = dados['preco_custo'];
                const preco_venda = dados['preco_venda'];
                const estoque = dados['estoque'];
                const cod_barra = dados['cod_barra'];

                //verificação dos dados
                if (codigo) {
                    const produto = new Produto(codigo, descricao, validade, preco_custo, preco_venda, estoque, cod_barra);
                    produto.excluir().then(() => {
                        resposta.json({
                            "status": true,
                            "mensagem": "Produto excluido com Sucesso!!"
                        });
                    }).catch((erro) => {
                        resposta.json({
                            "status": false,
                            "mensagem": "Erro ao excluido o produto : " + erro.mensagem
                        });
                    });
                }
                else {
                    resposta.json({
                        "status": false,
                        "mensagem": "Verificar a documentação da API e informe todos os dados necessarios de um produto"
                    });
                }
            }
            else {
                resposta.json({
                    "status": false,
                    "mensagem": "A requisição deve possuir um Payloud em application/json"
                });
            }
        }
        else {
            resposta.json({
                "status": false,
                "mensagem": "Para excluir um produto, utilise o metodo  DELETE!"
            });
        }
    }

    // HTTP GET
    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            const produto = new Produto(0);
            produto.consultar("").then((listaProduto) => {
                resposta.json(
                    listaProduto
                );
            }).catch((erro) => {
                resposta.json({
                    "status": false,
                    "mensagem": "Erro ao procurar o produto : " + erro.mensagem
                });
            });
        }
        else {
            resposta.json({
                "status": false,
                "mensagem": "Para procurar um produto, utilise o metodo  GET!"
            });
        }
    }

    // HTTP GET
    consultarID(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            //obiter um parametro da url
            const codigo = requisicao.params['id'];
            if (codigo) {

                const produto = new Produto(codigo);
                produto.consultarID(codigo).then((listaProduto) => {
                    resposta.json(
                        listaProduto
                    );
                }).catch((erro) => {
                    resposta.json({
                        "status": false,
                        "mensagem": "Erro ao procurar o produto : " + erro.mensagem
                    });
                });
            }
            else {
                resposta.json({
                    "status": false,
                    "mensagem": "Verificar a documentação da API e informe todos os dados necessarios de um produto"
                });
            }
        }
        else {
            resposta.json({
                "status": false,
                "mensagem": "Para procurar um produto, utilise o metodo  GET!"
            });
        }
    }
}