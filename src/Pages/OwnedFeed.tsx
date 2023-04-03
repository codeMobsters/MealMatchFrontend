import { Box } from "@mui/material";
import { LoginResponse, SetValue, Recipe } from "../Utils/Types";
import RecipeCard from "../Components/RecipeCard";
import { useEffect, useState } from "react";
import { fetchUserFavoriteRecipes, fetchUserOwnedRecipes } from "../Utils/HelperFunctions";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../Components/SearchBar";

interface OwnedFeedProps {
  user: LoginResponse;
  userId: number;
  setUser: SetValue<LoginResponse>;
  setOwnedCount: React.Dispatch<React.SetStateAction<number>>;
}

const OwnedFeed = (props: OwnedFeedProps) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["ownedRecipes"],
    queryFn: async () =>
      (await fetchUserOwnedRecipes(props.user.token, props.userId)).sort((a, b) => {
        if (a.recipeOwnerId !== undefined && b.recipeOwnerId !== undefined) {
          return b.recipeOwnerId - a.recipeOwnerId;
        }
        return 1;
      }),
  });
  useEffect(()=> {
    if (data) {
      props.setOwnedCount(data.length + 1);
    }
  }, [data])

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
          marginTop: "100px",
          marginBottom: '56px',
          width: "100%"
        }}
      >
        {data.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            user={props.user}
            setUser={props.setUser}
          />
        ))}
      </Box>
    </Box>
  );
};

export default OwnedFeed;
