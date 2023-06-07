let todo_input=document.querySelector(".main #task");
const addButton=document.querySelector(".add");
const todolist=document.querySelector(".todos");
const clearButton=document.querySelector(".clear");
const checkbox=document.querySelector(".list input");
const filters=document.querySelectorAll(".filters button")

let editedTask=false;
let editedTaskId;
let todos=JSON.parse(localStorage.getItem("todo_list"));

filters.forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelector(".active" ).classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
}))

const addTodo=()=>{
    let userInput=todo_input.value.trim();
    todo_input.value="";
    if(editedTask){
        todos[editedTaskId].task=userInput;
        editedTask=false;
    }
    else{
        if (userInput){
            // console.log(userInput);
            if(!todos){
                todos=[];
            }
            todos_info={task:userInput,status:"pending"} 
            todos.push(todos_info);     /*stacking todo_info in todos array so that it is not overwritten*/
            }
        }
    localStorage.setItem("todo_list",JSON.stringify(todos));
    //Displaying todos in list
    showTodo("all");
}
addButton.addEventListener("click",addTodo);

//Show list
const showTodo=(filterName)=>{
    lst=""
   if (todos){
        todos.forEach((todo,id) => {
            // console.log(todos[id].status)
            let completed=todos[id].status=="completed"?"checked":"";
            if(filterName==todos[id].status || filterName=="all" ){
                lst+=`<div class="list" id="${id}" >
                    <input type="checkbox" id="${id}" onclick="updateStatus(this)" ${completed}/>
                    <p class="${completed}">${todo.task}</p>
                    <div class="menu">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                        <ul class="controls">
                            <li onclick="editTodo(${id})"><i class="fa-solid fa-pen"></i>Edit</li>
                            <li onclick="deleteTodo(${id})"><i class="fa-solid fa-trash-can"></i>Delete</li>
                        </ul>
                    </div>
                </div>`
            }
        });
    }
    todolist.innerHTML=lst || `<div>You don't have any tasks here! </div> `;
}
showTodo("all");


const updateStatus=(selectedTodo)=>{
    let taskname=selectedTodo.parentElement.children[1];
    if (selectedTodo.checked){
        taskname.classList.add("checked");
        todos[selectedTodo.id].status="completed";
        
    }
    else{
        taskname.classList.remove("checked");
        todos[selectedTodo.id].status="pending";
        
    }
    localStorage.setItem("todo_list",JSON.stringify(todos));
}

const deleteTodo=(id)=>{
    todos.splice(id,1);
    localStorage.setItem("todo_list",JSON.stringify(todos));
    showTodo("all");

}

const editTodo=(id)=>{
    todo_input.value=todos[id].task;
    editedTask=true;
    editedTaskId=id;
}

const deleteAll=()=>{
    alert("Are you sure you want to clear everything");
    localStorage.clear();
    todos=[];
    todolist.innerHTML="";
}
clearButton.addEventListener("click",deleteAll);