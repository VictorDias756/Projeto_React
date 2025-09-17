import conectar from './Conexao.js';
import Cliente from '../Modelo/Cliente.js';

export default class ClienteDAO {
    constructor() {

    }

    async gravar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = 'INSERT INTO Cliente (cpf, nome, sobrenome, endereco, cidade, estado, cep) VALUE (?,?,?,?,?,?,?)';
            const parametros = [cliente.cpf, cliente.nome, cliente.sobrenome, cliente.endereco, cliente.cidade, cliente.estado, cliente.cep];
            const resultado = await conexao.query(sql, parametros);
            return resultado[0].insertId;
        }
    }

    async atualizar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = 'UPDATE Cliente SET cpf = ?, nome = ?, sobrenome = ?, endereco = ?, cidade = ?, estado = ?, cep = ? WHERE ID=?';
            const parametros = [cliente.cpf, cliente.nome, cliente.sobrenome, cliente.endereco, cliente.cidade, cliente.estado, cliente.cep, cliente.id];
            const resultado = await conexao.query(sql, parametros);
            return resultado[0].insertId;
        }

    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = 'DELETE FROM Cliente WHERE id = ?';
            const parametros = [cliente.id];
            const resultado = await conexao.query(sql, parametros);
            return resultado[0].insertId;
        }
    }

    async consultar(nome) {
        const conexao = await conectar();
        const sql = "SELECT * FROM Cliente WHERE nome LIKE ?";
        const parametros = ['%' + nome + '%'];
        const [rows] = await conexao.query(sql, parametros);
        let listaclientes = [];
        for (const registro of rows) {
            const cliente = new Cliente(registro['id'], registro['cpf'], registro['nome'], registro['sobrenome'],
                registro['endereco'], registro['cidade'], registro['estado'], registro['cep'])
            listaclientes.push(cliente);
        }
        return listaclientes;
    }

    async consultarId(id) {
        const conexao = await conectar();
        const sql = "SELECT * FROM Cliente WHERE id = ?";
        const parametros = [id];
        const [rows] = await conexao.query(sql, parametros);
        let listaclientes = [];
        for (const registro of rows) {
            const cliente = new Cliente(registro['id'], registro['cpf'], registro['nome'], registro['sobrenome'],
                registro['endereco'], registro['cidade'], registro['estado'], registro['cep'])
            listaclientes.push(cliente);
        }
        return listaclientes;
    }
}

