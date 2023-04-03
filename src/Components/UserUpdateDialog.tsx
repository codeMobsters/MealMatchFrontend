import { useState, forwardRef, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { UserUpdateDialogProps, UserUpdateRequest } from "../Utils/Types";
import { Preferences } from "../Utils/Constants";
import MultipleSelectChip from "./ChipSelector";
import {
  FormControl,
  Input,
  Box,
  Avatar,
  CardHeader,
  useTheme,
  Alert,
  Snackbar,
} from "@mui/material";
import { isValidFileUploaded, updateUser } from "../Utils/HelperFunctions";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function UserUpdateDialog(props: UserUpdateDialogProps) {
  const theme = useTheme();
  const [userName, setUserName] = useState<string>("");
  const [userPass, setUserPass] = useState<string>("");
  const [userPic, setUserPic] = useState<File>();
  const [dietLabels, setDietLabels] = useState<string[]>(props.user.dietLabels);
  const [healthLabels, setHealthLabels] = useState<string[]>(
    props.user.healthLabels
  );
  const [openError, setOpenError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      likedRecipes: [],
      followedUserIds: [],
    });
    queryClient.invalidateQueries();
    navigate("/");
  };

  const handleClose = () => {
    props.setOpenUserUpdateDialog("");
  };

  async function handleUpdateUser() {
    if (props.openUserUpdateDialog == "name") {
      let request: UserUpdateRequest = {
        name: userName,
        dietLabels: props.user.dietLabels,
        healthLabels: props.user.healthLabels,
      };
      let success = await updateUser(props.user.token, props.user.id, request);
      if (success.ok) {
        props.setUser({ ...props.user, name: userName });
        handleClose();
      } else {
        setErrorMsg("An error has occured while updating your name!");
        setOpenError(true);
      }
    } else if (props.openUserUpdateDialog == "pref") {
      let request: UserUpdateRequest = {
        dietLabels: dietLabels,
        healthLabels: healthLabels,
      };
      let success = await updateUser(props.user.token, props.user.id, request);
      if (success.ok) {
        props.setUser({
          ...props.user,
          dietLabels: dietLabels,
          healthLabels: healthLabels,
        });
        handleClose();
      } else {
        setErrorMsg("An error has occured while updating your preferences!");
        setOpenError(true);
      }
    } else if (props.openUserUpdateDialog == "picture") {
      let request: UserUpdateRequest = {
        profilePicture: userPic,
        dietLabels: props.user.dietLabels,
        healthLabels: props.user.healthLabels,
      };
      let success = await updateUser(props.user.token, props.user.id, request);
      if (success.ok) {
        props.setUser({
          ...props.user,
          profilePictureUrl: await success.text(),
        });
        handleClose();
      } else {
        setErrorMsg("An error has occured while updating your picture!");
        setOpenError(true);
      }
    }
    return;
  }

  function fileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target && e.target.files) {
      if (e.target.files.length < 1) {
        return;
      }
      const file = e.target.files[0];
      if (isValidFileUploaded(file)) {
        setUserPic(file);
      } else {
        setErrorMsg("Please provide a valid picture");
        setOpenError(true);
      }
    }
  }

  const handleErrorClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  return (
    <Dialog
      fullScreen
      open={props.openUserUpdateDialog !== ""}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Button
            autoFocus
            color="inherit"
            sx={{
              marginLeft: "auto",
              border: 1,
              borderColor: "text.secondary",
            }}
            onClick={() => handleUpdateUser()}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: "80vw", margin: 2 }}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="user"
              alt={props.user.name}
              src={props.user.profilePictureUrl}
            ></Avatar>
          }
          title={props.user.name}
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <Box>
          {props.openUserUpdateDialog == "name" ? (
            <>
              <Typography sx={{ margin: 2 }}>
                What would you like your name to be?
              </Typography>
              <FormControl>
                <Input
                  sx={{ width: "80vw" }}
                  required
                  onChange={e => setUserName(e.target.value)}
                />
              </FormControl>
            </>
          ) : props.openUserUpdateDialog == "picture" ? (
            <>
              <Typography sx={{ margin: 2 }}>
                Show us your new picure!
              </Typography>
              <FormControl>
                <Input
                  sx={{ width: "80vw" }}
                  required
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => fileChange(e)}
                />
              </FormControl>
            </>
          ) : (
            <>
              <Typography>Dietary tags to include in feed</Typography>
              <MultipleSelectChip
                seedValues={dietLabels}
                filledValues={true}
                seedData={Preferences.DietLabels}
                onChange={actualValue => {
                  setDietLabels(actualValue);
                }}
              />
              <Typography>Health tags to include in feed</Typography>
              <MultipleSelectChip
                seedValues={healthLabels}
                filledValues={true}
                seedData={Preferences.HealthLabels}
                onChange={actualValue => {
                  setHealthLabels(actualValue);
                }}
              />
            </>
          )}
        </Box>
        <Snackbar
          open={openError}
          autoHideDuration={2000}
          onClose={handleErrorClose}
        >
          <Alert
            variant="filled"
            onClose={handleErrorClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMsg}
          </Alert>
        </Snackbar>
      </Box>
    </Dialog>
  );
}
