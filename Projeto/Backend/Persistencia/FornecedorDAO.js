import conectar from './Conexao.js';
import Fornecedor from '../Modelo/Fornecedor.js';

export default class FornecedorDAO {
    constructor() {

    }

    async gravar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = 'INSERT INTO Fornecedor (nome, endereco, bairro, cidade, estado,  cep, ativo) VALUE (?,?,?,?,?,?,?)';
            const parametros = [fornecedor.nome, fornecedor.endereco, fornecedor.bairro,  fornecedor.cidade, fornecedor.estado, fornecedor.cep, fornecedor.ativo];
            const resultado = await conexao.query(sql, parametros);
            return resultado[0].insertId;
        }
    }

    async atualizar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = 'UPDATE Fornecedor SET  nome = ?, endereco = ?, bairro = ?, cidade = ?, estado = ?,  cep = ?, ativo = ? WHERE codigo = ?';
            const parametros = [fornecedor.nome, fornecedor.endereco, fornecedor.bairro,  fornecedor.cidade, fornecedor.estado, fornecedor.cep, fornecedor.ativo, fornecedor.codigo];
            const resultado = await conexao.query(sql, parametros);
            return resultado[0].insertId;
        }

    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = 'DELETE FROM Fornecedor WHERE codigo = ?';
            const parametros = [fornecedor.codigo];
            const resultado = await conexao.query(sql, parametros);
            return resultado[0].insertId;
        }
    }

    async consultar(nome) {
        const conexao = await conectar();
        const sql = "SELECT * FROM Fornecedor WHERE nome LIKE ?";
        const parametros = ['%' + nome + '%'];
        const [rows] = await conexao.query(sql, parametros);
        let listafornecedores = [];
        for (const registro of rows) {
            const fornecedor = new Fornecedor(registro['codigo'], registro['nome'],registro['endereco'], 
                registro['bairro'], registro['cidade'], registro['estado'], registro['cep'], registro['ativo'])
            listafornecedores.push(fornecedor);
        }
        return listafornecedores;
    }

    async consultarId(codigo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM Fornecedor WHERE codigo = ?";
        const parametros = [codigo];
        const [rows] = await conexao.query(sql, parametros);
        let listafornecedores = [];
        for (const registro of rows) {
            const fornecedor = new Fornecedor(registro['codigo'], registro['nome'],registro['endereco'], 
                registro['bairro'], registro['cidade'], registro['estado'], registro['cep'], registro['ativo'])
            listafornecedores.push(fornecedor);
        }
        return listafornecedores;
    }
}

