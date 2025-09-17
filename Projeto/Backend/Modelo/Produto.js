import ProdutoDAO from "../Persistencia/ProdutoDAO.js";

export default class Produto {
    //atributos privados
    //# define que o atributo se torne privado
    #codigo
    #descricao 
    #validade 
    #preco_custo 
    #preco_venda 
    #estoque
    #cod_barra

    //metodo construtor da classe
    constructor(codigo = 0,  descricao = "", validade = "", preco_custo = "", preco_venda = "", estoque = "",  cod_barra = "") {
        this.#codigo = codigo;
        this.#descricao = descricao;
        this.#validade = validade;
        this.#preco_custo = preco_custo;
        this.#preco_venda = preco_venda;
        this.#estoque = estoque;
        this.#cod_barra = cod_barra;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCOD) {
        if (novoCOD >= 0)
            this.#codigo = codigo;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novoDescricao) {
        this.#descricao = novoDescricao;
    }

    get validade() {
        return this.#validade;
    }

    set validade(novoValidade) {
        this.#validade = novoValidade;
    }

    get preco_custo() {
        return this.#preco_custo;
    }

    set preco_custo(novoPreco_custo) {
        this.#preco_custo = novoPreco_custo;
    }

    get preco_venda() {
        return this.#preco_venda;
    }

    set preco_venda(novoPreco_venda) {
        this.#preco_venda = novoPreco_venda;
    }

    get estoque() {
        return this.#estoque;
    }

    set estoque(novoEstoque) {
        this.#estoque = novoEstoque;
    }

    get cod_barra() {
        return this.#cod_barra;
    }

    set cod_barra(novoCod_barra) {
        this.#cod_barra = novoCod_barra;
    }

    //override toString()
    toString() {
        return "Minha descricao é " + this.descricao;
    }

    //override  para o JSON
    toJSON() {
        return {
            codigo: this.#codigo,
            descricao: this.#descricao,
            validade: this.#validade,
            preco_custo: this.#preco_custo,
            preco_venda: this.#preco_venda,
            estoque: this.#estoque,
            cod_barra: this.#cod_barra,
        }
    }

    async gravar() {
        const produtoDAO = new ProdutoDAO();
        const codigo = await produtoDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar() {
        const produtoDAO = new ProdutoDAO();
        await produtoDAO.atualizar(this);
    }

    async excluir() {
        const produtoDAO = new ProdutoDAO();
        await produtoDAO.excluir(this);
    }

    async consultar(nome) {
        const produtoDAO = new ProdutoDAO();
        return await produtoDAO.consultar(nome)
    }

    async consultarID(codigo) {
        const produtoDAO = new ProdutoDAO();
        return await produtoDAO.consultarId(codigo)
    }
}