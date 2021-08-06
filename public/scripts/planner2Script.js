//Create axios instance here
const myAxios = axios.create({ withCredentials: true });

//variables
let recipes =[];
let currentPage=1;
let allPage=0;
let numberOfSelected=0;

//Elements from document
//Control on top right corner
const buttonSave =          document.getElementById("buttonSave")
const buttonCreate =        document.getElementById("buttonCreate")
const buttonDelete =        document.getElementById("buttonDelete")
const selectPlan =          document.getElementById("selectPlan")
const meesage =             document.getElementById("message");
//Title of the Plan
const planTitle =           document.getElementById("planTitle")
const icon =                document.getElementById("icon");
//Modal controls
const closeModalButton =    document.getElementById("closeModalButton");
const addRecipeButton =     document.getElementById("addRecipeButton");
const searchInputModal =    document.getElementById("searchInputModal");
const recipeList =          document.getElementById("recipeList");
//Modal
const modal =               document.getElementById("modal-planner");
const modalOverlay =        document.getElementById("modal-overlay-planner");
const buttonPrevPage =      document.getElementById("prevPageButton");
const buttonNextPage =      document.getElementById("nextPageButton");
const currentPageDisplay=   document.getElementById("currentPage");
const allPageDisplay=       document.getElementById("allPage");

//Events + adding eventlisteners

//Plan control
selectPlan.addEventListener('change', (event) => {
    loadSelectedPlan();
});

buttonSave.addEventListener('click',()=>{
    savePlan();
});

buttonCreate.addEventListener('click',()=>{
    createPlan();
});

buttonDelete.addEventListener('click',()=>{
    deletePlan();
});

icon.addEventListener('click',()=>{
    planTitle.focus();
});

//Modal eventlisteners
closeModalButton.addEventListener('click',()=>{
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
});

buttonPrevPage.addEventListener('click',()=>{
    goPreviousPage();
});

buttonNextPage.addEventListener('click',()=>{
    goNextPage();
});

searchInputModal.addEventListener("input",(event)=>{
    updatePageValues();
})

addRecipeButton.addEventListener("click",(event)=>{
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
    let selectedList=document.querySelector(".selected");
    let id = selectedList.id;
    let title = selectedList.innerText;
    let image = selectedList.querySelector("img");
    let imageSRC=image.src;

    let recipe = {title:title,_id:id,image:imageSRC};
    fillCell(recipe);    
})


//Functions

//Function that reaquests a plan from the server based on a plan id
//then it fills up the calendar grid based on the received data
function  loadOnePlan(planId){
    myAxios.get(`/planner2/${planId}`)
        .then((plan)=>{
            let recipes = plan.data.recipes;
            createAddButtons();
            recipes.forEach(recipe => {
                let day = recipe.dayOfWeek.toLowerCase();
                let meal = recipe.mealName.toLowerCase();
                let recipeOfMeal = recipe.recipe;
                let cell = document.querySelector(`.${day}.${meal}`);
                cell.innerHTML=`<div class="miniRecipe" id="${recipeOfMeal._id}">
                                    <button id="${recipeOfMeal._id}" class="deleteMini">X</button>
                                    <img src="${recipeOfMeal.image}" alt="image">
                                    <div id="miniId">
                                        <h5>${recipeOfMeal.title}</h5>
                                    </div>
                                </div>`;
            });

            refreshDeleteButtons();
        })
        .catch((error)=>{console.log(error)});

}

//This function {using also the previous one} decides which plan is chosen in the dropdown box
//and loads it in
function loadSelectedPlan(){
    let selectedPlanId = selectPlan.selectedOptions[0].id;
    planTitle.innerText=selectPlan.selectedOptions[0].innerText;
    buttonSave.disabled=false;
    loadOnePlan(selectedPlanId);
}


//Draws all the "+" buttons in the calendae view + makes sure that the events added to them
//by calling refresh plus buttons funciton
function createAddButtons(){
    let cells = document.querySelectorAll(".cell.meal");
    cells.forEach((cell)=>{
    cell.innerHTML=`<button class="addButton">+</button>`
    });
    refresPlusButtons();
}


//Adds the event listeners to the small close-buttons on the mini recipe cards
function refreshDeleteButtons(){
    let buttons = document.querySelectorAll(".deleteMini");
    buttons.forEach((button)=>{
        button.addEventListener("click",()=>{
            
            let cell = button.closest(".cell");
            cell.innerHTML=`<button class="addButton">+</button>`;
            refresPlusButtons();
        })
    })
}

