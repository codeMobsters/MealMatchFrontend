import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { LoginResponse, SetValue, EdamamResponse } from "../Utils/Types";
import RecipeCard from "../Components/RecipeCard";
import Navbar from "../Components/Navbar";
import "../App.css";
import Header from "../Components/Header";
import { baseUrl } from "../Utils/Constants";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFollowingFavoriteRecipes } from "../Utils/HelperFunctions";

interface HomeProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

const Home = (props: HomeProps) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["favoriteRecipes"],
    queryFn: async () =>
      (await fetchFollowingFavoriteRecipes(props.user.token, props.user.id)).sort((a, b) => {
        if (
          a.favoriteRecipeId !== undefined &&
          b.favoriteRecipeId !== undefined
        ) {
          return b.favoriteRecipeId - a.favoriteRecipeId;
        }
        return 1;
      }),
  });
  

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: Could not load.</span>;
  }

  return (
    <Box className="App">
      <Box
        sx={{
          height: "100%",
          overflow: "scroll",
          marginTop: "56px",
          marginBottom: '56px'
        }}
      >
        {data.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe.recipe}
            user={props.user}
            setUser={props.setUser}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
