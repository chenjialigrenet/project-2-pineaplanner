
const buttonNextPage = document.getElementById("nextPageButton");
const buttonPrevPage = document.getElementById("prevPageButton");
const currentPageDisplay = document.getElementById("currentPage");
const allPageDisplay = document.getElementById("allPage");
const recipesContainer= document.getElementById("recipes-recipe-wrapper");

let currentPage = 1;
let allPage = allPageDisplay.innerText;
currentPageDisplay.innerText=currentPage;

buttonNextPage.onclick=goNextPage;
buttonPrevPage.onclick=goPreviousPage;




function handleChange(){

    axios
        .get(`/recipes/page/${currentPage}`)
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
    recipesContainer.innerHTML="";
    recipeList.forEach((recipe)=>{
    recipesContainer.innerHTML+=
                `<div class="recipe-cards">
                    <span>${recipe.title}</span>
                </div>`
            })
}