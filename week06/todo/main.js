

// Select the Elements
const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "checkedMark";
const UNCHECK = "unCheckedMark";
const LINE_THROUGH = "madeItMark";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// add to do function

function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="icons ${DONE} completedMark" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <img src="img/minitrash.png" class="icon trash" job="delete" id="${id}">
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage 
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});


// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage 
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

//function gruopChecked() {
  //  document.getElementsByClassName('CHECK');
  //}

  function gruopChecked(){
    var arrayInput = new Array();
    var inputValues = document.getElementsByClassName('completedMark'),
    namesValues = [].map.call(inputValues,function(dataInput){
    arrayInput.push(dataInput.value);
    });
    arrayInput.forEach(function(inputsValuesData){
    console.log(inputsValuesData);
    });
    }













