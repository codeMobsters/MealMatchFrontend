import { Dispatch, SetStateAction } from "react";


export type SetValue<T> = Dispatch<SetStateAction<T>>

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
};

export interface EdamamResponse {
    url: string
    recipes: Recipe[]
  }

export interface Recipe {
    recipeId: number
    label: string
    like?: number
    yield: number
    calories: number
    totalTime: number
    createdAt: string
    ingredientLines: string[]
    cuisineType: string[]
    dietLabels: string[]
    dishType: string[]
    healthLabels: string[]
    mealType: string[]
    image: string
    url: string
    userId: number
    userName: string
    comments: Comment[]
  }
  
  export interface Comment {
    commentId: number
    commentText: string
    commentAt: string
    recipeId: number
    userName: string
    userProfilePictureUrl: any
  }