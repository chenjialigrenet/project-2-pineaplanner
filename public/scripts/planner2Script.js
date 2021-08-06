//Create axios instance here
const myAxios = axios.create({ withCredentials: true });

//Elements from document
//Control on top right corner
const buttonSave = document.getElementById("buttonSave")
const buttonCreate = document.getElementById("buttonCreate")
const buttonDelete = document.getElementById("buttonDelete")
const selectPlan = document.getElementById("selectPlan")
const meesage = document.getElementById("message");

//Title of the Plan
const planTitle = document.getElementById("planTitle")
const icon = document.getElementById("icon");
//Modal controls
const closeModalButton = document.getElementById("closeModalButton");
const addRecipeButton = document.getElementById("addRecipeButton");
const searchInputModal = document.getElementById("searchInputModal");
const recipeList = document.getElementById("recipeList");
//Modal
const modal = document.getElementById("modal-planner");
const modalOverlay = document.getElementById("modal-overlay-planner");
const buttonPrevPage = document.getElementById("prevPageButton");
const buttonNextPage = document.getElementById("nextPageButton");
const currentPageDisplay=document.getElementById("currentPage");
const allPageDisplay=document.getElementById("allPage");

//Events

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

//Modal
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

//variables
let recipes =[];
let currentPage=1;
let allPage=0;
let numberOfSelected=0;


//Functions
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

function loadSelectedPlan(){
    let selectedPlanId = selectPlan.selectedOptions[0].id;
    planTitle.innerText=selectPlan.selectedOptions[0].innerText;
    buttonSave.disabled=false;
    loadOnePlan(selectedPlanId);
}

function createAddButtons(){
    let cells = document.querySelectorAll(".cell.meal");
    cells.forEach((cell)=>{
    cell.innerHTML=`<button class="addButton">+</button>`
    });
    refresPlusButtons();
}

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

function savePlan(){
    let planToSend =createPlanContent();
    let selectedPlanId = selectPlan.selectedOptions[0].id;
    
    myAxios.patch("/plan/update", {data:{planID: selectedPlanId, plan:planToSend}})
        .then((resp)=>{
            refreshPlanList(selectedPlanId);
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

function filterList(){
    let filteredList= recipes.filter((recipe)=>{return recipe.title.toLowerCase().includes(searchInputModal.value);
    });
    return filteredList;
}

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

function updatePageValues(){
    let filteredList = filterList();
    let allRecipeNumber = filteredList.length;
    allPage = Math.ceil(allRecipeNumber / 15);
    currentPageDisplay.innerText = currentPage;
    allPageDisplay.innerText = allPage;
    let recipesOnPage= filteredList.slice((currentPage-1)*15,(currentPage*15-1));
    refreshRecipeList(recipesOnPage);
  };

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