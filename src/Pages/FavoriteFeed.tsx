import { Box } from "@mui/material";
import { LoginResponse, SetValue, FavoriteRecipe } from "../Utils/Types";
import RecipeCard from "../Components/RecipeCard";
import { fetchUserFavoriteRecipes } from "../Utils/HelperFunctions";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import SearchBar from "../Components/SearchBar";

interface FavoriteFeedProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
  userId: number;
  setFavoriteCount: React.Dispatch<React.SetStateAction<number>>;
}

const FavoriteFeed = (props: FavoriteFeedProps) => {
  
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["favoriteRecipes"],
    queryFn: async () =>
      (await fetchUserFavoriteRecipes(props.user.token, props.userId)).sort((a, b) => {
        if (
          a.favoriteRecipeId !== undefined &&
          b.favoriteRecipeId !== undefined
        ) {
          return b.favoriteRecipeId - a.favoriteRecipeId;
        }
        return 1;
      }),
  });
  useEffect(()=> {
    if (data) {
      props.setFavoriteCount(data.length + 1);
    }
  }, [data])

  useEffect(()=> {
    if (props.userId) {
      refetch();
    }
  }, [props.userId])

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: Could not load.</span>;
  }

  return (
    <Box className="App">
      {data.length != 0 && 
      <Box
        sx={{
          height: "100%",
          overflow: "scroll",
          marginTop: "100px",
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
      }
    </Box>
  );
};

export default FavoriteFeed;
