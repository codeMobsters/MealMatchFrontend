import React, { useEffect, useState } from "react";
import {
  CardHeader,
  Avatar,
  IconButton,
  Box,
  useScrollTrigger,
  Slide,
  AppBar,
  Tab,
  Tabs,
  CardContent,
  Typography,
} from "@mui/material";
import { Logout as LogoutIcon, PortableWifiOffSharp } from "@mui/icons-material";
import { LoginResponse, SetValue } from "../Utils/Types";
import FavoriteFeed from "./FavoriteFeed";
import OwnedFeed from "./OwnedFeed";
import "../App.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "../Utils/HelperFunctions";
import FollowListDialog from "../Components/FollowListDialog";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{ marginTop: "170px" }}
    >
      {value === index && <Box sx={{ }}>{children}</Box>}
    </div>
  );
}

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

interface ProfileProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

const Profile = (props: ProfileProps) => {
  const [value, setValue] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [ownedCount, setOwnedCount] = useState(0);

  const [openFollowDialog, setOpenFollowDialog] = useState(0);
  
  const params = useParams();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["profileUser"],
    queryFn: async () => fetchUser(params.userId, props.user.token),
  });
  const queryClient = useQueryClient();
  let { state } = useLocation();

  useEffect(() => {
    refetch();
  }, [params]);

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

  const handleLogout = () => {
    props.setUser({
      id: 0,
      name: "",
      token: "",
      profilePictureUrl: "",
      profileSettings: [],
      dietLabels: [],
      healthLabels: [],
      favoriteRecipes: [],
      favoriteRecipesSources: [],
      likedRecipes: [],
      followedUserIds: [],
    });
    queryClient.invalidateQueries();
    navigate("/");
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function handleGoToSettings() {
    navigate("/settings");
  }

  if (windowWidth < 600) {
    return (
    <>
      <HideOnScroll>
        <Box
          sx={{
            width: "100%",
            top: { xs: 0, tablet: 0 },
            zIndex: "1",
            position: "fixed",
            backgroundColor: "#3c3c3d",
            color:"#ffffff",
            marginTop: "56px",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                aria-label="Profile Picture"
                src={data.profilePictureUrl}
                sx={{ width: 76, height: 76 }}
              />
            }
            title={data.name}
            titleTypographyProps={{variant:'h6' }}
            action={
              <Box sx={{
                  display: (params.userId && parseInt(params?.userId) == props.user.id ? 'grid' : 'none'), 
                  flexDirection: '1fr'
                }}>
                <IconButton
                  color="secondary"
                  aria-label="Edit Profile"
                  onClick={() => handleGoToSettings()}
                  sx={{ width: 30, height: 30, marginBottom: 2}}
                >
                  <SettingsOutlinedIcon sx={{ width: 30, height: 30  }} />
                </IconButton>
                <IconButton sx={{ width: 30, height: 30 }} aria-label="Logout" onClick={() => handleLogout()}>
                  <LogoutIcon
                    sx={{
                      color: "white",
                      background: "red",
                      borderRadius: "30px",
                      padding: "3px",
                      width: 30, height: 30
                    }}
                  />
                </IconButton>
              </Box>
            }
            sx={{
              margin: 2,
              ml:0
            }}
          />
          <CardContent
            sx={{
              padding: "5px",
              textAlign: "center",
              fontSize: "0.5rem",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                flexGrow: 1,
              }}
            >
              {favoriteCount > 0 ? favoriteCount - 1 : data.favoriteRecipes}{" "}
              Favorites
            </Typography>
            <Typography
              sx={{
                flexGrow: 1,
              }}
            >
              {ownedCount > 0 ? ownedCount - 1 : data.ownedRecipes} Owned
            </Typography>
            <Typography
              sx={{
                flexGrow: 1,
              }}
              onClick={() => setOpenFollowDialog(1)}
            >
              {data.followers} Followers
            </Typography>
            <Typography
              sx={{
                flexGrow: 1,
              }}
              onClick={() => setOpenFollowDialog(2)}
            >
              {data.following} Following
            </Typography>
          </CardContent>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
            >
              <Tab
                label="Favorited Recipes"
                id="tab-0"
                aria-controls="tabpanel-0"
              />
              <Tab
                label="Owned Recipes"
                id="tab-1"
                aria-controls="tabpanel-1"
              />
            </Tabs>
          </AppBar>
        </Box>
      </HideOnScroll>
      <FollowListDialog
            user={props.user}
            refetch={refetch}
            setUser={props.setUser}
            userId={data.userId}
            openFollowDialog={openFollowDialog}
            setOpenFollowDialog={setOpenFollowDialog}
      />
      <TabPanel value={value} index={0}>
        <FavoriteFeed
          user={props.user}
          userId={data.userId}
          setUser={props.setUser}
          setFavoriteCount={setFavoriteCount}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OwnedFeed
          user={props.user}
          userId={data.userId}
          setUser={props.setUser}
          setOwnedCount={setOwnedCount}
        />
      </TabPanel>
      </>
  )
  }else{
    return(<Box sx={{height: '0px'}}></Box>);
  }
};

export default Profile;
