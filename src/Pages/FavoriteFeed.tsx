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
  
  const { isLoading, isError, data } = useQuery({
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

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: Could not load.</span>;
  }

  function handleFavoriteSearch(term: string, searchType: string): void {
    console.log("search for: ", term, " in ", searchType);
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
        <SearchBar 
          searchbarPlaceholderText='Search recipes'
          searchType={'favorite'}
          handleSearch={handleFavoriteSearch}
          />
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

export default FavoriteFeed;
