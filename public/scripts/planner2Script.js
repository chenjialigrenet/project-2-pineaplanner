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
    loadOnePlan(selectedPlanId);
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
                cell.innerHTML=`<div class="miniRecipe">
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
    let buttons = document.querySelectorAll("deleteMini");
    buttons.forEach((button)=>{
        button.addEventListener("click",)
    })
}