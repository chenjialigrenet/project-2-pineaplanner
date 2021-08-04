//Create axios instance here
const myAxios = axios.create({ withCredentials: true });

//Elements from document
//Control on top right corner
const buttonSave = document.getElementById("buttonSave")
const buttonCreate = document.getElementById("buttonCreate")
const selectPlan = document.getElementById("selectPlan")

//Title of the Plan
const planTitle = document.getElementById("planTitle")


//Events
selectPlan.addEventListener('change', (event) => {
    let selectedPlanId = selectPlan.selectedOptions[0].id;
    planTitle.innerText=selectPlan.selectedOptions[0].innerText;
    loadOnePlan(selectedPlanId);
});

buttonSave.addEventListener('click',()=>{
    savePlan();
});

buttonCreate.addEventListener('click',()=>{
    createPlan();
});


//Functions
function  loadOnePlan(planId){
    myAxios.get(`/planner2/${planId}`)
        .then((plan)=>{
            let recipes = plan.data.recipes;
            
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

function refreshDeleteButtons(){
    let buttons = document.querySelectorAll(".deleteMini");
    buttons.forEach((button)=>{
        button.addEventListener("click",()=>{
            console.log("i am here");
            let cell = button.closest(".cell");
            cell.innerHTML=`<button class="addButton">+</button>`;
        })
    })
}

function savePlan(){
    let planToSend =createPlanContent();
    let selectedPlanId = selectPlan.selectedOptions[0].id;
    
    myAxios.patch("/plan/update", {data:{planID: selectedPlanId, plan:planToSend}})
        .then()
        .catch((error)=>console.log(error));
}

function createPlan(){
    let planToCreate=createPlanContent();
    myAxios.post("/plan/create", {data:{plan:planToCreate}})
        .then()
        .catch((error)=>console.log(error));

}


function createPlanContent(){
    let meals = document.querySelectorAll(".cell:not(.day)");
    let plan ={
        title : planTitle.innerText,
        recipes:[]
    };
    meals.forEach((meal)=>{
        let recipeId = meal.firstElementChild.id;
        plan.recipes.push({
            dayOfWeek: meal.classList[2],
            mealName: meal.classList[1],
            recipe:recipeId,
        });
    });

    return plan;
}