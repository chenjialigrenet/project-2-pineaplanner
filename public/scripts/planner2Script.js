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
                let day = recipe.dayOfWeek;
                let meal = recipe.mealName;
                let recipeOfMeal = recipe.recipe;

                

                
            });
            


        })
        .catch((error)=>{console.log(error)});

}