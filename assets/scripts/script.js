/**
* * Criação de um dicionário de sinônimo a partir da API freedicionaryapi
*  
**/
// TODO:  link para pesquisa https://freedictionaryapi.com/api/v1/entries/pt/ouvir
const botaoPesquisa = document.querySelector(".botaInput");

// Quando o botão for clicado
botaoPesquisa.onclick = ()=>{
    const inputPalavra = document.querySelector(".inputPalavra").value.trim();
    // TODO: Exibindo tela de loading:
    const loading = document.createElement("div");
    document.body.appendChild(loading);
    loading.classList.add("telaLoading");
    for(let i = 1; i <=3;i++){
        let div = document.createElement("div");
        div.classList.add("bolas");
        loading.appendChild(div);
    }
    

    buscarSinonimos(inputPalavra); // Chamada de função da API
}
const resultadoDiv = document.querySelector(".resultado");

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

            // Evitando Bug de palavras da API e repetição de palavras;
            if((palavra.slice(0,3) == inputPalavra.slice(0,3)) && !(sinonimos.includes(palavra))){
                sinonimos.push(palavra)
            }
        });

        // Removendo tela de loading
        setTimeout(()=>{
            document.body.removeChild(document.querySelector(".telaLoading"));
            mostrarSinonimos(sinonimos)
        }, 3000);
        
    })
    .catch(()=>{ // ! Mensagem de erro.
        // Removendo tela de loading
        setTimeout(()=>{
            document.body.removeChild(document.querySelector(".telaLoading"));
            mostrarErro("Palavra não encontrada");
        }, 3000);
        
    });
}

// TODO: Mostrar sinônimos:
function mostrarSinonimos(sinonimos){
   const qntResultados = parseInt(document.querySelector(".qntResult").value);

   // ! Mensagem de resultados insuficientes
   if(sinonimos.length < qntResultados){
        mostrarErro("Resultados insuficientes...");
   }
   
    // Filtrando quantidade de palavras;
    sinonimos = sinonimos.splice(0,qntResultados);
    const resultado = document.querySelector(".resultados");
    let frase = ""
    sinonimos.forEach((e)=>{

        frase += e +", "
    })
    // ! Mostrando resultados
    resultado.innerHTML= frase;
    resultadoDiv.classList.add("surgindo")
    
    // Zerando inputs:
    document.querySelector(".qntResult").value = "";
    document.querySelector(".inputPalavra").value = "";
}

// TODO: Mostrar mensagem de erro:
function mostrarErro(msg){
    const error = document.querySelector(".error");
    error.classList.add("errorAconteceu");
    setTimeout(() =>{error.classList.remove("errorAconteceu");}, 3000);
    error.innerHTML = msg;

    //Mudando estado para erro:
    document.querySelector(".inputPalavra").classList.add("erroInput");
    document.querySelector(".qntResult").classList.add("erroInput");
    setTimeout(() =>{
        document.querySelector(".inputPalavra").classList.remove("erroInput");
        document.querySelector(".qntResult").classList.remove("erroInput");
    }, 3000);
}

// Fechar Resultados:
const botaoFechar = document.querySelector(".fechar");
botaoFechar.onclick = () => {
    resultadoDiv.classList.remove("surgindo");
}

// Digitação:

let frases = ["O melhor dicionário do mundo!","Tá na dúvida? Da um Busca!", "O dicionário na sua mão!"]

const paragrafo = document.querySelector(".digitacao");


let i = 0;
setInterval(()=>{
    
    let larguraP = frases[i].length;
    paragrafo.innerHTML = frases[i]
    console.log(frases[i], larguraP)
    i++;
    if(i>2){i=0};
    paragrafo.style.setProperty("--largura", (larguraP-5)+"rem");
}, 6250);





