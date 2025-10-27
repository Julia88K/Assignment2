
// Print the first 5 names of the meals in alphabetical order
// (print name only not the whole object)

// Här skapas en funktion fetchMeal
function fetchMeals() {
  const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=s";
// hämtar API:s URL som ett fetch-request
  fetch(URL)
    // Svaret konverteras från JSON till ett JavaScript-objekt,
    // sen kan den användas i Javascript
    .then(res => res.json())
    .then(data => {
      // Om data.meals finns, ska den användas under variabeln "const meals",
      // annars en tom lista
      const meals = data.meals || [];

      //här byggs en lista "mealList" med alla måltiders namn
      const mealList = [];
      for (let i = 0; i < meals.length; i++) {
        mealList.push(meals[i].strMeal);
      }

      // här sorteras alla måltider alfabetiskt och tas de 5 första
      const alphaMeal = mealList
        // sorterar alphabetiskt
        .sort((a, b) => a.localeCompare(b))
        // tar bara de första 5
        .slice(0, 5);
      // loggar till consolen
      console.log("De 5 första alfabetiskt sorterade:", alphaMeal);
    })
    //ifall det skulle gå fel med fetch-request, fångar den här raden upp det
    .catch(err => console.error("Fel:", err));
}
// anropar funktionen så att den körs
fetchMeals();




// Print all meals that contain a given category (print name and category)

// Här skapas en async funktion fetchSideMeals
// "async" betyder att funktionen kan pausa och vänta på ett resultat (t.ex. från fetch)
// utan att blockera resten av programmet.
async function fetchSideMeals() {
  // Här definieras API:ets URL som ska användas i fetch-request.
  const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  // Hämtar data från API:et och väntar på svaret från API-request
  const res = await fetch(URL);
  // Svaret konverteras från JSON till ett JavaScript-objekt,
  // sen kan den användas i Javascript.
  const data = await res.json();

  // Här filtreras ut måltider i kategorin "Side",
  // sorteras alfabetiskt och sen skapas enklare objekt som har namn och kategori som
  // keys
  const sideMeals = data.meals
    .filter(meal => (meal.strCategory || "").toLowerCase() === "side")
    .sort((a, b) => a.strMeal.localeCompare(b.strMeal))
    .map(meal => ({
      name: meal.strMeal,
      category: meal.strCategory
    }));
  // loogar resultatet i konsolen
  console.log(sideMeals);
  // returnerar listan med filtrerade måltider
  return sideMeals;
}
// anropar funktionen så att den körs
fetchSideMeals();




// Create a Javascript object that contains how many times a meals of a each category appears

// Här skapas en async funktion getCounterMeals
// "async" betyder att funktionen kan pausa och vänta på ett resultat (t.ex. från fetch)
// utan att blockera resten av programmet.
async function getCounterMeals() {
  // Här definieras API:ets URL som ska användas i fetch-request.
  const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=sp";
  // Hämtar data från API:et och väntar på svaret från API-request
  const res = await fetch(URL);
  // Svaret konverteras från JSON till ett JavaScript-objekt,
  // sen kan den användas i Javascript
  const data = await res.json();
  const meals = data.meals

  // // Går igenom alla måltider (meals) och räknar hur många det finns i varje kategori.
  const categoryCount = meals.reduce((acc, meal) => {
    // Hämtar kategorin för varje måltid.
    // Om ingen kategori finns, används "Unknown" som standard.
    const category = meal.strCategory || "Unknown";

    // Om kategorin redan finns i objektet, ökar man räkningen med 1
    if (acc[category]) {
      acc[category]++;
    }
    else {
      // Annars skapas det en ny kategori med startvärde 1
      acc[category] = 1;
    }
    // returnerar accumulatorn
    return acc;
  }, {});
  // loggar objektet med kategorierna och antal måltider till konsolen
  console.log(categoryCount);
  // returnerar objektet
  return categoryCount
}
// anropar funktionen så att den körs
getCounterMeals()




//Group by a key

// "async" betyder att funktionen kan pausa och vänta på ett resultat (t.ex. från fetch)
// utan att blockera resten av programmet.
async function groupBy(key) {
  // Här definieras API:ets URL som ska användas i fetch-request.
  const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=sp"
  // Hämtar data från API:et och väntar på svaret från API-request
  const res = await fetch(URL);
  // Svaret konverteras från JSON till ett JavaScript-objekt,
  // sen kan den användas i Javascript
  const data = await res.json();
  // Här hämtas själva listan med måltider från API-svaret.
  const meals = data.meals
  // Här används reduce() för att gruppera alla måltider efter den nyckel (key)
  // som är argument i funktionen
  const grouped = meals.reduce((acc, meal) => {
    // Här hämtas värdet för den aktuella nyckeln
    const groupKey = meal[key];
    // // Om gruppen inte finns ännu, skapas det en tom lista.
    if (!acc[groupKey]) acc[groupKey] = [];
    // sen läggs alla måltider till rätt grupp
    acc[groupKey].push(meal);
    // här returneras accumulatorn så att objektet bygs på för varje maltid.
    return acc;
  }, {});
  // loggar resultatet i konsolen
  console.log(`Grouped by ${key}:`, grouped);
  // returnerar det omgrupperade objektet
  return grouped;
}

// anropar funktionen med argument "strArea"
groupBy("strArea");





// Select & reshape

// Async funktion - se ovan
async function reshapedMeals() {
  const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=sp"
  const res = await fetch(URL);
  const data = await res.json();
  const meals = data.meals
  // Här skapas en ny array där varje objekt har ett enklare format
  const reshaped = meals.map(meal => ({
    // Här väljs ut några nyckel-värde-par från varje "meal"-objekt
    mealId: meal.idMeal,
    mealName: meal.strMeal,
    mealCategory: meal.strCategory,
    // Här samlas ihop de tre första ingredienserna i en lista
    ingredient: [meal.strIngredient1, meal.strIngredient2, meal.strIngredient3]
  }));
  // loggar det skapade objektet till konsolen
  console.log(reshaped)
  // returnera det skapade objektet
  return reshaped
}

// anropar funktionen
reshapedMeals();
