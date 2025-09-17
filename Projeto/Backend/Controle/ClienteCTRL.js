import Cliente from "../Modelo/Cliente.js";

export default class ClienteCTRL {

    // HTTP POST
    gravar(requisicao, resposta) {
        resposta.setHeader("Content-Type", "application/json");
        if (requisicao.method === "POST") {
            if (requisicao.is("application/json")) {
                const dados = requisicao.body;
                const cpf = dados['cpf'];
                const nome = dados['nome'];
                const sobrenome = dados['sobrenome'];
                const endereco = dados['endereco'];
                const cidade = dados['cidade'];
                const estado = dados['estado'];
                const cep = dados['cep'];

                //verificação dos dados
                if (cpf && nome && sobrenome && endereco && cidade && estado && cep) {
                    const cliente = new Cliente(0, cpf, nome, sobrenome, endereco, cidade, estado, cep);
                    cliente.gravar().then(() => {
                        resposta.json({
                            "status": true,
                            "id": cliente.id,
                            "mensagem": "Cliente gravado com Sucesso!!"
                        });
                    }).catch((erro) => {
                        resposta.json({
                            "status": false,
                            "mensagem": "Erro ao gravar o cliente : " + erro.mensagem
                        });
                    });
                }
                else {
                    resposta.json({
                        "status": false,
                        "mensagem": "Verificar a documentação da API e informe todos os dados necessarios de um cliente"
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
                "mensagem": "Para registrar um cliente, utilise o metodo HTTP POST!"
            });
        }
    }

    // HTTP PUT
    atualizar(requisicao, resposta) {
        resposta.setHeader("Content-Type", "application/json");
        if (requisicao.method === "PUT") {
            if (requisicao.is("application/json")) {
                const dados = requisicao.body;
                const id = dados['id'];
                const cpf = dados['cpf'];
                const nome = dados['nome'];
                const sobrenome = dados['sobrenome'];
                const endereco = dados['endereco'];
                const cidade = dados['cidade'];
                const estado = dados['estado'];
                const cep = dados['cep'];

                //verificação dos dados
                if (id && cpf && nome && sobrenome && endereco && cidade && estado && cep) {
                    const cliente = new Cliente(id, cpf, nome, sobrenome, endereco, cidade, estado, cep);
                    cliente.atualizar().then(() => {
                        resposta.json({
                            "status": true,
                            "mensagem": "Cliente atualizado com Sucesso!!"
                        });
                    }).catch((erro) => {
                        resposta.json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o cliente : " + erro.mensagem
                        });
                    });
                }
                else {
                    resposta.json({
                        "status": false,
                        "mensagem": "Verificar a documentação da API e informe todos os dados necessarios de um cliente"
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
                "mensagem": "Para alterar um cliente, utilise o metodo PUT!"
            });
        }
    }

    // HTTP DELETE
    excluir(requisicao, resposta) {
        resposta.setHeader("Content-Type", "application/json");
        if (requisicao.method === "DELETE") {
            if (requisicao.is("application/json")) {
                const dados = requisicao.body;
                const id = dados['id'];
                const cpf = dados['cpf'];

                //verificação dos dados
                if (id && cpf) {
                    const cliente = new Cliente(id, cpf);
                    cliente.excluir().then(() => {
                        resposta.json({
                            "status": true,
                            "mensagem": "Cliente excluido com Sucesso!!"
                        });
                    }).catch((erro) => {
                        resposta.json({
                            "status": false,
                            "mensagem": "Erro ao excluido o cliente : " + erro.mensagem
                        });
                    });
                }
                else {
                    resposta.json({
                        "status": false,
                        "mensagem": "Verificar a documentação da API e informe todos os dados necessarios de um cliente"
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
                "mensagem": "Para excluir um cliente, utilise o metodo  DELETE!"
            });
        }
    }

    // HTTP GET
    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            //obiter um parametro da url
            //const nome = requisicao.params['nome'];
            //if(nome){...}

            //Obter um parametro do corpo da reqisição
            //const dados = requisicao.body;
            //const nome = dados['nome'];

            const cliente = new Cliente(0);
            cliente.consultar("").then((listaCliente) => {
                resposta.json(
                    listaCliente
                );
            }).catch((erro) => {
                resposta.json({
                    "status": false,
                    "mensagem": "Erro ao procurar o cliente : " + erro.mensagem
                });
            });
        }
        else {
            resposta.json({
                "status": false,
                "mensagem": "Para procurar um cliente, utilise o metodo  GET!"
            });
        }
    }

    // HTTP GET
    consultarID(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            //obiter um parametro da url
            const id = requisicao.params['id'];
            if (id) {
                const cliente = new Cliente(id);
                cliente.consultar(id).then((listaCliente) => {
                    resposta.json(
                        listaCliente
                    );
                }).catch((erro) => {
                    resposta.json({
                        "status": false,
                        "mensagem": "Erro ao procurar o cliente : " + erro.mensagem
                    });
                });
            }
            else {
                resposta.json({
                    "status": false,
                    "mensagem": "Verificar a documentação da API e informe todos os dados necessarios de um cliente"
                });
            }
        }
        else {
            resposta.json({
                "status": false,
                "mensagem": "Para procurar um cliente, utilise o metodo  GET!"
            });
        }
    }
}