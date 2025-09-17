import conectar from './Conexao.js';
import Produto from '../Modelo/Produto.js';

export default class ProdutoDAO {
    constructor() {

    }
    
    async gravar(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = 'INSERT INTO Produto (descricao, validade, preco_custo, preco_venda, estoque,  cod_barra) VALUE (?,?,?,?,?,?)';
            const parametros = [produto.descricao, produto.validade, produto.preco_custo,  produto.preco_venda, produto.estoque, produto.cod_barra];
            const resultado = await conexao.query(sql, parametros);
            return resultado[0].insertId;
        }
    }

    async atualizar(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = 'UPDATE Produto SET  descricao = ?, validade = ?, preco_custo = ?, preco_venda = ?, estoque = ?,  cod_barra = ? WHERE codigo = ?';
            const parametros = [produto.descricao, produto.validade, produto.preco_custo,  produto.preco_venda, produto.estoque, produto.cod_barra, produto.codigo];
            const resultado = await conexao.query(sql, parametros);
            return resultado[0].insertId;
        }

    }

    async excluir(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = 'DELETE FROM Produto WHERE codigo = ?';
            const parametros = [produto.codigo];
            const resultado = await conexao.query(sql, parametros);
            return resultado[0].insertId;
        }
    }

    async consultar(nome) {
        const conexao = await conectar();
        const sql = "SELECT * FROM Produto WHERE descricao LIKE ?";
        const parametros = ['%' + nome + '%'];
        const [rows] = await conexao.query(sql, parametros);
        let listaprodutos = [];
        for (const registro of rows) {
            const produto = new Produto(registro['codigo'], registro['descricao'],registro['validade'], 
                registro['preco_custo'], registro['preco_venda'], registro['estoque'], registro['cod_barra'])
            listaprodutos.push(produto);
        }
        return listaprodutos;
    }

    async consultarId(codigo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM Produto WHERE codigo = ?";
        const parametros = [codigo];
        const [rows] = await conexao.query(sql, parametros);
        let listaprodutos = [];
        for (const registro of rows) {
            const produto = new Produto(registro['codigo'], registro['descricao'],registro['validade'], 
                registro['preco_custo'], registro['preco_venda'], registro['estoque'], registro['cod_barra'])
            listaprodutos.push(produto);
        }
        return listaprodutos;
    }
}

