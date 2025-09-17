import FornecedorDAO from "../Persistencia/FornecedorDAO.js";

export default class Fornecedor {
    //atributos privados
    //# define que o atributo se torne privado
    #codigo
    #nome
    #endereco
    #bairro
    #cidade
    #estado
    #cep
    #ativo

    //metodo construtor da classe
    constructor(codigo = 0,  nome = "", endereco = "", bairro = "", cidade = "", estado = "",  cep = "", ativo = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#cep = cep;
        this.#ativo = ativo;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCOD) {
        if (novoCOD >= 0)
            this.#codigo = codigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novoCidade) {
        this.#cidade = novoCidade;
    }

    get estado() {
        return this.#estado;
    }

    set estado(novoEstado) {
        this.#estado = novoEstado;
    }

    get cep() {
        return this.#cep;
    }

    set cep(novoCep) {
        this.#cep = novoCep;
    }
    
    get ativo() {
        return this.#ativo;
    }

    set ativo(novoAtivo) {
        this.#ativo = novoAtivo;
    }

    //override toString()
    toString() {
        return "Meu nome é " + this.nome;
    }

    //override  para o JSON
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            endereco: this.#endereco,
            bairro: this.#bairro,
            cidade: this.#cidade,
            estado: this.#estado,
            cep: this.#cep,
            ativo: this.#ativo
        }
    }

    async gravar() {
        const fornecedorDAO = new FornecedorDAO();
        const codigo = await fornecedorDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.atualizar(this);
    }

    async excluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.excluir(this);
    }

    async consultar(nome) {
        const fornecedorDAO = new FornecedorDAO();
        return await fornecedorDAO.consultar(nome)
    }

    async consultarID(codigo) {
        const fornecedorDAO = new FornecedorDAO();
        return await fornecedorDAO.consultarId(codigo)
    }
}