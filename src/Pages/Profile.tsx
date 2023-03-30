import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Button,
  Box,
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Tab,
  Tabs,
} from "@mui/material";
import {
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  Message as MessageIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { LoginResponse, SetValue } from "../Utils/Types";
import { theme } from "../Utils/Theme";
import FavoriteFeed from "./FavoriteFeed";
import OwnedFeed from "./OwnedFeed";

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
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <>
      <HideOnScroll>
        <Box
          sx={{
            width: "100%",
            margin: "auto",
            marginTop: 10,
            marginBottom: 10,
            paddingBottom: 10,
            position: "fixed",
            top: { xs: 0, tablet: 0 },
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                aria-label="Profile Picture"
                src={props.user.profilePictureUrl}
              />
            }
            title={props.user.name}
            subheader="The recipe master"
            action={
              <IconButton aria-label="Edit Profile">
                <EditIcon />
              </IconButton>
            }
          />

          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
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
      <TabPanel value={value} index={0}>
        <FavoriteFeed user={props.user} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OwnedFeed user={props.user} />
      </TabPanel>
    </>
  );
};

export default Profile;
