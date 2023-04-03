import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from "@tanstack/react-query";
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
  profilePictureUrl: string;
  profileSettings: string[];
  dietLabels: string[];
  healthLabels: string[];
  favoriteRecipes: number[];
  likedRecipes: number[];
  followedUserIds: number[];
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
  userProfilePictureUrl?: string;
  likes?: number[];
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
  favoriteRecipes: number;
  ownedRecipes: number;
  followers: number; // Follower[]
  following: number; // Follower[]
}

// export interface Follower {
//   followerId: number;
//   followerName: string;
// }

export interface UserUpdateRequest {
  name?: string;
  profilePicture?: File;
  profileSettings?: string[];
  dietLabels?: string[];
  healthLabels?: string[];
}

export interface HeaderProps {
  user: LoginResponse;
}

export interface UserListProps {
  user: LoginResponse;
  queryType? :string;
  setUser: SetValue<LoginResponse>;
  userId?: number;
  fetchFunction: (token: string, userId: number | undefined) => Promise<User[]>
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

export interface NewComment {
  commentText: string;
  recipeId: number;
}

export interface NewFavoriteRecipe {
  recipeId: number;
}

export interface NewFollower {
  followedUserId: number;
}

export interface MultipleSelectChipProps {
  seedData: string[];
  seedValues?: string[];
  seedType?: string;
  filledValues?: boolean;
  onChange: (actualValue: string[]) => void;
}

export type PostRecipeDialogProps = {
  openPostDialog: boolean;
  setOpenPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
  user: LoginResponse;
};

export type FollowListDialogProps = {
  openFollowDialog: number;
  setOpenFollowDialog: React.Dispatch<React.SetStateAction<number>>;
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
  userId :number;
  refetch :<TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<User, unknown>>
};

export interface FavoriteFeedProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
  userId: number;
  refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) =>
   Promise<QueryObserverResult<User, unknown>>
  setFavoriteCount: React.Dispatch<React.SetStateAction<number>>;
}

export type UserUpdateDialogProps = {
  openUserUpdateDialog: string;
  setOpenUserUpdateDialog: React.Dispatch<React.SetStateAction<string>>;
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
};
