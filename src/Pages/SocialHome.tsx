import { Box } from '@mui/material';
import { LoginResponse, SetValue, Recipe } from '../Utils/Types';
import RecipeReviewCard from '../Components/RecipeCard';
import { useEffect, useState } from "react";
import { fetchUserOwnedRecipes } from '../Utils/HelperFunctions';
import HeaderComp from '../Components/Header';
import Navbar from '../Components/Navbar';


interface HomeProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

const SocialHome = (props: HomeProps) => {
  const[ownRecipes, setOwnRecipes] = useState<Recipe[]>()

  useEffect(() => {
      const fetchData = async () => {
        setOwnRecipes(await fetchUserOwnedRecipes(props.user.token));
      }
      fetchData()
  }, [])

  return (
    <Box className="App">
        <HeaderComp />
        <Navbar user={props.user} setUser={props.setUser}/>
        <Box sx={{height: '100vh',overflow: 'scroll', marginTop: '56px', marginBottom: '56px'}}>
        {ownRecipes&& ownRecipes.map((recipe, index) => 
            <RecipeReviewCard 
            key={index} 
            recipe={recipe}
            user={props.user}
            />)
        }
        </Box>
    </Box>
  )
}

export default SocialHome