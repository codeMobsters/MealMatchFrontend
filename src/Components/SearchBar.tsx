import { Box, IconButton, AppBar, useScrollTrigger, Slide, InputBase } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

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
    handleSearch : (term :string) => void
}

const SearchBar = (props :SearchBarProps) => {
    const [searchTermlocal, setSearchTermlocal] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(()=>{
        setWindowWidth(window.innerWidth);
    },[window.innerWidth])
  
    if (windowWidth < 1200) {
        return (
            <Box className="App">
              <HideOnScroll>
                <Box
                  sx={{
                    width: "100%",
                    top: { 
                        xs: 56, 
                        tablet: 56
                    },
                    left: 0,
                    zIndex: "1",
                    position: "fixed",
                    backgroundColor: "#3c3c3d",
                    color:"#ffffff"
                  }}
                >
                  <AppBar position="static" sx={{ p: '2px 4px', display: 'grid', gridTemplateColumns: " 8fr 1fr 1fr", alignItems: 'center'}}>
                    <InputBase
                      sx={{ ml: 1, flex: 1, color:"#ffffff"}}
                      placeholder={props.searchbarPlaceholderText ? props.searchbarPlaceholderText : "Search"}
                      inputProps={{ 'aria-label': 'Search' }}
                      onChange={(e) => setSearchTermlocal(e.target.value)}
                      />
                      <IconButton 
                        type="button" 
                        sx={{ p: '10px' }} 
                        aria-label="search"
                        onClick={() => props.handleSearch(searchTermlocal)}
                        >
                          <SearchIcon />
                      </IconButton>
                      <IconButton 
                        type="button" 
                        sx={{ p: '10px' }} 
                        aria-label="search"
                        onClick={() => props.handleSearch("")}
                        >
                          <HighlightOffOutlinedIcon />
                      </IconButton>
                  </AppBar>
                </Box>
              </HideOnScroll>
              </Box>
              )
    } else {
        return (<Box sx={{height: '0px'}}></Box>)
    }
}

export default SearchBar