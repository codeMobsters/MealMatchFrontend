import { Box, IconButton, AppBar, useScrollTrigger, Slide, InputBase } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

interface HideOnScrollProps {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
const { children, window } = props;
const trigger = useScrollTrigger({
    target: window ? window() : undefined,
});

return (
    <Slide appear={false} direction="down" in={!trigger}>
    {children}
    </Slide>
);
}
export type SearchBarProps = {
    searchbarPlaceholderText? :string
    searchType :string
    handleSearch : (term :string, searchType :string) => void
}

const SearchBar = (props :SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState("");
  return (
    <Box className="App">
      <HideOnScroll>
        <Box
          sx={{
            width: "100%",
            top: { 
                xs: props.searchType == "owned" || props.searchType == "favorite" ? 186 : 0, 
                tablet: props.searchType == "owned" || props.searchType == "favorite" ? 186 : 0
            },
            left: 0,
            zIndex: "1",
            position: "fixed",
            backgroundColor: "#3c3c3d",
            color:"#ffffff",
            marginTop: "56px"
          }}
        >
          <AppBar position="static" sx={{ p: '2px 4px', display: 'grid', gridTemplateColumns: " 8fr 1fr", alignItems: 'center'}}>
            <InputBase
              sx={{ ml: 1, flex: 1, color:"#ffffff"}}
              placeholder={props.searchbarPlaceholderText ? props.searchbarPlaceholderText : "Search"}
              inputProps={{ 'aria-label': 'Search' }}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton 
                type="button" 
                sx={{ p: '10px' }} 
                aria-label="search"
                onClick={() => props.handleSearch(searchTerm, props.searchType)}
                >
                  <SearchIcon />
              </IconButton>
          </AppBar>
        </Box>
      </HideOnScroll>
      </Box>
  )
}

export default SearchBar