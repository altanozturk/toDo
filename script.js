

//const btn = document.querySelector("#btnDeleteAll");
//const btn2 = document.querySelector("#btnAddNewTask");

//btn.addEventListener("click", function(){
//    console.log("butona tıklandı.");
//})


//function btnClick(){
//    console.log("butona tıklandı");
//}
//btn.addEventListener("click",btnClick);

//btn.addEventListener("click", function(a){
//    a.preventDefault();
//})

// Mouse Eventleri

//const btn = document.querySelector("#btnAddNewTask");
//const ul = document.querySelector("#task-list");

//click event
//btn.addEventListener("click",run);
//ul.addEventListener("click",run);

// double click event
//btn.addEventListener("dblclick",run);

// mouse down event -> mouse ilk tıklandığı anda çalışır
//btn.addEventListener("mousedown",run);

// mouse up event -> mouse tıklansa bile bırakıldığı zaman çalışır 
//btn.addEventListener("mouseup",run);

// mouseenter event -> mouse üzerine geldiğinde tıklanmasa bile çalışır
//btn.addEventListener("mouseenter",run);

// mouse leave event -> mouse üzerine gelip ayrıldığında çalışır
//btn.addEventListener("mouseleave",run);

// mouseover event -> mouseenter'ın elementin alt elemanlarını da kapsayan halini
//ul.addEventListener("mouseover",run);

// mouse out event -> mouse leave'ın elementin alt elemanlarını da kapsayan halini
//ul.addEventListener("mouseout",run);



// Keyboard Eventleri

//const text = document.getElementById("txtTaskName");

// Focus

//text.addEventListener("focus",run);

// KeyUp

//text.addEventListener("keyup",run);


//function run(event){
//    console.log(`event type: ${event.type}`);
//    console.log(`girilen text: ${event.target.value}`);
//}



// Todo Eleman Ekleme

// Eleman Seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");

//const items = ["Todo 1", "Todo 2", "Todo 3", "Todo 4"];

let todos;

// Load Items

loadItems();
eventListeners();





function eventListeners() {
    // submit event
    form.addEventListener("submit", addNewItem);
    // delete an item
    taskList.addEventListener("click", deleteItem);
    // delete all items
    btnDeleteAll.addEventListener("click", deleteAllItems);
}


function loadItems() {

    todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item);

    })

}

// Get items from local storage
function getItemsFromLS(){

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos")); // JSON.parse arraye çevirecek
    }

    return todos;


}

// Set items to local storage
function setItemToLS(newTodo){

    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos)); // JSON.stringfy ile arrayden geri stringe çeviriyoruz
    
}

function createItem(newTodo) {
    // li oluşturma
    const li = document.createElement("li");
    li.classList = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

    // a oluşturma
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';


    li.appendChild(a);
    taskList.appendChild(li);
}



// Eleman Ekleme

function addNewItem(event) {

    if (input.value === '') {
        alert("add new item");
    }
    else {

        createItem(input.value);
        setItemToLS(input.value);


    }

    event.preventDefault();


}

// Eleman Silme

function deleteItem(event) {



    if (event.target.className === "fas fa-times") {
        if (confirm("Silmek istediğinize emin misiniz?")) {
            event.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(event.target.parentElement.parentElement.textContent);
        }

    }

    event.preventDefault();

}

function deleteTodoFromStorage(deleteTodo){

    let todos = getItemsFromLS();

    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));



}


// Tüm Elemanları Silmek

function deleteAllItems(event) {

    if (confirm("Tüm elemanları silmek istediğinize emin misiniz?")) {

        while(taskList.firstChild){  // bir ilk child varsa true dönecek
            taskList.removeChild(taskList.firstChild);

        }

        localStorage.clear();
        
    }

}


