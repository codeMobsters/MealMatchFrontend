import { Dispatch, SetStateAction } from "react";

export type SetValue<T> = Dispatch<SetStateAction<T>>;

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  name: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  token: string;
}
export interface NavbarProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

export interface EdamamResponse {
  url: string;
  recipes: Recipe[];
}

export interface FavoriteRecipe {
  favoriteRecipeId: number;
  recipe: Recipe;
  favoriteRecipeOwnerId: number;
  favoriteRecipeOwnerName: string;
}

export interface Recipe {
  recipeId?: number;
  label: string;
  like?: number;
  yield?: number;
  calories?: number;
  totalTime?: number;
  createdAt?: string;
  instructions?: string[];
  ingredientLines: string[];
  cuisineType?: string[];
  dietLabels?: string[];
  dishType?: string[];
  healthLabels?: string[];
  mealType?: string[];
  image: string;
  url?: string;
  recipeOwnerId: number;
  recipeOwnerName?: string;
  comments?: Comment[];
  userProfilePictureUrl? :string;
}

export interface Comment {
  commentId: number;
  commentText: string;
  commentAt: string;
  recipeId: number;
  userName: string;
  userProfilePictureUrl: any;
}

export interface User {
  userId: number;
  name: string;
  profilePictureUrl: string;
  profileSettings: string[];
  dietLabels: string[];
  healthLabels: string[];
}

export interface NewRecipe {
  Title: string;
  Yield?: string;
  Calories?: string;
  TotalTime?: string;
  Instructions: string[];
  Ingredients: string[];
  CuisineType?: string[];
  DietLabels?: string[];
  DishType?: string[];
  HealthLabels?: string[];
  MealType?: string[];
  RecipePicture?: File;
}
export type PostRecipeFormProps = {
  formState: NewRecipe;
  setFormState: React.Dispatch<React.SetStateAction<NewRecipe>>;
};
