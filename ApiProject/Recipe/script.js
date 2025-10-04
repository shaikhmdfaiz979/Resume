const recipeContainer = document.getElementById("recipeContainer");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("search");
const modalBody = document.querySelector(".modal-body");

// model show
var myModal = new bootstrap.Modal(document.getElementById("myModal"));
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = searchInput.value.trim();
  fetchRecipes(query);

  //   myModal.show();
});
// Function to display recipes in the container
function displayRecipes(recipes) {
  recipeContainer.innerHTML = ""; // Clear previous results
  if (!recipes) {
    recipeContainer.innerHTML = `<p class="text-warning">No recipes found. Please try a different search.</p>`;
  } else {
    recipes.forEach((recipe) => {
      const img = recipe.strMealThumb;
      const title = recipe.strMeal;
      const category = recipe.strCategory || "Not available";
      const area = recipe.strArea || "Not available";
      const instructions = recipe.strInstructions || "Not available";
      const recipeCard = document.createElement("div");
      recipeCard.className = "col-md-4 mb-4 col-sm-6 col-lg-3 ";
      recipeCard.innerHTML = `
        <div class="card h-100">
          <img src="${img}" class="card-img-top" alt="${recipe.strMeal}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5> 
            <p class="card-text"><strong>Category</strong>: ${category}</p>
            <p class="card-text"><strong>Area</strong>: ${area}</p>
            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#myModal">View Details</button>
    </div> `;
      // Add event listener to the button to show modal with details
      const button = recipeCard.querySelector("button");
      button.addEventListener("click", () => {
        modalBody.innerHTML = `
          <h2 class="text-center my-4">${title}</h2>
          <img src="${img}" class="img-fluid mb-3" alt="${title}">
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Area:</strong> ${area}</p>
          <p><strong>Instructions:</strong> ${instructions}</p>
          `;
      });
      recipeContainer.appendChild(recipeCard);
    });
  }
}

// Function to fetch recipes from the API
async function fetchRecipes(query) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    // console.log(data);
    displayRecipes(data.meals); // Pass the meals array to the display function
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeContainer.innerHTML = `<p class="text-danger">Failed to load recipes. Please try again later.</p>`;
  }
}
