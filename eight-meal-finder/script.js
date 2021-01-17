const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_meal = document.getElementById('single-meal');



//Search Meal and fetch from API
function searchMeal(e){
    e.preventDefault();

    //Clear Singel Meal
    single_meal.innerHTML = '';

    //Get Search Term
    const term = search.value;
    

    //Check for Empty
    if(term.trim()){

        let b = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
    
        fetch(b)
        .then(res => res.json()).then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search results for '${term}': </h2>`;

            if(data.meals === null){
                resultHeading.innerHTML = `<p>There are no search results for '${term}'`;
            }else {
                mealsEl.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class ="meal-info" data-mealID = "${meal.idMeal}">
                        <h3> ${meal.strMeal}</h3>
                    </div>
                </div>`).join('');
            }
        })
        search.value = "";

    }else{
        alert("Please enter a search term");
    }

}
//Event Listener
submit.addEventListener('submit',searchMeal)
random.addEventListener('click',getRandomMeal)

function getRandomMeal(){
    //Clear meals and headings
    mealsEl.innerHTML = "";
    resultHeading.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDom(meal);
    })

}

//1. The entire Meals Element is set to listen for a click
//2. We grab the path/composed path depending on browser. When you set
//a variable = a||b||c is will grab the first non-undefined  going right
//3. MealInfo is set as an operation on the event.path which is an array of objects
//This operation will find the first item that full fillls the condtion
//4. The first true or rather the first item or object in the event path will
//return true and that's the div that gets stored to Meal Info


mealsEl.addEventListener('click', e =>{
    const path = e.path || (e.composedPath());
    const mealInfo = path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info');
        }else{
            return false;
        }

    })

    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid');
        console.log(mealID);
        getMealById(mealID)
    }

    
});

//Fetch meal by ID
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res=> res.json())
    .then(data => {
        const meal = data.meals[0];
        console.log(meal);

        addMealToDom(meal);
    })
}

function addMealToDom(meal){
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]){

            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);

        }else{break;}
        
    }

    console.log(ingredients);
    single_meal.innerHTML = `<div class = "single-meal">
    
        <h1 id="selected-meal"> ${meal.strMeal}</h1>
        <img src = "${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class = "single-meal-info">
            ${meal.strCategory ? `<p> ${meal.strCategory}</p>` : ""}
            ${meal.strArea ? `<p> ${meal.strArea}</p>` : ""}
        </div>

        <div class = "main"> 
            <p> ${meal.strInstructions}</p>
            <h2> Ingredients </h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
        </div>
    </div>`;

    var elmnt = document.getElementById("selected-meal");
    elmnt.scrollIntoView();
}