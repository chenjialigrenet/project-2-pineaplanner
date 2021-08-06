
//Elements get from the page for DOM

//Variables
let currentPage =   1;
let recipePerPage = 30;

//elements correlatinf to the page controls
const buttonNextPage =                document.getElementById('nextPageButton');
const buttonPrevPage =                document.getElementById('prevPageButton');
const buttonSearch =                  document.getElementById('searchButton');
const currentPageDisplay =            document.getElementById('currentPage');
const allPageDisplay =                document.getElementById('allPage');
const recipesContainer =              document.getElementById('recipes-recipe-wrapper');

//elements correlatinf to the tags
const inputVegan =                    document.getElementById('input_dishVegan');
const inputVegetarian =               document.getElementById('input_dishVegetarian');
const inputDairyFree =                document.getElementById('input_dishDairyFree');
const inputGlutenFree =               document.getElementById('input_dishGlutenFree');
const searchBar =                     document.getElementById('searchText');
const dishTypeBoxes =                 document.querySelectorAll('.checkboxDishType');
const tagsForm =                      document.getElementById('filterTags');
const tagsDishForm =                  document.getElementById('formDishType');

//elements correlatinf to the 'ädd to plan' modal
const addRecipeModalRecipeId =        document.getElementById('modal-recipe-id');
const closeModalButton =              document.getElementById('close-modal');
const modal =                         document.getElementById('modal');
const modalOverlay =                  document.getElementById('modal-overlay');
const showAddToPlannerModal =         document.getElementById('modal-addToPlanner');
const showAddToPlannerModalOverlay =  document.getElementById('modal-overlay-addToPlanner');
const closeAddToPlannerModalBtn =     document.getElementById('close-addToPlanner-modal');
const btnAddToPlannerModal =          document.getElementById('btn-add-modal');
const btnAddToPlanner =               document.getElementById('btn-add');

//elements correlatinf to the 'recipe card' modal
const modalImage =                    document.getElementById('modalImage');
const modalTagsWrapper =              document.getElementById('modalTagsWrapper');
const ingredientList =                document.getElementById('ingredientList');
const modalRecipeTitle =              document.getElementById('recipeTitle');
const modalSummarry =                 document.getElementById('modalSummarry');
const readyInMin =                    document.getElementById('readyInMin');
const servings =                      document.getElementById('servings');
const instructionsList =              document.getElementById('instructionsList');

//Event + ecenthandlesrs
addClicks();
closeModalButton.onclick = () => {
  modal.classList.toggle('closed');
  modalOverlay.classList.toggle('closed');
};

closeAddToPlannerModalBtn.onclick = () => {
  modal.classList.add('closed');
  modalOverlay.classList.add('closed');
  showAddToPlannerModal.classList.add('closed');
};

btnAddToPlannerModal.addEventListener('click', function () {
  modal.classList.toggle('closed');
  //modalOverlay.classList.toggle('closed');
  showAddToPlannerModal.classList.toggle('closed');
  //showAddToPlannerModalOverlay.classList.toggle('closed');
});

buttonNextPage.onclick = goNextPage;
buttonPrevPage.onclick = goPreviousPage;
buttonSearch.onclick = () => {
  currentPage = 1;
  handleChange();
};
tagsForm.onchange = handleChange;
tagsDishForm.onchange = handleChange;


//Needs to run when the script loads in
let allPage =                   allPageDisplay.innerText;
currentPageDisplay.innerText =  currentPage;


//Functions

//Function that shows the recipe card modal and loads it up with data recieved form the db
//based on a mrecipe ID
function showModal(id) {
  axios
    .get(`/recipes/page/${id}`)
    .then((dbRes) => {
      let recipe = dbRes.data;
      cleanModal();
      fillModal(recipe);
      //chenji added this addRecipeModelRecipeId
      addRecipeModalRecipeId.value = id;
      modal.classList.toggle('closed');
      modalOverlay.classList.toggle('closed');
    })
    .catch((error) => {
      console.log(error);
    });
}

//Just plecleaning the modal
function cleanModal() {
  modalTagsWrapper.innerHTML = '';
  ingredientList.innerHTML = '';
  instructionsList.innerHTML = '';
}

