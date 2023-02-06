const inputNome = document.querySelector(".nome");
const inputSobrenome = document.querySelector(".sobrenome");
const inputCpf = document.querySelector(".cpf");
const inputUsuario = document.querySelector(".usuario");
const inputSenha = document.querySelector(".senha");
const inputRepSenha = document.querySelector(".repSenha");
const btnSubmit = document.querySelector(".btnSubmit");
let erroMsgNome = document.querySelector(".errorMsgNome");
let erroMsgSobrenome = document.querySelector(".errorMsgSobrenome");
let erroMsgCpf = document.querySelector(".errorMsgCpf");
let erroMsgUsuario = document.querySelector(".errorMsgUsuario");
let erroMsgSenha = document.querySelector(".errorMsgSenha");
let erroMsgRepSenha = document.querySelector(".errorMsgRepSenha");


// AGORA PRECISA PEGAR TODOS OS ELEMENTOS DA PAGINA
class ValidaForm{
    constructor(nome, sobrenome, cpf, usuario, senha, repSenha){
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cpf = cpf;
        this.usuario = usuario;
        this.senha = senha;
        this.repSenha = repSenha;
    }
    
// checkCampoVazio ESTA FUNCIONANDO    
    checkCampoVazio(params) {
        if (params === "") {
            console.log("Está vazio");
            return true;         
        };
        console.log("Não está vazio");
        return false;
    }
// AQUI ESTA MOSTRANDO NO CONSOLE SE ESTÁ VAZIO OU NAO

// checkUsuario ESTA FUNCIONANDO
    checkUsuario(params){
        if(typeof params === "string" || typeof params === "number") {
            if(params === ""){
                return console.log("string vazia");
            }else if(params.length>=3 && params.length <=12){
                console.log("Usuario tem entre 3 e 12 caracteres")
            return true;
            }else{
                console.log("Usuario nao atende as condicoes");
                return false
            }
        }else{
            console.log("Usuario nao atende as condicoes");
            return false;
        }
    }

    // ERA PRECISO COLOCAR LET ANTES DAS VARIAVEIS, POR ISSO O ERRO
    validarCPF (digitos){
        //let cpf = `705.484.450-52`
        let cpf = digitos;
        let cpfLimpo = cpf.replace(/\D+/g, "");
        // cpfLimpo ainda é string aqui
    
        let cpfArray = Array.from(cpfLimpo);
        // cpf Array já é número aqui e pode fazer contas;
    
        let cpfSliced = cpfArray.slice(0,-2);
        //Aqui estou excluindo os dois ultimos digitos do array
        let contador = 10
        let somaTotal1 = cpfSliced.reduce((ac, val) => ac + Number(val*contador--), 0)
        //console.log(cpfSliced.reduce((ac, val) => ac + Number(val*contador--), 0));
        let primeiroDigito = 11 - (somaTotal1 % 11);
        if (primeiroDigito>9){
            primeiroDigito = 0;
        }
        let primeiroDigitoString = primeiroDigito.toString();
    
        cpfSliced.push(primeiroDigito.toString());
        contador = 11;
    
        let somaTotal2 = cpfSliced.reduce((ac, val) => ac + Number(val*contador--), 0);
        let segundoDigito = 11 - (somaTotal2 % 11);
        if (segundoDigito>9){
            segundoDigito = 0;
        }
        // para deixar todo os elementos do array em string e fazer a comparaçao
        cpfSliced.push(segundoDigito.toString());
        // fazer um looping comparando cada indice dos dois arrays, se forem iguais, entao é cpf valido
        let i = 0;
        let validacao = false;
        for(let valor of cpfArray){
            if (valor === cpfSliced[i]){
                validacao = true;
                i++;
            }else{
                validacao = false;
                break;
            }
        }
        
        if (validacao === true){
            console.log("CPF VÁLIDO");
            return true;
        }else if (validacao !== true){
            console.log("CPF INVÁLIDO");
            return false;
        }
    }
    


// chechSenha FUNCIONANDO
    checkSenha(params){
        let senhaArray = params.toString();
        senhaArray = Array.from(senhaArray);
        if(senhaArray.length>= 6 && senhaArray.length<= 12){
            console.log("Senha está entre 6 e 12 caracteres");
            return true;
        }else{
            console.log("Senha nao atende as condicoes");
            return false;
        }
    }
// AQUI JA ESTÁ SENDO TRANSFORMADO QUALQUER PARAMETRO DE NUMERO EM STRING PARA FAZER A CONTAGEM
// DOS INDICES DO ARRAY E COMPARAR NA CONDICIONAL
//checkRepSenha FUNCIONANDO
    checkRepSenha(senha, repSenha){
        let senhaArray = senha.toString();
        senhaArray = Array.from(senhaArray);

        let repSenhaArray = repSenha.toString();
        repSenhaArray = Array.from(repSenhaArray);

        let contadorOf = 0;
// EU POSSO PRIMEIRO CONFERIR A QUANTIDADE DE INDICES, CASO FOREM IGUAIS, AI SEGUE PARA A PROXIMA ETAPA
// DE CONFERIR CADA ELEMENTO.
        if(senhaArray.length !== repSenhaArray.length){
            return false;
        }
        
        for(let valor of senhaArray){
            if(valor !== repSenhaArray[contadorOf]){                
                return false;
                ;
            }
            contadorOf++;
        }
        return true;
    }
    createsNegativeText(target){
        target.innerText = "Informação inválida. Por favor, digite as informações solicitadas."        
    }

}


