import { useState } from "react";
import {
  CardHeader,
  Avatar,
  Box,
  Button,
  Container,
  useTheme,
} from "@mui/material";
import { LoginResponse, SetValue } from "../Utils/Types";
import "../App.css";
import UserUpdateDialog from "../Components/UserUpdateDialog";
import React from "react";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

interface ProfileProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

const ProfileSettings = (props: ProfileProps) => {
  const[openUserUpdateDialog, setOpenUserUpdateDialog] = useState("");

  function handleDeleteAccount() {
    
  }
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
        <Box
          sx={{
            width: "100%",
            padding: 2,
            height: '100%',
            backgroundColor: "primary.main",
            marginTop: "60px"
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
          />
          <Container sx={{borderRadius: 2, border: 1, borderColor: 'text.secondary', padding: 0, display: 'grid', gridTemplateColumns: '1fr', marginBottom : 2}}>
          <Button
            color="inherit" 
            sx={{border: 1, borderColor: "text.secondary", margin: 1}}
            onClick={() => setOpenUserUpdateDialog("name")}
          >
            Change name
          </Button>
          <Button
            color="inherit" 
            sx={{border: 1, borderColor: "text.secondary", margin: 1}}
            onClick={() => setOpenUserUpdateDialog("pass")}
          >
            Change password
          </Button>
          <Button
            color="inherit" 
            sx={{border: 1, borderColor: "text.secondary", margin: 1}}
            onClick={() => setOpenUserUpdateDialog("pref")}
          >
            Change preferences
          </Button>
          <Button
            color="inherit" 
            sx={{border: 1, borderColor: "text.secondary", margin: 1, color: 'error.main'}}
            onClick={() => handleDeleteAccount()}
          >
            Delete account
          </Button>
          </Container>
          <UserUpdateDialog 
            user={props.user} 
            setUser={props.setUser} 
            openUserUpdateDialog={openUserUpdateDialog} 
            setOpenUserUpdateDialog={setOpenUserUpdateDialog}
          />
        </Box>
  );
};

export default ProfileSettings;
