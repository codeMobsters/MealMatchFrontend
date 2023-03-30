import { Box } from "@mui/material";
import { LoginResponse, SetValue, FavoriteRecipe } from "../Utils/Types";
import RecipeCard from "../Components/RecipeCard";
import { useEffect, useState } from "react";
import { fetchUserFavoriteRecipes } from "../Utils/HelperFunctions";

interface HomeProps {
  user: LoginResponse;
}

const FavoriteFeed = (props: HomeProps) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>();

  useEffect(() => {
    const fetchData = async () => {
      setFavoriteRecipes(
        (await fetchUserFavoriteRecipes(props.user.token)).sort((a, b) => {
          if (
            a.favoriteRecipeId !== undefined &&
            b.favoriteRecipeId !== undefined
          ) {
            return b.favoriteRecipeId - a.favoriteRecipeId;
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
        {favoriteRecipes &&
          favoriteRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe.recipe}
              user={props.user}
              isFavorite={true}
            />
          ))}
      </Box>
    </Box>
  );
};

export default FavoriteFeed;
