
const buttonNextPage = document.getElementById("nextPageButton");
const buttonPrevPage = document.getElementById("prevPageButton");
const buttonSearch = document.getElementById("searchButton");
const currentPageDisplay = document.getElementById("currentPage");
const allPageDisplay = document.getElementById("allPage");
const recipesContainer= document.getElementById("recipes-recipe-wrapper");

const inputVegan=document.getElementById("input_dishVegan");
const inputVegetarian=document.getElementById("input_dishVegetarian");
const inputDairyFree=document.getElementById("input_dishDairyFree");
const inputGlutenFree=document.getElementById("input_dishGlutenFree");
const searchBar = document.getElementById("searchText");
const dishTypeBoxes= document.querySelectorAll(".checkboxDishType");
const tagsForm = document.getElementById("filterTags");


//modal
const closeModalButton = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const modalOverlay = document.getElementById("modal-overlay");
closeModalButton.onclick= ()=>{
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
}

const modalImage=           document.getElementById("modalImage");
const modalTagsWrapper=     document.getElementById("modalTagsWrapper");
const ingredientList=       document.getElementById("ingredientList");
const modalRecipeTitle=     document.getElementById("recipeTitle");
const modalSummarry=        document.getElementById("modalSummarry");
const readyInMin=           document.getElementById("readyInMin");
const servings=             document.getElementById("servings");
const instructionsList=     document.getElementById("instructionsList");


let currentPage = 1;
let allPage = allPageDisplay.innerText;
let recipePerPage = 30;
currentPageDisplay.innerText=currentPage;

buttonNextPage.onclick=goNextPage;
buttonPrevPage.onclick=goPreviousPage;
buttonSearch.onclick=()=>{
    currentPage=1;
    handleChange();};
tagsForm.onchange=handleChange;


//Section that runs when you load the pageCount
addClicks();



function showModal(id){
    axios.get(`/recipes/page/${id}`)
        .then((dbRes)=>{
            let recipe = dbRes.data;
            cleanModal();
            fillModal(recipe) ;  
            modal.classList.toggle("closed");
            modalOverlay.classList.toggle("closed");         
        })
        .catch((error)=>{console.log(error)});


}

function cleanModal(){
    modalTagsWrapper.innerHTML="";
    ingredientList.innerHTML="";
    instructionsList.innerHTML="";
};

function fillModal(recipe){
    modalImage.src=recipe.image;

    let tagList =[];
    tagList.push({name: "cheap",        value: recipe.cheap});
    tagList.push({name:"dairy-free",    value: recipe.dairyFree});
    tagList.push({name:"gluten-free",   value: recipe.glutenFree});
    tagList.push({name:"vegan",         value: recipe.vegan});
    tagList.push({name:"vegetarian",    value: recipe.vegetarian});
    tagList.push({name:"very-healthy",  value: recipe.vegetarian});
    tagList.push({name:"very-popular",  value: recipe.vegetarian});

    tagList.forEach((tag)=>{
        if (tag.value===true){
            modalTagsWrapper.innerHTML+=`<span class="modalTag">${tag.name}</span>`
        }
    });

    recipe.ingredients.forEach((ingredient)=>{
        ingredientList.innerHTML+=`
            <li>
                <span class="ingredName">${ingredient.name}</span>
                <span>: </span>
                <span class="ingredAmount">${ingredient.amount.toFixed(2)}</span>
                <span> </span>
                <span class="ingredUnit">${ingredient.unit}</span>
            </li>`;
    })

    modalRecipeTitle.innerText=recipe.title;
    modalSummarry.innerHTML=recipe.summary;
    readyInMin.innerText=recipe.readyInMinutes;
    servings.innerText=recipe.servings;
    instructionsList.innerHTML=recipe.instructions;

}

function addClicks(){
    let recipeCards = document.querySelectorAll(".recipe-cards");

    recipeCards.forEach((card)=>{
        card.addEventListener("click",()=>{
            showModal(card.id);
        })
    })
}



function handleChange(){

    let dishTypes=[];
    let glutenFree=false;
    let vegan=false;
    let vegetarian=false;
    let dairyFree=false;
    let searchText=searchBar.value;

    dishTypeBoxes.forEach((box)=>{
        if(box.checked){
            dishTypes.push(box.value);
        }
    })

    let searchTitle="";
    if(searchText===""){
        searchTitle = "[A-Za-z]";
    }

    else {
        searchTitle=searchBar.value;
    }
    

    if (inputGlutenFree.checked===true||
        inputVegan.checked===true||
        inputVegetarian.checked===true||
        inputDairyFree.checked===true){
            glutenFree=inputGlutenFree.checked;
            vegan=inputVegan.checked;
            vegetarian=inputVegetarian.checked;
            dairyFree=inputDairyFree.checked;
        }

    

    axios
        .post(`/recipes/page/${currentPage}`,{
            page:currentPage,
            searchTitle:searchTitle,
            dishTypes:dishTypes,
            glutenFree:glutenFree,
            vegan:vegan,
            vegetarian:vegetarian,
            dairyFree:dairyFree,
        })
        .then((receivedList)=>{
            let recipesToShow = receivedList.data;
            refreshDisplay(recipesToShow);
        })
        .catch((err) => {
            console.log(err);
          });

};

function goNextPage(){
    if(currentPage<allPage){
    currentPage++;
    currentPageDisplay.innerText=currentPage;
    handleChange();
    }
    
};

function goPreviousPage(){
    if(currentPage>0){
        currentPage--;
        currentPageDisplay.innerText=currentPage;
        handleChange();
    }
    
};

function refreshDisplay(recipeList){
    let allRecipeNumber = recipeList.allPage;
    allPage = Math.ceil(allRecipeNumber/recipePerPage);
    currentPageDisplay.innerText=currentPage;
    allPageDisplay.innerText=allPage;
    recipesContainer.innerHTML="";
    recipeList.recipes.forEach((recipe)=>{
        console.log(recipe);
    recipesContainer.innerHTML+=
        `<div class="recipe-cards" id="${recipe._id}">
                <img src="${recipe.image}" alt="image">
                <h5> ${recipe.title}</h5>
         </div>`
            })

    addClicks();
}