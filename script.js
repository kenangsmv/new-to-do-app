const task_input = document.querySelector('#task-value'),
input_form = document.querySelector('.input-action'),
add_btn = document.querySelector("#add_btn"),
categoires_form = document.querySelectorAll('.categories-item'),
task_item = document.querySelectorAll('.task-items'),
trash_can = document.querySelector('.trash-can'),
task_items_place = document.querySelector("#task_items_parent");

let task_item_object;

add_btn.addEventListener('click', add_task);



show_tasks();

function show_tasks() {
    task_item_object=getItemFromLocalStorage();

    task_item_object.forEach(element => {
        createTask_item(element);
    });
}

function add_task(e) {
     e.preventDefault();
       
     if (!(task_input.value === "")) {
         
        createTask_item(task_input.value);
         setItemToLocalStorage(task_input.value);
         task_input.value="";
     }
     else{
         alert("Please type something")
     }

     


}

function createTask_item(value, id) {
    
    let col_12 = document.createElement("div");
    col_12.classList.add("col-12");

    let task_items = document.createElement("div");
    task_items.classList.add("task-items");

    var id__="";
    for (let i = 0; i < value.length; i++) {
         id__+=value[i];

        
    }
    id__=id__.replace(/ /g,'');
    task_items.setAttribute("id", id__);
    task_items.setAttribute("draggable", true);

    let done_button = document.createElement("input");
    done_button.type="checkbox";

   
    let p = document.createElement('p');
    p.textContent = value;

    task_items.appendChild(done_button);
    task_items.appendChild(p)
    col_12.appendChild(task_items);

    task_items_place.appendChild(col_12);
    
}

function getItemFromLocalStorage() {


    if (localStorage.getItem("task_items")===null) {
        task_item_object=[];
    }
    else{
        task_item_object=JSON.parse(localStorage.getItem("task_items"))
    }
    return task_item_object;
    
}
function setItemToLocalStorage(value) {
    
    task_item_object=getItemFromLocalStorage();

    task_item_object.push(value);

    localStorage.setItem("task_items", JSON.stringify(task_item_object))

}



task_items_place.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("Elementid", e.target.id);

          
});



trash_can.addEventListener("dragover",function (e) {
    e.preventDefault();
    
})





trash_can.addEventListener("drop", delete_item);

function delete_item(e) {
    e.stopPropagation();

    let dragged_item_id = e.dataTransfer.getData("Elementid");

    let dragged_item = document.getElementById(dragged_item_id);
    
    
    dragged_item.parentElement.remove();
    


}
