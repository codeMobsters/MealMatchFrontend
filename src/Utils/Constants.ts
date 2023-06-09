import { Filter, NewRecipe } from "./Types";

export const Preferences = {
  Cuisines: [
    "american",
    "asian",
    "british",
    "caribbean",
    "central europe",
    "chinese",
    "eastern europe",
    "french",
    "greek",
    "indian",
    "italian",
    "japanese",
    "korean",
    "kosher",
    "mediterranean",
    "mexican",
    "middle eastern",
    "nordic",
    "south american",
    "south east asian",
    "world",
  ],
  DishTypes: [
    "alcohol cocktail",
    "biscuits and cookies",
    "bread",
    "cereals",
    "condiments and sauces",
    "desserts",
    "drinks",
    "egg",
    "ice cream and custard",
    "main course",
    "pancake",
    "pasta",
    "pastry",
    "pies and tarts",
    "pizza",
    "preps",
    "preserve",
    "salad",
    "sandwiches",
    "seafood",
    "side dish",
    "soup",
    "special occasions",
    "starter",
    "sweets",
  ],
  MealTypes: ["breakfast", "brunch", "lunch", "dinner", "snack", "teatime"],
  DietLabels: [
    "balanced",
    "high-fiber",
    "high-protein",
    "low-carb",
    "low-fat",
    "low-sodium",
  ],
  HealthLabels: [
    "alcohol-cocktail",
    "alcohol-free",
    "celery-free",
    "crustacean-free",
    "dairy-free",
    "DASH",
    "egg-free",
    "fish-free",
    "fodmap-free",
    "gluten-free",
    "immuno-supportive",
    "keto-friendly",
    "kidney-friendly",
    "kosher",
    "low-potassium",
    "low-sugar",
    "lupine-free",
    "Mediterranean",
    "mollusk-free",
    "mustard-free",
    "No-oil-added",
    "paleo",
    "peanut-free",
    "pecatarian",
    "pork-free",
    "red-meat-free",
    "sesame-free",
    "shellfish-free",
    "soy-free",
    "sugar-conscious",
    "sulfite-free",
    "tree-nut-free",
    "vegan",
    "vegetarian",
    "wheat-free",
  ],
};

export const newReipe: NewRecipe = {
  Title: "",
  Yield: "",
  Calories: "",
  TotalTime: "",
  Instructions: [],
  Ingredients: [],
  CuisineType: [],
  DietLabels: [],
  DishType: [],
  HealthLabels: [],
  MealType: [],
  RecipePicture: undefined,
};

export const filter: Filter = {
  query: "",
  cuisineType: [],
  dietLabels: [],
  dishType: [],
  healthLabels: [],
  mealType: [],
};

// export const baseUrl = "https://localhost:7031";
export const baseUrl = "https://mealmatchapi.azurewebsites.net";

export const QRcodeUrl =
  "https://mobster1theblob.blob.core.windows.net/images/mealMatchQRnew.JPG";
export const profilePicMobster1 =
  "https://mobster1theblob.blob.core.windows.net/images/rodrigo.jpeg";
export const profilePicMobster2 =
  "https://mobster1theblob.blob.core.windows.net/images/lajos.png";
export const userIdMobster1 = "2";
export const userIdMobster2 = "11";
export const userIdMobster1LinkedIn =
  "https://www.linkedin.com/in/rodrigo-moncorvo-408a52157";
export const userIdMobster2LinkedIn =
  "https://www.linkedin.com/in/lajos-horvath-developer";
export const userIdMobster1Github = "https://www.github.com/romoncorvo";
export const userIdMobster2Github = "https://www.github.com/HorvathLajos";
export const linkedInIconBlobUrl =
  "https://mobster1theblob.blob.core.windows.net/images/linkedin.png";
export const githubIconBlobUrl =
  "https://mobster1theblob.blob.core.windows.net/images/github.png";
