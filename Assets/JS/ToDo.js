var createNewTaskElement = function (taskString, situString, endingString) { 
    var lineItem = document.createElement("tr");
    var columnItem1 = document.createElement("td");
    var columnItem2 = document.createElement("td");
    var columnItem3 = document.createElement("td");
    var columnItem4 = document.createElement("td");
    
    var labelTask = document.createElement("label");//label
    var labelSitu = document.createElement("label");
    var labelPrevisao = document.createElement("label");

    var botaoDeletar = document.createElement("button");//delete button
    var editButton = document.createElement("button");//edit button
    var confirmationButton = document.createElement("button");//confirmation button	

    labelTask.innerText = taskString;
    labelSitu.innerText = situString;
    labelPrevisao.innerText = endingString;

    botaoDeletar.innerHTML = " X ";
    botaoDeletar.className = "delete";

    editButton.innerHTML = " edit ";
    editButton.className = "edit";

    confirmationButton.innerHTML = " OK ";
    confirmationButton.className = "confirmation";

    columnItem1.appendChild(labelTask);
    columnItem2.appendChild(labelSitu);
    columnItem3.appendChild(labelPrevisao);
    columnItem4.appendChild(botaoDeletar);
    columnItem4.appendChild(editButton);
    columnItem4.appendChild(confirmationButton);

    lineItem.appendChild(columnItem1);
    lineItem.appendChild(columnItem2);
    lineItem.appendChild(columnItem3);
    lineItem.appendChild(columnItem4);
    return lineItem;
};

var addTask = function () {
    console.log("Add Task...");
    var task = forms.tarefa.value;
    if(task === ""){
        window.alert("Digite alguma descrição para Tarefa");
        return 0;
    }
    var situ = forms.situacao.value;
    var ending = forms.termino.value;
    var lineItem = createNewTaskElement(task, situ, ending);
    console.log(situ);
    if(situ === "Concluido"){
        tarefasConcluidas.appendChild(lineItem);
    }
    else{
        tarefasParaConcluir.appendChild(lineItem);
    }
    bindTaskEvents(lineItem);
    cleanTask();
};

var cleanTask = function(){
    forms.tarefa.value = "";
    forms.termino.value = "2021-01-01";
    var radio = document.getElementById("a-fazer");
    radio.checked = true;
}

var deleteTask = function () {
    console.log("Delete Task...");
    var lineItem = this.parentNode;
    var td = lineItem.parentNode;
    var tr = td.parentNode;
    // remove o nó pai da lista.
    tr.removeChild(td);
};

var editTask = function(){
    console.log("Editing Task...");
    var lineItem = this.parentNode;
    var td = lineItem.parentNode;

    td.getElementsByTagName('label')[0].innerText = prompt("Digite a nova Descrição da Tarefa:");

    var resposta = prompt("Digite a nova Situação da Tarefa:", "Não Iniciado | Pendente");
    var i = 0;
    while(resposta != "Não Iniciado" && resposta != "Pendente"){
        resposta = prompt("Digite a nova Situação da Tarefa:", "Não Iniciado | Pendente");
    }
    td.getElementsByTagName('label')[1].innerText = resposta;

    td.getElementsByTagName('label')[2].innerText = prompt("Digite a nova Data Prevista para Conclusão da Tarefa:");

}

var concludeTask = function(){
    console.log("Moving Task for conclude list...");
    var lineItem = this.parentNode;
    var td = lineItem.parentNode;
    var tr = td.parentNode;

    columnItem2 = td.getElementsByTagName('td')[1];
    var labelSitu = document.createElement("label");
    labelSitu.innerText = "Concluído";
    columnItem2.innerText = "";
    columnItem2.appendChild(labelSitu);

    columnItem4 = td.getElementsByTagName('td')[3];
    botaoOK = columnItem4.getElementsByTagName('button')[2];
    columnItem4.removeChild(botaoOK);
    // td.removeChild(columnItem4)

    console.log(tr);
    tarefasConcluidas.appendChild(td);
    console.log(tr)

    tr.removeChild(td);
}

var bindTaskEvents = function (taskListItem) {
    console.log("bind list item events");
    var botaoDeletar = taskListItem.querySelector("button.delete");
    var botaoEditar = taskListItem.querySelector("button.edit");
    var botaoOK = taskListItem.querySelector("button.confirmation");
    
    botaoDeletar.onclick = deleteTask;
    botaoEditar.onclick = editTask;
    botaoOK.onclick = concludeTask;
};

var initialization = function(){
    forms = document.forms.formulario;

    botaoAdicionarTarefa = document.getElementById("addbtn");
    botaoLimpar = document.getElementById("clearbtn");
    tarefasParaConcluir = document.getElementById("tabelaTarefasParaConcluir");
    tarefasConcluidas = document.getElementById("tabelaTarefasConcluidas");

    botaoAdicionarTarefa.addEventListener("click", addTask);
    botaoLimpar.addEventListener("click", cleanTask);
    
};