
$(document).ready(function () {
    const task_input = document.querySelector('#task-value'),
    input_form = document.querySelector('.input-action'),
    add_btn = document.querySelector("#add_btn"),
    categoires_form = document.querySelectorAll('.categories-item'),
    task_item = document.querySelectorAll('.task-items'),
    trash_can = document.querySelector('.trash-can'),
    task_items_place = document.querySelector("#task_items_parent");
    
    let task_item_object;
    let completed_task_item_object;

    
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
       
    
        let done_button = document.createElement("input");
        done_button.setAttribute("type","checkbox");
    
       
        let p = document.createElement('p');
        p.textContent = value;
    
        let i = document.createElement("i");
        i.classList.add('fas', "fa-trash","task-delete");
    

    
        task_items.appendChild(done_button);
        task_items.appendChild(p);
        task_items.appendChild(i);
    
    
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

    function completed_items_FromLocalStorage() {
      
        if (localStorage.getItem("completed_items") === null){
            completed_task_item_object=[];
        }
        else{
            completed_task_item_object=JSON.parse(localStorage.getItem("completed_items"));
        }
        return completed_task_item_object;
    }
    function completed_items_ToLocalStorage(value) {
        completed_task_item_object= completed_items_FromLocalStorage();
        console.log(completed_task_item_object);
        completed_task_item_object.push(value);

        localStorage.setItem("completed_items",JSON.stringify(completed_task_item_object));
    }

    function delete_item_fromLocalStorage(value) {
        task_item_object=getItemFromLocalStorage();

        task_item_object.forEach(function(element, index) {

             if (element === value) {
                task_item_object.splice(index, 1);
             }

        });

        localStorage.setItem("task_items", JSON.stringify(task_item_object));

    }

    function delete_completed_items_FromLocalStorage(value) {

        completed_task_item_object=completed_items_FromLocalStorage();

        completed_task_item_object.forEach(function (element,index){
          if (element === value) {
              completed_task_item_object.splice(index, 1);
          }    

        } 
            
        );
        localStorage.setItem("completed_items", JSON.stringify(completed_task_item_object));
        
    }
    

 $("#task_items_parent").click(function (e) {
  
      if (e.target.nodeName ==="INPUT" && $(e.target).prop("checked")) {
           $(e.target).attr("checked", "checked").next().css("text-decoration","line-through");
           completed_items_ToLocalStorage($(e.target).parent().text());
      } 
      if(e.target.nodeName ==="INPUT" && !($(e.target).prop("checked"))) {
        $(e.target).removeAttr("checked", "checked").next().css("text-decoration","none");
        delete_completed_items_FromLocalStorage($(e.target).parent().text());
          
      }


     if ($(e.target).hasClass("fa-trash")) {
        $(e.target).parent().remove();
        
        delete_item_fromLocalStorage($(e.target).parent().text())
        delete_completed_items_FromLocalStorage($(e.target).parent().text());
     }
    
 })

})


