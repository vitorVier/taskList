let listElement = document.querySelector('#app ul'); //pega elemento UL do HTML
let inputElement = document.querySelector('#app input'); //pega elemento input
let buttonElement = document.querySelector('#app button'); //pega button

let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || []//busca itens no localStorage

// Adicionar Tarefas
function addTask() {
    if(inputElement.value === '') { //se o array estiver vazio, retorna falso
        alert('Digite alguma tarefa');
        return false;
    }
    else { 
        let newTask = inputElement.value; //cira elemento nova tarefa
        tarefas.push(newTask); //adiciona nova tarefa ao array de tarefas
        inputElement.value = ''; //zera o value de input

        renderTask(); //chama funcao para rendenizar tarefa
        saveData(); //chama funcao para salvar dados no localStorage
    }
}
buttonElement.onclick = addTask; // == button onclick="addTask()"
document.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
      addTask();
    } 
});

//Rendenizar tarefas 
function renderTask() { 
    listElement.innerHTML = ''; //elemente UL ou lista de elementos que será escrita no documento (inicializa zerada)
    
    tarefas.map((toDo) => { 
        let liElement = document.createElement("li"); //cria elemento li HTML
        let tarefaText = document.createTextNode(toDo); //cria texto com o que será escrito no input

        let linkElement = document.createElement('a'); //cria elemento a HTML
        linkElement.setAttribute("href", "#"); //

        let linkText = document.createTextNode("Excluir"); //cria texto 'Excluir'
        linkElement.appendChild(linkText); //adiciona o texto 'Excluir' ao elemento a criado

        let posicao = tarefas.indexOf(toDo); //pega a posicao do elemento que esta passando na triagem

        linkElement.setAttribute("onclick", `deleteTask(${posicao})`); //chama a funcao para deletar elemento na posicao x 
        
        liElement.appendChild(tarefaText); //adiciona o texto contido no li criado anteriormente 
        liElement.appendChild(linkElement); //adiciona o elemento a criado ao li criado anteriormente
        listElement.appendChild(liElement); //adiciona tudo que há contido em no elemento li ao elemento lista (ul do nosso HTML)
    })
}
renderTask();

function deleteTask(posicao) {
    tarefas.splice(posicao, 1); //deleta elemento da posicao
    renderTask(); //chama funcao que reendeniza a nova lista com o elemento já excluido
    saveData() //chama funcao para salvar dados com elementos excluidos no localStorage
}


function saveData() {
    localStorage.setItem("@listaTarefas", JSON.stringify(tarefas) );
}