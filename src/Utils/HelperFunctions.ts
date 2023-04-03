import { baseUrl } from "./Constants";
import {
  User,
  Comment,
  Recipe,
  FavoriteRecipe,
  RegisterRequest,
  NewRecipe,
  NewComment,
  NewLikedRecipe,
  UserUpdateRequest,
  LoginResponse,
  NewFollower,
  Filter,
} from "./Types";

// SIGNUP AND LOGOUT
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
      `${baseUrl}/Users/Authentication/register`,
      requestOptions
    );
    return response.ok;
  } catch (e: any) {
    throw new Error("Problems");
  }
};

// GET METHODS
export const fetchUser = async (
  id: string | undefined,
  token: string
): Promise<User> => {
  let res = await fetch(`${baseUrl}/Users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const fetchAllUsers = async (
  token: string,
  userId?: number | undefined,
  searchTerm?: string | undefined
): Promise<User[]> => {
  let res = await fetch(
    `${baseUrl}/Users${searchTerm == undefined ? "" : `?q=${searchTerm}`}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
};

export const fetchFollowingUsers = async (
  token: string,
  userId?: number | undefined,
  searchTerm?: string | undefined
): Promise<User[]> => {
  let res = await fetch(`${baseUrl}/Users/${userId}/Followers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const fetchFollowedUsers = async (
  token: string,
  userId?: number | undefined,
  searchTerm?: string | undefined
): Promise<User[]> => {
  let res = await fetch(`${baseUrl}/Users/${userId}/Following`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const fetchComments = async (token: string): Promise<Comment[]> => {
  let res = await fetch(`${baseUrl}/Users/comments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const fetchUserOwnedRecipes = async (
  token: string,
  id: number
): Promise<Recipe[]> => {
  let res = await fetch(`${baseUrl}/Users/${id}/Recipes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const fetchUserFavoriteRecipes = async (
  token: string,
  id: number
): Promise<FavoriteRecipe[]> => {
  let res = await fetch(`${baseUrl}/Users/${id}/FavoriteRecipes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const fetchFollowingFavoriteRecipes = async (
  token: string,
  id: number
): Promise<FavoriteRecipe[]> => {
  let res = await fetch(`${baseUrl}/FavoriteRecipes/Followers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

// POST METHODS
export const addNewRecipeFromForm = async (
  token: string,
  newRecipe: NewRecipe
) => {
  try {
    let formData = new FormData();

    formData.append("Title", newRecipe.Title);
    newRecipe.Instructions.forEach(instruction =>
      formData.append("Instructions", instruction)
    );
    newRecipe.Ingredients.forEach(ingredient =>
      formData.append("Ingredients", ingredient)
    );

    newRecipe.CuisineType?.forEach(cuisineType =>
      formData.append("CuisineType", cuisineType)
    );
    newRecipe.DietLabels?.forEach(dietLabels =>
      formData.append("DietLabels", dietLabels)
    );
    newRecipe.DishType?.forEach(dishType =>
      formData.append("DishType", dishType)
    );
    newRecipe.HealthLabels?.forEach(healthLabels =>
      formData.append("HealthLabels", healthLabels)
    );
    newRecipe.MealType?.forEach(mealType =>
      formData.append("MealType", mealType)
    );

    if (newRecipe.Yield != undefined && newRecipe.Yield != "") {
      formData.append("Yield", newRecipe.Yield);
    }
    if (newRecipe.Calories != undefined && newRecipe.Calories != "") {
      formData.append("Calories", newRecipe.Calories);
    }
    if (newRecipe.TotalTime != undefined && newRecipe.TotalTime != "") {
      formData.append("TotalTime", newRecipe.TotalTime);
    }
    if (newRecipe.RecipePicture != undefined) {
      formData.append("RecipePicture", newRecipe.RecipePicture);
    }

    const requestOptions = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    };
    const response = await fetch(`${baseUrl}/Recipes/New`, requestOptions);
    return response.ok;
  } catch (e: any) {
    throw new Error("Problems");
  }
};

export const addNewRecipeEdamam = async (
  token: string,
  newRecipe: Recipe
): Promise<Recipe> => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    };
    const response = await fetch(`${baseUrl}/Recipes`, requestOptions);
    return response.json();
  } catch (e: any) {
    throw new Error("Problems");
  }
};

export const addNewComment = async (
  token: string,
  newComment: NewComment
): Promise<Comment> => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    };
    const response = await fetch(`${baseUrl}/Comments`, requestOptions);
    return response.json();
  } catch (e: any) {
    throw new Error("Problems");
  }
};

export const addLikeToRecipe = async (
  token: string,
  newLikedRecipe: NewLikedRecipe
) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLikedRecipe),
    };
    const response = await fetch(`${baseUrl}/Likes`, requestOptions);
    return response.ok;
  } catch (e: any) {
    throw new Error("Problems");
  }
};

export const addNewFollower = async (
  token: string,
  newFollower: NewFollower
) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFollower),
    };
    const response = await fetch(`${baseUrl}/Followers`, requestOptions);
    return response.ok;
  } catch (e: any) {
    throw new Error("Problems");
  }
};

// DELETE METHODS
export const deleteComment = async (token: string, commentId: number) => {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      `${baseUrl}/Comments/${commentId}`,
      requestOptions
    );
    return response.ok;
  } catch (e: any) {
    throw new Error("Problems");
  }
};

export const deleteFavorite = async (token: string, recipeId: number) => {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      `${baseUrl}/FavoriteRecipes/${recipeId}`,
      requestOptions
    );
    return response.ok;
  } catch (e: any) {
    throw new Error("Problems");
  }
};

export const deleteOwnedRecipe = async (token: string, recipeId: number) => {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      `${baseUrl}/Recipes/Owned/${recipeId}`,
      requestOptions
    );
    return response.ok;
  } catch (e: any) {
    throw new Error("Problems");
  }
};

export const deleteFollower = async (token: string, followedUserId: number) => {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      `${baseUrl}/Followers/${followedUserId}`,
      requestOptions
    );
    return response.ok;
  } catch (e: any) {
    throw new Error("Problems");
  }
};

export const deleteLike = async (token: string, recipeId: number) => {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      `${baseUrl}/Likes/${recipeId}`,
      requestOptions
    );
    return response.ok;
  } catch (e: any) {
    throw new Error("Problems");
  }
};

// PUT METHODS
export const updateUser = async (
  token: string,
  userId: number,
  userUpdate: UserUpdateRequest
) => {
  try {
    let formData = new FormData();

    if (userUpdate.name != undefined) {
      formData.append("Name", userUpdate.name);
    }

    userUpdate.dietLabels?.length
      ? userUpdate.dietLabels?.forEach(dietLabels =>
          formData.append("DietLabels", dietLabels)
        )
      : formData.append("DietLabels", "");

    userUpdate.healthLabels?.length
      ? userUpdate.healthLabels?.forEach(healthLabels =>
          formData.append("HealthLabels", healthLabels)
        )
      : formData.append("HealthLabels", "");

    if (userUpdate.profileSettings != undefined) {
      userUpdate?.profileSettings.forEach(profileSetting =>
        formData.append("ProfileSettings", profileSetting)
      );
    }
    if (userUpdate.profilePicture != undefined) {
      formData.append("ProfilePicture", userUpdate.profilePicture);
    }

    const requestOptions = {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    };
    const response = await fetch(
      `${baseUrl}/Users/${userId}/Update`,
      requestOptions
    );
    return response;
  } catch (e: any) {
    throw new Error("Problems");
  }
};

// Extra helpers

export function isValidFileUploaded(file: File): boolean {
  const validExtensions = ["png", "jpeg", "jpg"];
  const fileExtension = file.type.split("/")[1];
  return validExtensions.includes(fileExtension);
}

export function convertFilterToString(filter: Filter): string {
  let query = "";
  if (filter.query) {
    query += `&SearchTerm=${filter.query.toLowerCase()}`;
  }

  filter.cuisineType?.forEach(
    cuisineType => (query += `&cuisineType=${cuisineType.toLowerCase()}`)
  );
  filter.dietLabels?.forEach(
    dietLabel => (query += `&dietLabel=${dietLabel.toLowerCase()}`)
  );
  filter.healthLabels?.forEach(
    healthLabel => (query += `&healthLabel=${healthLabel.toLowerCase()}`)
  );
  filter.mealType?.forEach(
    mealType => (query += `&mealType=${mealType.toLowerCase()}`)
  );
  filter.dishType?.forEach(
    dishType => (query += `&dishType=${dishType.toLowerCase()}`)
  );
  return query;
}
