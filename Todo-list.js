var addButton = document.getElementById("add-button");
addButton.addEventListener("click",addToDoItem);
var enterText = document.getElementById("todo-entry-box");
var toDoList  = document.getElementById("todo-list");
enterText.addEventListener("keydown", function(event){
    if (event.code === "Enter") {
        event.preventDefault();
        addButton.click();
    }
    });

function addToDoItem(){
    var itemText = "";
   var itemText = enterText.value;
   if(itemText==""){
       return;
   }
   else{
   newToDoItem(itemText,false);
   enterText.value = "";
   }
}
var clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click",clearItem);
function clearItem(){
    var completedItems = toDoList.getElementsByClassName("completed");
    if(completedItems.length >0 ){
    while(completedItems.length >0 ){
        completedItems.item(0).remove();
    }
}
else {
    alert("There are no completed items in the list!");
}
}
var emptyButton = document.getElementById("empty-button");
emptyButton.addEventListener("click",emptyItems);
function emptyItems(){
    var decision = window.confirm("Empty the list?");
   if(decision){
   var toDoItems = toDoList.children;
   if(toDoItems.length > 0 ){
   while(toDoItems.length > 0 ){
       toDoItems.item(0).remove();
   }
}
else{
    alert("There are no items in the list.");
}
}
}
var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click",saveItem);
function saveItem(){
    var toDos = [];
    for(var i=0;i<toDoList.children.length;i++){
        var toDo = toDoList.children.item(i);
        var toDoInfo = {
            "task":toDo.innerText,
            "completed":toDo.classList.contains("completed")
        };
        toDos.push(toDoInfo);
    }
    localStorage.setItem("toDos",JSON.stringify(toDos));
    alert("Hooray! Your list is saved");

}
function loadList(){
    if(localStorage.getItem("toDos")!=null){
        var toDos = JSON.parse(localStorage.getItem("toDos"));
        for(var i = 0;i<toDos.length;i++){
            var toDo = toDos[i];
            newToDoItem(toDo.task,toDo.completed);
        }
    }
}
function toggleToDoItemState(){
    if(this.classList.contains("completed")){
        this.classList.remove("completed")
    }
    else {
        this.classList.add("completed");
    }
}
function newToDoItem(itemText,completed){
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);
    if(completed){
        toDoItem.classList.add("completed");
    }
    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick",toggleToDoItemState);
}

loadList();