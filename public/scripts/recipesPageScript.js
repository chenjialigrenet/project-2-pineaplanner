
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

function handleChange(){

    axios
        .get(`/recipes/page/${currentPage}`)
        .then((receivedList)=>{
            let recipesToShow = receivedList.data;

            recipesContainer.innerHTML="";
            recipesToShow.forEach((recipe)=>{
                recipesContainer.innerHTML+=
                `<div class="recipe-cards">
                    <span>${recipe.title}</span>
                </div>`
            })

        })
        .catch((err) => {
            console.log(err);
          });

};