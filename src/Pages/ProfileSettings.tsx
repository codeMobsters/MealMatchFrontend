import { useState } from "react";
import {
  CardHeader,
  Avatar,
  Box,
  Button,
  Container,
} from "@mui/material";
import { LoginResponse, SetValue } from "../Utils/Types";
import "../App.css";
import UserUpdateDialog from "../Components/UserUpdateDialog";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

const ProfileSettings = (props: ProfileProps) => {
  const[openUserUpdateDialog, setOpenUserUpdateDialog] = useState("");
  const navigate = useNavigate();

  return (
        <Box
          sx={{
            width: "100%",
            padding: 2,
            height: '100%',
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
            sx={{marginTop: 2, marginBottom: 2}}
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
            onClick={() => setOpenUserUpdateDialog("picture")}
          >
            Change profile picture
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
            sx={{border: 1, borderColor: "text.secondary", margin: 1}}
            onClick={() => navigate(-1)}
          >
            Cancel / Go back
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
