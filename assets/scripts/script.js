/**
* * Criação de um dicionário de sinônimo a partir da API freedicionaryapi
*  
**/
// TODO:  link para pesquisa https://freedictionaryapi.com/api/v1/entries/pt/ouvir
const botaoPesquisa = document.querySelector(".botaInput");

// Quando o botão for clicado
botaoPesquisa.onclick = ()=>{
    const inputPalavra = document.querySelector(".inputPalavra").value.trim();
    
    buscarSinonimos(inputPalavra); // Chamada de função da API
}


// * Buscando os sinônimos na API
async function buscarSinonimos(inputPalavra){
    const url = `https://freedictionaryapi.com/api/v1/entries/pt/${inputPalavra}`
    fetch(url)
    // TODO: Abrindo informações para obter apenas os sinônimos;
    .then((x)=> x.json())
    .then((x)=> {
        let sinonimos = []
        const dados = x.entries[0].forms
        dados.forEach((e)=>{
            let palavra = e.word;
            // Evitando Bug de palavras da API;
            if(palavra.slice(0,3) == inputPalavra.slice(0,3)){
                sinonimos.push(palavra)
            }
        });
        mostrarSinonimos(sinonimos);
    })
    .catch((erro)=>{ // ! Mensagem de erro.
        const msgError = "Palavra não encontrada!"
        mostrarErro(msgError);
    });
}

// TODO: Mostrar sinônimos:
function mostrarSinonimos(sinonimos){
   const qntResultados = parseInt(document.querySelector(".qntResult").value);

   // ! Mensagem de reusltados insuficientes
   if(sinonimos.length < qntResultados){
        console.log("Erro");
   }
   
    sinonimos = sinonimos.splice(0,qntResultados);
    console.log(sinonimos)
    const resultadoDiv = document.querySelector(".resultado");
    const resultado = document.querySelector(".resultados");
    let frase = ""
    sinonimos.forEach((e)=>{

        frase +=  " ,"+ e
    })
    resultado.innerHTML= frase;
    resultadoDiv.classList.add("surgindo") // ! Mostrando resultados
    

}

// TODO: Mostrar mensagem de erro:
function mostrarErro(msg){

}

