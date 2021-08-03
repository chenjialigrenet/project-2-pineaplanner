const searchInput = document.getElementById('recipe-search');
const noResults = document.getElementById('recipe-no-results');

function search() {
  let shownRecipes = 0;
  const currentSearchTerms = (searchInput.value || '').toLowerCase().split(' ');
  document.querySelectorAll('.recipe-selection').forEach((element) => {
    let recipeTitle = element.getAttribute('data-title').toLocaleLowerCase();
    let anyMatches = currentSearchTerms.some(
      (query) => recipeTitle.indexOf(query) !== -1
    );
    if (shownRecipes < 15 && anyMatches) {
      element.classList.toggle('hidden', false);
      shownRecipes += 1;
    } else {
      element.classList.toggle('hidden', true);
    }
  });

  noResults.classList.toggle('hidden', shownRecipes !== 0);
}

searchInput.addEventListener('input', search);
search();
