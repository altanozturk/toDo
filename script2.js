

// Elemanları Tanımlama

const newTask = document.querySelector("#txtTaskName");
const addButton = document.querySelector("#btnAddNewTask");
const taskList = document.querySelector("#task-list");
const deleteAll = document.querySelector("#btnDeleteAll");


loadItems();
eventListeners();
//deleteItemFromLS();


// Eventler
function eventListeners() {
    addButton.addEventListener("click", addTodo);
    taskList.addEventListener("click", deleteTodo);
    deleteAll.addEventListener("click", deleteAllTodos);
}

// Mevcut Todoları ekrana basma
function loadItems() {
    if (localStorage.getItem("todos") === null) {


    }
    else {
        let todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(function (item) {
            createElement(item);
        });

    }

}

// Bütün todoları silme

function deleteAllTodos(event) {

    if (confirm("Bütün görevleri silmek istediğinizden emin misiniz")) {
        while (taskList.firstChild) {
            taskList.firstChild.remove();
        }
    }

    //deleteAllItemsFromLS();
    localStorage.clear();
    event.preventDefault();

}

// Todo silme

function deleteTodo(event) {

    if (event.target.className === "fas fa-times") {
        if (confirm("Silmek istediğinizden emin misiniz?")) {
            event.target.parentElement.parentElement.remove();
            deleteItemFromLS(event.target.parentElement.parentElement.textContent);

        }

    }

    event.preventDefault();

    // classList kullanımı ile alternatif yol, ek olarak parentElement yerine parentNode kullanılabilir, CTRL+K VE CTRL+C yoruma alıyor, CTRL+K VE CTRL+U yorumu kaldırıyor

    // if(event.target.classList.contains("fas") && event.target.classList.contains("fa-times")){
    //     event.target.parentNode.parentNode.remove();
    // }

}

// localStorage.clear() tercih edilmeli, aşağıdaki fonskiyon iş görüyor ama içi boş bir array hala kalıyor
function deleteAllItemsFromLS(){
    let todos = getItemsFromLS();
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteItemFromLS(deleteTodo) {

    let todos = getItemsFromLS();

    todos.forEach(function (item, index) {

        if (item === deleteTodo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));



}

function getItemsFromLS() {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos === null) {
        return []; // Eğer "todos" anahtarı yoksa, boş bir dizi döndür
    } else {
        return JSON.parse(storedTodos);
    }

}

// Todo ekleme

function addTodo(event) {

    if (newTask.value === "") {
        alert("Lütfen bir görev giriniz");
    }
    else {
        createElement(newTask.value);
        let todos = getItemsFromLS();
        todos.push(newTask.value);
        localStorage.setItem("todos", JSON.stringify(todos));
        newTask.value = "";
    }

    event.preventDefault();


}



// Eleman oluşturma

function createElement(todo) {

    const li = document.createElement("li");
    li.classList = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(todo));

    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    taskList.appendChild(li);

}