//Funtcion that makes a request to update a plan based on the plan selected in the dropdown box
//plus the content visible in grid
function savePlan(){
    let planToSend =createPlanContent();
    let selectedPlanId = selectPlan.selectedOptions[0].id;
    
    myAxios.patch("/plan/update", {data:{planID: selectedPlanId, plan:planToSend}})
        .then((resp)=>{
            refreshPlanList(selectedPlanId);
            //this following lines control the feedback texts shozing up after caryyingo out an acction
            message.style.opacity="0";
            message.innerText="Plan succesfully saved...";
            message.style.color="green"
            message.style.visibility="visible";
            message.style.opacity="1";
            setTimeout(()=>{
            message.style.opacity="0";
            },1000);
            setTimeout(()=>{
            message.style.visibility="hidden";
            },2000);

        })
        .catch((error)=>{console.log(error);
            message.style.opacity="0";
            message.innerText="ERROR: Plan not saved...";
            message.style.color="red"
            message.style.visibility="visible";
            message.style.opacity="1";
            setTimeout(()=>{
            message.style.opacity="0";
            },1000);
            setTimeout(()=>{
            message.style.visibility="hidden";
            },2000);
        });
}

//Funtcion that makes a request to create a new plan based on the content visible in grid
function createPlan(){
    let planToCreate=createPlanContent();
    myAxios.post("/plan/create", {data:{plan:planToCreate}})
        .then((resp)=>{
            let id=resp.data.toString();
            console.log(`id`, id);
            refreshPlanList(id);
            message.style.opacity="0";
            message.innerText="Plan succesfully created...";
            message.style.color="green"
            message.style.visibility="visible";
            message.style.opacity="1";
            setTimeout(()=>{
            message.style.opacity="0";
            },1000);
            setTimeout(()=>{
            message.style.visibility="hidden";
            },2000);
        })
        .catch((error)=>{console.log(error);
            message.style.opacity="0";
            message.innerText="ERROR: Plan could not be...";
            message.style.color="red"
            message.style.visibility="visible";
            message.style.opacity="1";
            setTimeout(()=>{
            message.style.opacity="0";
            },1000);
            setTimeout(()=>{
            message.style.visibility="hidden";
            },2000);
        });

}

//Funtcion to simply make a request to delete a plan
function deletePlan(){

    let selectedPlanId = selectPlan.selectedOptions[0].id;
    console.log(`selectedPlanId`, selectedPlanId)
    myAxios.patch("/plan/delete", {data:{planID: selectedPlanId}})
        .then((resp)=>{
            console.log(`i am here`);
            message.style.opacity="0";
            message.innerText="Plan succesfully DELETED...";
            message.style.color="green"
            message.style.visibility="visible";
            message.style.animation="fadeInOut 1.5s";
            refreshPlanList()
            setTimeout(()=>{
            message.style.visibility="hidden";
            },1000);
            setTimeout(()=>{
            message.style.visibility="hidden";
            },2000);

        })
        .catch((error)=>{console.log(error);
            message.style.opacity="0";
            message.innerText="ERROR: Plan cannot be deleted...";
            message.style.color="red"
            message.style.visibility="visible";
            message.style.opacity="1";
            setTimeout(()=>{
            message.style.opacity="0";
            },1000);
            setTimeout(()=>{
            message.style.visibility="hidden";
            },2000);
        
        });

}


//This function collects all the recipes found in the calendar and returns it in a format
//that can be used to create/update a plan on server side
function createPlanContent(){
    let meals = document.querySelectorAll(".cell:not(.day)");
    let plan ={
        title : planTitle.innerText,
        recipes:[]
    };
    meals.forEach((meal)=>{
        let recipeId = meal.firstElementChild.id;
        if (recipeId!==""){
            plan.recipes.push({
                dayOfWeek: meal.classList[3],
                mealName: meal.classList[2],
                recipe:recipeId,
            });
        }
        
    });
    return plan;
}

//Adding the event listener to the buttons which let you add a new recipe to the  day
function refresPlusButtons(){
    let plusButtons=document.querySelectorAll(".addButton");
    plusButtons.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            modal.classList.toggle("closed");
            modalOverlay.classList.toggle("closed");
            let cell = e.target.closest(".cell");
            cell.classList.toggle('focused');
            getRecipes();
        });
    })
}


