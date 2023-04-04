import { useQuery } from "@tanstack/react-query";
import { Box, Card, Typography } from "@mui/material";
import { LoginResponse, SetValue, EdamamResponse } from "../Utils/Types";
import RecipeCard from "../Components/RecipeCard";
import "../App.css";
import { fetchFollowingFavoriteRecipes } from "../Utils/HelperFunctions";
import { useEffect, useState } from "react";
import { QRcodeUrl } from "../Utils/Constants";

interface HomeProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

const Home = (props: HomeProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
  
  useEffect(()=>{
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWindowDimensions);
  },[]);
  
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: Could not load.</span>;
  }
  if (windowWidth < 600) {
    return (
      <Box className="App">
        <Box
          sx={{
            height: "100%",
            overflow: "scroll",
            marginTop: "56px",
            marginBottom: '56px',
            width: "100%"
          }}
        >
          {!data.length && 
          <Box
          sx={{
            textAlign: "center"
          }}
          >
            <Typography
              variant="h5"
              sx={{
                width: "95%",
                m: 1,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Hi there!  <br/>This feed shows the recipes of people you follow.<br/>
              Follow some people to find some cool recipes =)
            </Typography>
          </Box>
        }
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
  }else{
    return(
      <Box className="App">
        <Box
          sx={{
            height: "100%",
            overflow: "scroll",
            marginTop: "100px",
            marginBottom: '56px',
            width: "100%",
            textAlign: 'center'
          }}
        >
        <Typography
          variant="h5"
          sx={{
            width: "100%",
            margin: "auto",
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Hi there! <br/>Unfortunately our app is optimized for mobile only. See you there:<br/>
        </Typography>
          <img src={QRcodeUrl} alt="qr code"/>
        </Box>
      </Box>
    )
  }
};

export default Home;