const p1 = new ValidaForm("Felipe", "Alves", 007, "felipealv", "fa123456", "fa123456");
const p2 = new ValidaForm("Severino", "Silva", 010, "sevAlv", 1234567, 1234567);
//console.log(p1.checkSenha(p1.senha));
//console.log(p1.checkRepSenha(p1.senha, p1.repSenha));
//console.log(p1.checkUsuario(p1.usuario));
//ACIMA TODOS ESTAO FUNCIONANDO PERFEITAMENTE
// PARA TRABALHAR COM CONSOLE.LOG O CODIGO ESTA FUNCIONANDO, AGORA É PRECISO INTERACAO COM DOM


let nome;
let sobrenome;
let cpf;
let usuario;
let senha;
let repSenha;

btnSubmit.addEventListener("click", function(e){
    e.preventDefault();
    erroMsgNome.innerText = "";
    erroMsgSobrenome.innerText = "";
    erroMsgCpf.innerText = "";
    erroMsgUsuario.innerText = "";
    erroMsgSenha.innerText = "";
    erroMsgRepSenha.innerText = "";
    
    nome = inputNome.value;
    sobrenome = inputSobrenome.value;
    cpf = inputCpf.value;
    usuario = inputUsuario.value;
    senha= inputSenha.value;
    repSenha = inputRepSenha.value;

    const p3 = new ValidaForm(nome, sobrenome, cpf, usuario, senha, repSenha);
    console.log(p3.validarCPF(p3.cpf));

    p3.checkCampoVazio(p3.nome);    
//feito
    p3.checkCampoVazio(p3.sobrenome);

    p3.checkCampoVazio(p3.cpf);
    p3.validarCPF(p3.cpf);

    p3.checkCampoVazio(p3.usuario);
    p3.checkUsuario(p3.usuario);

    p3.checkCampoVazio(p3.senha);
    p3.checkSenha(p3.senha);

    p3.checkCampoVazio(p3.repSenha);
    p3.checkRepSenha(p3.senha, p3.repSenha);

    if(p3.checkCampoVazio(p3.nome)){
        p3.createsNegativeText(erroMsgNome);
        document.getElementById("erroNome").style.color = "red";
    }
    if(p3.checkCampoVazio(p3.sobrenome)){
        p3.createsNegativeText(erroMsgSobrenome);
        document.getElementById("erroSobrenome").style.color = "red";
    }
    if(p3.checkCampoVazio(p3.cpf)){
        p3.createsNegativeText(erroMsgCpf);
        document.getElementById("erroCpf").style.color = "red";
    }
    if(p3.checkCampoVazio(p3.usuario)){
        p3.createsNegativeText(erroMsgUsuario);
        document.getElementById("erroUsuario").style.color = "red";
    }
    if(p3.checkCampoVazio(p3.senha)){
        p3.createsNegativeText(erroMsgSenha);
        p3.createsNegativeText(erroMsgRepSenha);
        document.getElementById("erroSenha").style.color = "red";
        document.getElementById("erroRepSenha").style.color = "red";
    }
    if(p3.checkCampoVazio(p3.repSenha)){
        p3.createsNegativeText(erroMsgSenha);
        p3.createsNegativeText(erroMsgRepSenha);
        document.getElementById("erroSenha").style.color = "red";
        document.getElementById("erroRepSenha").style.color = "red";
    }
    if(!p3.validarCPF(p3.cpf)){
        erroMsgCpf.innerText = "CPF inválido. Por favor, insira um CPF válido."
        document.getElementById("erroCpf").style.color = "red";
    }
    if(!p3.checkSenha(p3.senha)){
        p3.createsNegativeText(erroMsgSenha);
        document.getElementById("erroSenha").style.color = "red";
    }
    
    if(!p3.checkRepSenha(p3.senha, p3.repSenha)){
        p3.createsNegativeText(erroMsgSenha);
        p3.createsNegativeText(erroMsgRepSenha);
        document.getElementById("erroSenha").style.color = "red";
        document.getElementById("erroRepSenha").style.color = "red";
    }

// document.getElementById("erroRepSenha").style.color = "red";
// LINHA PARA ALTERAR A COR DA FONTE DO TEXTO DE ERRO
    
// ESTA PEGANDO AS INFORMAÇOES DA PAGINA E APLICANDO EM P3
// CODIGO ESTA CONFIRMANDO O CPF NORMALMENTE
// FALTA AINDA COLOCAR AS OBSERVAÇÕES CASO NAO SEJA APROVADA AS VERIFICACOES
// FALTA ESCREVER NO DOM AS NEGACOES QUANDO FOR RECUSADO.
    
});

