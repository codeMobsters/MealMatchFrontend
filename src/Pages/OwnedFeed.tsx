import { Box } from "@mui/material";
import { LoginResponse, SetValue, Recipe } from "../Utils/Types";
import RecipeCard from "../Components/RecipeCard";
import { useEffect, useState } from "react";
import { fetchUserOwnedRecipes } from "../Utils/HelperFunctions";
import { useQuery } from "@tanstack/react-query";

interface OwnedFeedProps {
  user: LoginResponse;
}

const OwnedFeed = (props: OwnedFeedProps) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["ownedRecipes"],
    queryFn: async () =>
      (await fetchUserOwnedRecipes(props.user.token)).sort((a, b) => {
        if (a.recipeId !== undefined && b.recipeId !== undefined) {
          return b.recipeId - a.recipeId;
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
          height: "100vh",
          overflow: "scroll",
          marginTop: "56px",
          marginBottom: "56px",
        }}
      >
        {data.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            user={props.user}
            isFavorite={true}
          />
        ))}
      </Box>
    </Box>
  );
};

export default OwnedFeed;
