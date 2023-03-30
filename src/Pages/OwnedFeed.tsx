import { Box } from "@mui/material";
import { LoginResponse, SetValue, Recipe } from "../Utils/Types";
import RecipeCard from "../Components/RecipeCard";
import { useEffect, useState } from "react";
import { fetchUserOwnedRecipes } from "../Utils/HelperFunctions";

interface OwnedFeedProps {
  user: LoginResponse;
}

const OwnedFeed = (props: OwnedFeedProps) => {
  const [ownedRecipes, setOwnedRecipes] = useState<Recipe[]>();

  useEffect(() => {
    const fetchData = async () => {
      setOwnedRecipes(
        (await fetchUserOwnedRecipes(props.user.token)).sort((a, b) => {
          if (a.recipeId !== undefined && b.recipeId !== undefined) {
            return b.recipeId - a.recipeId;
          }
          return 1;
        })
      );
    };
    fetchData();
  }, []);

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
        {ownedRecipes &&
          ownedRecipes.map((recipe, index) => (
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