//The actual function the takes the recipe data and reformats it to fit the structue of the modal
//then is fills up the modal
function fillModal(recipe) {
  modalImage.src = recipe.image;

  let tagList = [];
  tagList.push({ name: 'cheap', value: recipe.cheap });
  tagList.push({ name: 'dairy-free', value: recipe.dairyFree });
  tagList.push({ name: 'gluten-free', value: recipe.glutenFree });
  tagList.push({ name: 'vegan', value: recipe.vegan });
  tagList.push({ name: 'vegetarian', value: recipe.vegetarian });
  tagList.push({ name: 'very-healthy', value: recipe.vegetarian });
  tagList.push({ name: 'very-popular', value: recipe.vegetarian });

  tagList.forEach((tag) => {
    if (tag.value === true) {
      modalTagsWrapper.innerHTML += `<span class="modalTag">${tag.name}</span>`;
    }
  });

  recipe.ingredients.forEach((ingredient) => {
    ingredientList.innerHTML += `
            <li>
                <span class="ingredName">${ingredient.name}</span>
                <span>: </span>
                <span class="ingredAmount">${ingredient.amount.toFixed(
                  2
                )}</span>
                <span> </span>
                <span class="ingredUnit">${ingredient.unit}</span>
            </li>`;
  });

  modalRecipeTitle.innerText = recipe.title;
  modalSummarry.innerHTML = recipe.summary;
  readyInMin.innerText = recipe.readyInMinutes;
  servings.innerText = recipe.servings;
  instructionsList.innerHTML = recipe.instructions;
}

//Add the ventlistened to all the recipe cards displayed so when we click on them we can
//acces the recipe modal
function addClicks() {
  let recipeCards = document.querySelectorAll('.recipe-cards');
  recipeCards.forEach((card) => {
    card.addEventListener('click', () => {

      showModal(card.id);
    });
  });
}

//Function that handles any change occuring on the filter tags form
//And makes a request to all the recipes that fit the filtering criteria
function handleChange() {

  let dishTypes = [];
  let glutenFree = false;
  let vegan = false;
  let vegetarian = false;
  let dairyFree = false;
  let searchText = searchBar.value;

  dishTypeBoxes.forEach((box) => {
    if (box.checked) {
      dishTypes.push(box.value);
    }
  });

  let searchTitle = '';
  if (searchText === '') {
    searchTitle = '[A-Za-z]';
  } else {
    searchTitle = searchBar.value;
  }

  if (
    inputGlutenFree.checked === true ||
    inputVegan.checked === true ||
    inputVegetarian.checked === true ||
    inputDairyFree.checked === true
  ) {
    glutenFree = inputGlutenFree.checked;
    vegan = inputVegan.checked;
    vegetarian = inputVegetarian.checked;
    dairyFree = inputDairyFree.checked;
  }

  axios
    .post(`/recipes/page/${currentPage}`, {
      page: currentPage,
      searchTitle: searchTitle,
      dishTypes: dishTypes,
      glutenFree: glutenFree,
      vegan: vegan,
      vegetarian: vegetarian,
      dairyFree: dairyFree,
    })
    .then((receivedList) => {
      let recipesToShow = receivedList.data;
      refreshDisplay(recipesToShow);
    })
    .catch((err) => {
      console.log(err);
    });
}


//Function to handle go to the next pages
function goNextPage() {
  if (currentPage < allPage) {
    currentPage++;
    currentPageDisplay.innerText = currentPage;
    handleChange();
  }
}

//Function to handle go to the previous pages
function goPreviousPage() {
  if (currentPage > 0) {
    currentPage--;
    currentPageDisplay.innerText = currentPage;
    handleChange();
  }
}

//Refreshes the grid  and fils it up with the given recipes
function refreshDisplay(recipeList) {
  let allRecipeNumber = recipeList.allPage;
  allPage = Math.ceil(allRecipeNumber / recipePerPage);
  currentPageDisplay.innerText = currentPage;
  allPageDisplay.innerText = allPage;
  recipesContainer.innerHTML = '';
  recipeList.recipes.forEach((recipe) => {

    recipesContainer.innerHTML += `<div class="recipe-cards" id="${recipe._id}">
                <img src="${recipe.image}" alt="image">
                <h5> ${recipe.title}</h5>
         </div>`;
  });

  addClicks();
}

