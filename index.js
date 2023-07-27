// pegando os elementos no html pelo atributo id
const formulario = document.getElementById('form')
const todoInput = document.getElementById('todo')
const lista = document.getElementById('list')
const CHAVE_DADOS_OFFLINE = "TODO_LIST";
const todolist = pegarDadosOffline()
//variavel para armazenar todos os dados submetido pelo usuario
renderizarLista()
// se inscrevendo no evento de submit do formulario 
formulario.addEventListener('submit', function (event) {
    // impedir o formulario de atualizar ou redirecionar a tela 
    event.preventDefault()

    //criando uma variavel, acessando o valor do input,
    // removendo espaços em branco no começo e final do texto
    const value = todoInput.value.trim()

    // verificando se o valor submitado esta em branco
    if (value === "") {
        //exibindo um popup de alerta para o nosso ususario
        alert("O valor nao pode ser em branco");

        //executando o retorn, para que o código nao continuea execução 
        return;
    }

    // mapeando a nossa lista de dados, converndo tudo para a letra maiscula
    const todolistUppercase = todolist.map(function (item) {
        return item.toUpperCase();
    });

    //verificando se o dado já esta incluso na nossa lista
    const jaExisteNaPilha = todolistUppercase.includes(value.toUpperCase());

    if (jaExisteNaPilha) {
        //exibindo um popup de alerta para o nosso usuario
        alert("o valor já esta na lista");
        //execuando o return para que o codigo nao continue a execucao
        return;
    }
    //adicionando o dado na lista
    todolist.push(value)

    // limpando o input para remover todas as letras/numeros/etc...inseridos no input
    todoInput.value = ''

    console.log(todolist)
    // estamos removendo todo o conteudo da lista no html

    renderizarLista()

})

function renderizarLista() {
    lista.innerHTML = ''

    //percorrendo a nossa lista, item a item (loop)
    for (let index = 0; index < todolist.length; index += 1) {
        //pegando o item do loop atual
        const itemDaLista = todolist[index]

        //adicionando o elemento no html referente ao nosso item atual
        lista.innerHTML += `
            <div class= "todo-item" >
                <span>${itemDaLista}</span>
                <button type="button" onclick="removerTodoItem(${index})">x</button>
    </div >
            `
    }

    salvarOffline()
}

function removerTodoItem(index) {
    const todoItem = todolist[index]

    const isDeletar = confirm(`Deeja realmente remover a tarefa "${todoItem}"?`)

    if (isDeletar) {
        todolist.splice(index, 1)
        console.log(todolist)
    }

    renderizarLista()

}


//armazena os dados offline
function salvarOffline() {
    const todoListString = JSON.stringify(todolist)

    localStorage.setItem(CHAVE_DADOS_OFFLINE, todoListString)
}


function pegarDadosOffline() {
    const dadosOffline = localStorage.getItem(CHAVE_DADOS_OFFLINE);
    console.log(dadosOffline);

    //caso não tenha dados salvos ainda, ele vai retornar um array vazio
    // para podermos iniciar o nosso todoList

    if (dadosOffline === null) return []


    //convertermos agora os dados de string para array
    const array = JSON.parse(dadosOffline)
    console.log('depois de ser convertido de string para array', array)

    return array

}