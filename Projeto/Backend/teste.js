async function soma(a, b) {
    return await new Promise((resolver, rejeitar) => {
        setTimeout(() => {
            resolver(a + b);
        }, 3000);
    });
}

console.log("iniciou a execução do programa!");
console.log("Chamando a função soma...");
soma(10, 7).then((resultado) => {
    console.log("O resultado da soma é " + resultado);
});
console.log("Fim da execução do programa!");

/*(async function  chamar(){ 
    console.log(await soma(22, 76)); 
})();

chamar();*/
