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
import { Preferences, githubIconBlobUrl, linkedInIconBlobUrl, profilePicMobster1, profilePicMobster2, userIdMobster1, userIdMobster1Github, userIdMobster1LinkedIn, userIdMobster2, userIdMobster2Github, userIdMobster2LinkedIn } from "../Utils/Constants";
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
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { isValidFileUploaded, updateUser } from "../Utils/HelperFunctions";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

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
  const [userPic, setUserPic] = useState<File>();
  const [dietLabels, setDietLabels] = useState<string[]>(props.user.dietLabels);
  const [healthLabels, setHealthLabels] = useState<string[]>(
    props.user.healthLabels
  );
  const [openError, setOpenError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
              display: (props.openUserUpdateDialog == "about" ? "none" : "block")
            }}
            onClick={() => handleUpdateUser()}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: "90vw", margin: 2 }}>
        <Container sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr'}}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="user"
              alt={props.user.name}
              src={props.user.profilePictureUrl}
            ></Avatar>
          }
          sx={{
            display: (props.openUserUpdateDialog == "about" ? "none" : "inline-block"),
            paddingRight: 0
          }}
        />
        <CardHeader
          title={props.user.name}
          sx={{
            display: (props.openUserUpdateDialog == "about" ? "none" : "inline-block"),
            paddingLeft: 1,
            marginTop: 0.5
          }}
        />
        </Container>
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
          ) : props.openUserUpdateDialog == "about" ? (
            <>
              <Card
                sx={{
                    width: "100%",
                    margin: "auto",
                    display: 'grid', 
                    gridTemplateColumns: "2fr 1fr"
                  }}>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="Rodrigo Picture"
                            src={profilePicMobster1}
                        />
                    }
                    title="Rodrigo Moncorvo"
                    subheader="Mobster 1"
                    onClick={() => navigate(`/${userIdMobster1}`)}
                    sx={{
                    flex: 1,
                    margin: 0
                    }}
                />
                <Container>
                <Button 
                  color='inherit'
                >
                  <a target="_blank" href={userIdMobster1LinkedIn}>
                    <img src={linkedInIconBlobUrl} alt="linkedIn" style={{maxHeight: '20px'}} />
                  </a>
                </Button>
                <Button 
                  color='inherit'
                >
                  <a target="_blank" href={userIdMobster1Github}>
                  <img src={githubIconBlobUrl} alt="github" style={{maxHeight: '20px'}}/>
                  </a>
                </Button>
                </Container>
                <CardContent sx={{ gridColumnStart: 1, gridColumnEnd: 4}}>
                  <Typography>
                    Experienced FullStack Developer, proficient in C# and Javascript with Python and AI knowledge. 
                    From Brazil, currently living in Utrecht. 
                    Skilled problem solver with a fast learning ability.
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                    width: "100%",
                    margin: "auto",
                    display: 'grid', 
                    marginTop: 2,
                    gridTemplateColumns: "2fr 1fr"
                  }}>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="Lajos Picture"
                            src={profilePicMobster2}
                        />
                    }
                    title="Lajos Horváth"
                    subheader="Mobster 2"
                    onClick={() => navigate(`/${userIdMobster2}`)}
                    sx={{
                    flex: 1,
                    margin: 0
                    }}
                />
                <Container>
                <Button 
                  color='inherit'
                >
                  <a target="_blank" href={userIdMobster2LinkedIn}>
                    <img src={linkedInIconBlobUrl} alt="linkedIn" style={{maxHeight: '20px'}} />
                  </a>
                </Button>
                <Button 
                  color='inherit'
                >
                  <a target="_blank" href={userIdMobster2Github}>
                  <img src={githubIconBlobUrl} alt="github" style={{maxHeight: '20px'}} />
                  </a>
                </Button>
                </Container>
                <CardContent sx={{ gridColumnStart: 1, gridColumnEnd: 4}}>
                  <Typography>
                  I am a fullstack Developer proficient in C#, JavaScript, and TypeScript.
                  Currently residing in Wormer, NL. 
                  I am passionate about programming and always eager to explore 
                  new technologies and approaches to improve my skills.
                  Committed to exceeding expectations. I am a firm believer in the importance of 
                  continuous learning and growth. Lucky me, I became a programmer!
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                    width: "100%",
                    margin: "auto",
                    display: 'flex', 
                    marginTop: 2
                  }}>
                <CardContent sx={{ gridColumnStart: 1, gridColumnEnd: 4}}>
                  <Typography
                  dangerouslySetInnerHTML={{ __html: 
                  `<p>
                  About this application: <br>

                  This is our final project that we made in 2 short weeks to graduate from 
                  <a target="_blank" href="https://www.salt.dev/" >SALT</a>.
                  The idea is to have an Instagram-style app for recipes,
                  without duckfaces and cat pictures
                  (those we can still get enough of on Instagram).<br>
                  Please feel free to use our app and 
                  contact us with any questions or feedback!<br><br>
                  The code base can be found on Github, in public repositories:<br>
                  <a target="_blank" href="https://github.com/codeMobsters/MealMatchAPI">.Net API backend</a><br>
                  <a target="_blank" href="https://github.com/codeMobsters/MealMatchFrontend">React frontend</a><br><br>
                  For the recipe feed we have used
                  <a target="_blank" href="https://www.edamam.com/">Edamam API</a><br><br>
                  This app is a show of skill. We do not monetize it in any way,
                  no data is collected.
                  </p>` 
                  }}>
                  </Typography>
                </CardContent>
              </Card>
            </>
          ): (
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
