import { baseUrl } from "./Constants";
import { User, Comment, Recipe, FavoriteRecipe, RegisterRequest, LoginRequest, NewRecipe } from "./Types";

export const signUpUser = async (signupRequest: RegisterRequest) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...signupRequest,
        }),
      };

      const response = await fetch(
        `${baseUrl}/UsersAuthentication/register`,
        requestOptions
      );
      return response.ok;
    } catch (e: any) {
      throw new Error("Problems");
    }
};

export const fetchUser = async (id: number, token: string) : Promise<User> => {
    let res = await fetch(`${baseUrl}/Users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.json();
};

export const fetchComments = async (token: string) : Promise<Comment[]> => {
    let res = await fetch(`${baseUrl}/Users/comments`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    return res.json();
};

export const fetchUserOwnedRecipes = async (token: string) : Promise<Recipe[]> => {
    let res = await fetch(`${baseUrl}/Users/recipes`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    return res.json();
};

export const fetchUserFavoriteRecipes = async (token: string) : Promise<FavoriteRecipe> => {
    let res = await fetch(`${baseUrl}/FavoriteRecipes`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    return res.json();
};


export const addNewRecipeFromForm = async (token: string, newRecipe: NewRecipe) => {
    try {
      let formData = new FormData();
      
      formData.append("Title", newRecipe.Title);
      newRecipe.Instructions.forEach(instruction => formData.append("Instructions", instruction))
      newRecipe.Ingredients.forEach(ingredient => formData.append("Ingredients", ingredient))
      
      newRecipe.CuisineType?.forEach(cuisineType => formData.append("CuisineType", cuisineType))
      newRecipe.DietLabels?.forEach(dietLabels => formData.append("DietLabels", dietLabels))
      newRecipe.DishType?.forEach(dishType => formData.append("DishType", dishType))
      newRecipe.HealthLabels?.forEach(healthLabels => formData.append("HealthLabels", healthLabels))
      newRecipe.MealType?.forEach(mealType => formData.append("MealType", mealType))

      if (newRecipe.Yield != undefined) {
        formData.append("Yield", newRecipe.Yield);
      }
      if (newRecipe.Calories != undefined) {
        formData.append("Calories", newRecipe.Calories);
      }
      if (newRecipe.TotalTime != undefined) {
        formData.append("TotalTime", newRecipe.TotalTime);
      }
      if (newRecipe.RecipePicture != undefined) {
        formData.append("RecipePicture", newRecipe.RecipePicture);
      }

      const requestOptions = {
        method: "POST",
        headers: {Authorization: `Bearer ${token}`},
        body: formData,
      };
      const response = await fetch(
        `${baseUrl}/Recipes/New`,
        requestOptions
      );
      return response.ok;
    } catch (e: any) {
      throw new Error("Problems");
    }
  }

export const addNewRecipeEdamam = async (token: string, newRecipe: Recipe) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    };
    const response = await fetch(
      `${baseUrl}/Recipes`,
      requestOptions
    );
    return response.ok;
  } catch (e: any) {
    throw new Error("Problems");
  }
}
