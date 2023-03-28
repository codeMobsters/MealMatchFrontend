import React from 'react'
import InfiniteScroll from "react-infinite-scroller";
import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { Box } from '@mui/material';
import { LoginResponse, SetValue, EdamamResponse } from '../Utils/Types';
import RecipeReviewCard from '../Components/RecipeCard';
import Navbar from '../Components/Navbar';
import '../App.css'


interface HomeProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

const Home = (props: HomeProps) => {

  const fetchRecipes = async ({pageParam = 0}) : Promise<EdamamResponse> => {
    let res;
    (pageParam !== 0 && hasNextPage) ?
    res = await fetch(`https://localhost:7031/Recipes/Edamam/Next?nextUrl=${encodeURIComponent(data!.pages.reverse()[0].url)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${props.user.token}`,
      },
    }) :
    res = await fetch('https://localhost:7031/Recipes/Edamam', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${props.user.token}`,
      },
    })
    return res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
    getNextPageParam: (lastPage, pages) => {
        return lastPage.url;
      }
  })

  return (
    <Box className="App">
      <Navbar user={props.user} setUser={props.setUser}/>
      <main style={{ width: "100%" }}>
        {data && (
          <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()} >
            {data.pages.map((page) =>
              page.recipes.map((recipe, index) => <RecipeReviewCard key={index} recipe={recipe} />)
            )}
          </InfiniteScroll>)}
      </main>
    </Box>
  )
}

export default Home