import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import { LoginResponse, SetValue, EdamamResponse } from "../Utils/Types";
import RecipeCard from "../Components/RecipeCard";
import Navbar from "../Components/Navbar";
import "../App.css";
import Header from "../Components/Header";
import { baseUrl } from "../Utils/Constants";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface HomeProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

const Home = (props: HomeProps) => {
  let { state } = useLocation();

  const fetchRecipes = async ({ pageParam = 0 }): Promise<EdamamResponse> => {
    let res;
    pageParam !== 0 && hasNextPage
      ? (res = await fetch(
          `${baseUrl}/Recipes/Edamam/Next?nextUrl=${encodeURIComponent(
            data!.pages.reverse()[0].url
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          }
        ))
      : (res = await fetch(`${baseUrl}/Recipes/Edamam`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }));
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
    queryKey: ["recipes"],
    refetchOnWindowFocus: false,
    queryFn: fetchRecipes,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.url;
    },
  });

  useEffect(() => {
    fetchNextPage();
  }, [state]);

  return (
    <Box className="App">
      <main style={{ width: "100%", marginTop: "56px", marginBottom: "56px" }}>
        {data && (
          <InfiniteScroll
            threshold={1000}
            hasMore={hasNextPage}
            loadMore={() => fetchNextPage()}
          >
            {data.pages.map(page =>
              page.recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  user={props.user}
                  setUser={props.setUser}
                />
              ))
            )}
          </InfiniteScroll>
        )}
      </main>
    </Box>
  );
};

export default Home;
