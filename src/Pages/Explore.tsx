import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";
import { LoginResponse, SetValue, EdamamResponse } from "../Utils/Types";
import RecipeCard from "../Components/RecipeCard";
import Navbar from "../Components/Navbar";
import "../App.css";
import Header from "../Components/Header";
import { baseUrl } from "../Utils/Constants";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import ExploreFilterDialog from "../Components/ExploreFilterDialog";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

interface ExploreProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

const Explore = (props: ExploreProps) => {
  let { state } = useLocation();
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [openPostDialog, setOpenPostDialog] = useState(false);

  const handlePostAction = () => {
    setOpenPostDialog(true);
  };

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
      : (res = await fetch(
          `${baseUrl}/Recipes/Edamam${
            searchTerm == undefined ? "" : `?${searchTerm}`
          }`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          }
        ));
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
    refetch,
  } = useInfiniteQuery({
    queryKey: ["recipes"],
    refetchOnWindowFocus: false,
    queryFn: fetchRecipes,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.url;
    },
  });

  useEffect(() => {
    setSearchTerm(undefined);
  }, [state]);

  function handleExploreSearch(term: string) {
    term == "" ? setSearchTerm('') : setSearchTerm(term);
  }

  useEffect(() => {
      refetch();
  }, [searchTerm]);

  if (isFetching) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: Could not load.</span>;
  }

  return (
    <Box className="App">
      <main style={{ width: "100%", marginTop: "100px", marginBottom: "56px" }}>
        {data && (
          <>
            <Button
              onClick={() => handlePostAction()}
              sx={{
                position: "absolute",
                top : 63,
                left: 10,
                border: 1,
                color: "inherit",
                borderRadius: 2,
                padding: 0.5,
                pr: 2
              }}
            >
              <><SearchOutlinedIcon sx={{marginRight: 1}} /> Filter</>
            </Button>
            <ExploreFilterDialog
              user={props.user}
              openPostDialog={openPostDialog}
              setOpenPostDialog={setOpenPostDialog}
              handleExploreSearch={handleExploreSearch}
            />
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
          </>
        )}
      </main>
    </Box>
  );
};

export default Explore;
