import ClienteDAO from "../Persistencia/ClienteDAO.js";

export default class Cliente {
    //atributos privados
    //# define que o atributo se torne privado
    #id
    #cpf
    #nome
    #sobrenome
    #endereco
    #cidade
    #estado
    #cep
    
    //metodo construtor da classe
    constructor(id = 0, cpf = "", nome = "", sobrenome = "", endereco = "", cidade = "", estado = "", cep = "") {
        this.#id = id;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#sobrenome = sobrenome;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#cep = cep;
    }

    get id() {
        return this.#id;
    }

    set id(novoID) {
        if (novoID >= 0)
            this.#id = id;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get sobrenome() {
        return this.#sobrenome;
    }

    set sobrenome(novoSobrenome) {
        this.#sobrenome = novoSobrenome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
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

    //override toString()
    toString() {
        return "Meu nome é " + this.nome;
    }

    //override  para o JSON
    toJSON() {
        return {
            id: this.#id,
            cpf: this.#cpf,
            nome: this.#nome,
            sobrenome: this.#sobrenome,
            endereco: this.#endereco,
            cidade: this.#cidade,
            estado: this.#estado,
            cep: this.#cep
        }
    }

    async gravar() {
        const clienteDAO = new ClienteDAO();
        const id = await clienteDAO.gravar(this);
        this.#id = id;
    }

    async atualizar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.atualizar(this);
    }

    async excluir() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.excluir(this);
    }

    async consultar(nome) {
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultar(nome);
    }

    async consultarID(id) {
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.consultarId(id);
    }
}