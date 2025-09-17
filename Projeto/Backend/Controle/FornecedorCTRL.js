import Fornecedor from "../Modelo/Fornecedor.js";

export default class FornecedorCTRL {

    // HTTP POST
    gravar(requisicao, resposta) {
        resposta.setHeader("Content-Type", "application/json");
        if (requisicao.method === "POST") {
            if (requisicao.is("application/json")) {
                const dados = requisicao.body;
                const nome = dados['nome'];
                const endereco = dados['endereco'];
                const bairro = dados['bairro'];
                const cidade = dados['cidade'];
                const estado = dados['estado'];
                const cep = dados['cep'];
                const ativo = dados['ativo'];

                //verificação dos dados
                if (nome && endereco && bairro && cidade && estado &&  cep) {
                    const fornecedor = new Fornecedor(0, nome, endereco, bairro, cidade, estado, cep, ativo);
                    fornecedor.gravar().then(() => {
                        resposta.json({
                            "status": true,
                            "codigo": fornecedor.codigo,
                            "mensagem": "Fornecedor gravado com Sucesso!!"
                        });
                    }).catch((erro) => {
                        resposta.json({
                            "status": false,
                            "mensagem": "Erro ao gravar o fornecedor : " + erro.mensagem
                        });
                    });
                }
                else {
                    resposta.json({
                        "status": false,
                        "mensagem": "Verificar a documentação da API e informe todos os dados necessarios de um fornecedor"
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
                "mensagem": "Para registrar um fornecedor, utilise o metodo HTTP POST!"
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
                const nome = dados['nome'];
                const endereco = dados['endereco'];
                const bairro = dados['bairro'];
                const cidade = dados['cidade'];
                const estado = dados['estado'];
                const cep = dados['cep'];
                const ativo = dados['ativo'];

                //verificação dos dados
                if (codigo && nome && endereco && bairro && cidade && estado &&  cep) {
                    const fornecedor = new Fornecedor(codigo, nome, endereco, bairro, cidade, estado, cep, ativo);
                    fornecedor.atualizar().then(() => {
                        resposta.json({
                            "status": true,
                            "mensagem": "Fornecedor atualizado com Sucesso!!"
                        });
                    }).catch((erro) => {
                        resposta.json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o fornecedor : " + erro.mensagem
                        });
                    });
                }
                else {
                    resposta.json({
                        "status": false,
                        "mensagem": "Verificar a documentação da API e informe todos os dados necessarios de um fornecedor"
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
                "mensagem": "Para alterar um fornecedor, utilise o metodo PUT!"
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
                const nome = dados['nome'];
                const endereco = dados['endereco'];
                const bairro = dados['bairro'];
                const cidade = dados['cidade'];
                const estado = dados['estado'];
                const cep = dados['cep'];
                const ativo = dados['ativo'];

                //verificação dos dados
                if (codigo && nome && endereco && bairro && cidade && estado &&  cep) {
                    const fornecedor = new Fornecedor(codigo, nome, endereco, bairro, cidade, estado, cep, ativo);
                    fornecedor.excluir().then(() => {
                        resposta.json({
                            "status": true,
                            "mensagem": "Fornecedor excluido com Sucesso!!"
                        });
                    }).catch((erro) => {
                        resposta.json({
                            "status": false,
                            "mensagem": "Erro ao excluido o fornecedor : " + erro.mensagem
                        });
                    });
                }
                else {
                    resposta.json({
                        "status": false,
                        "mensagem": "Verificar a documentação da API e informe todos os dados necessarios de um fornecedor"
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
                "mensagem": "Para excluir um fornecedor, utilise o metodo  DELETE!"
            });
        }
    }

    // HTTP GET
    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            const fornecedor = new Fornecedor(0);
            fornecedor.consultar("").then((listaFornecedor) => {
                resposta.json(
                    listaFornecedor
                );
            }).catch((erro) => {
                resposta.json({
                    "status": false,
                    "mensagem": "Erro ao procurar o fornecedor : " + erro.mensagem
                });
            });
        }
        else {
            resposta.json({
                "status": false,
                "mensagem": "Para procurar um fornecedor, utilise o metodo  GET!"
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

                const fornecedor = new Fornecedor(codigo);
                fornecedor.consultarID(codigo).then((listaFornecedor) => {
                    resposta.json(
                        listaFornecedor
                    );
                }).catch((erro) => {
                    resposta.json({
                        "status": false,
                        "mensagem": "Erro ao procurar o fornecedor : " + erro.mensagem
                    });
                });
            }
            else {
                resposta.json({
                    "status": false,
                    "mensagem": "Verificar a documentação da API e informe todos os dados necessarios de um fornecedor"
                });
            }
        }
        else {
            resposta.json({
                "status": false,
                "mensagem": "Para procurar um fornecedor, utilise o metodo  GET!"
            });
        }
    }
}