//in the popup modal this function get all the recipes from the database and saves it in a local object
//based on the text provided in the search bar
function getRecipes(){
    let searchTitle = searchInputModal.value;
    if (searchTitle === '') {
      searchTitle = '[A-Za-z]';
    } 

    myAxios.get("/planner2/getrecipes",{ params: {search : searchTitle}})
        .then((dbRes)=>{
            recipes=dbRes.data;
            updatePageValues();
        })
        .catch((error)=>console.log(error))
}


//this function filles up the popup modal recipe list based on a provided filtered list
//it also makes sure that there is only one seleceted recipe at all the time
function refreshRecipeList(filteredList){
    recipeList.innerHTML="";
    filteredList.forEach((recipe)=>{
        recipeList.innerHTML+=`<li id="${recipe.id}">${recipe.title}<img class="tooltip" src="${recipe.image}" alt="image"></li>`
    })

    let listedVisible = recipeList.querySelectorAll("li");

    listedVisible.forEach((element)=>{
        element.addEventListener("click",(e)=>{
            let classList = Array.from(e.target.classList);
            
            if(classList.includes('selected')){
                e.target.classList.toggle("selected");
                numberOfSelected=0;
            }

            else{
                if (numberOfSelected<1){
                    e.target.classList.toggle("selected");
                    numberOfSelected=1;
                }
            }

             
            
        })
    })

};

//Function to filter the local recipe object that holds all the recipesa
function filterList(){
    let filteredList= recipes.filter((recipe)=>{return recipe.title.toLowerCase().includes(searchInputModal.value);
    });
    return filteredList;
}


//Functon that handles the pagination on the popup modal, go to next page
function goNextPage() {
    if (currentPage < allPage) {
      currentPage++;
      currentPageDisplay.innerText = currentPage;
      let selectedList = document.querySelector(".selected");
      console.log(`selectedList`, selectedList);
      if (selectedList!==null) {selectedList.classList.toggle("selected");
                                numberOfSelected=0;};
    }
    updatePageValues();
  }
  
//Functon that handles the pagination on the popup modal, go to previous page
function goPreviousPage() {
    if (currentPage > 0) {
      currentPage--;
      currentPageDisplay.innerText = currentPage;
      let selectedList = document.querySelector(".selected");
      if (selectedList!==null) {
          selectedList.classList.toggle("selected");
          numberOfSelected=0;};
    }
    updatePageValues();
  }

  //Function that updates the  recipe list in the popup model when page is changed
function updatePageValues(){
    let filteredList = filterList();
    let allRecipeNumber = filteredList.length;
    allPage = Math.ceil(allRecipeNumber / 15);
    currentPageDisplay.innerText = currentPage;
    allPageDisplay.innerText = allPage;
    let recipesOnPage= filteredList.slice((currentPage-1)*15,(currentPage*15-1));
    refreshRecipeList(recipesOnPage);
  };

  //Function that places the chosen recipe on a specific day of a calendar
function fillCell(recipeOfMeal){
    let cell = document.querySelector(".focused");
    cell.innerHTML=`<div class="miniRecipe" id="${recipeOfMeal._id}">
                            <button id="${recipeOfMeal._id}" class="deleteMini">X</button>
                            <img src="${recipeOfMeal.image}" alt="image">
                            <div id="miniId">
                            <h5>${recipeOfMeal.title}</h5>
                            </div>
                    </div>`;
    numberOfSelected=0;
    cell.classList.toggle("focused");
    refreshDeleteButtons()
};

//This function updates the list of plans in the dropdown box based on the database
//And preselects one based on an ID
function refreshPlanList(id){
    
    myAxios.get("/planner2/refresh")
        .then((dbRes)=>{
            
            let plans=dbRes.data;
            selectPlan.innerHTML="";
            plans.forEach((plan)=>{
                if (id===undefined || id ===null){
                    selectPlan.innerHTML+=`<option id="${plan._id}">${plan.title}</option>`;
                }

                else{
                    if(plan._id===id){
                        selectPlan.innerHTML+=`<option selected id="${plan._id}">${plan.title}</option>`;
                    }
                    else{
                        selectPlan.innerHTML+=`<option id="${plan._id}">${plan.title}</option>`;
                    }
                }
                
            })

            loadSelectedPlan();
        })
        .catch((error)=>console.log(error))
}

//On load of page
refresPlusButtons();