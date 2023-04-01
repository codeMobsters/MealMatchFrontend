import { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import PostRecipeForm from './PostRecipeForm';
import { NewRecipe, PostRecipeDialogProps, UserUpdateDialogProps } from '../Utils/Types';
import { newReipe, Preferences } from '../Utils/Constants';
import { addNewRecipeFromForm } from '../Utils/HelperFunctions';
import MultipleSelectChip from './ChipSelector';
import { FormControl, InputLabel, Input, FormHelperText, Box, Avatar, CardHeader, useTheme } from '@mui/material';
import { theme } from '../Utils/Theme';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function UserUpdateDialog(props :UserUpdateDialogProps) {
  const theme = useTheme();
  const [userName, setUserName] = useState<string>("");
  const [userPass, setUserPass] = useState<string>("");
  const [dietLabels, setDietLabels] = useState<string[]>(props.user.dietLabels);
  const [healthLabels, setHealthLabels] = useState<string[]>(props.user.healthLabels);
  const nextMode = theme.palette.mode == 'light' ? 'dark' : 'light';
  const handleClose = () => {
    props.setOpenUserUpdateDialog("");
  };

  // props.openUserUpdateDialog can hold 4 values ("", "name", "pass", "pref"), 
  // the content and visibility of the UserUpdateDialog is dependent on these strings
  function handleUpdateUser() {
    if (props.openUserUpdateDialog == "name") {
      console.log(userName);
    } else if (props.openUserUpdateDialog == "pass") {
      console.log(userPass);
    } else if (props.openUserUpdateDialog == "pref") {
      console.log(dietLabels, healthLabels);
    }
    return;
  }

  return (
    <Dialog
      fullScreen
      open={props.openUserUpdateDialog !== ""}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
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
            sx={{ marginLeft: 'auto',border: 1, borderColor: "text.secondary"}}
            onClick={() => handleUpdateUser()}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>
    
      <Box sx={{width: '80vw', margin: 2}}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="user"
              alt={props.user.name}
              src={props.user.profilePictureUrl}
            ></Avatar>
          }
          title={props.user.name}
      />
      <Box>
    {props.openUserUpdateDialog == 'name' ?
        <>
          <Typography sx={{margin: 2}}>What would you like your name to be?</Typography>
          <FormControl >
            <Input sx={{width: '80vw'}} required
            onChange={(e) => 
              setUserName(e.target.value)
            }/>
          </FormControl >
        </>
    : props.openUserUpdateDialog == 'pass' ?
        <>
          <Typography sx={{margin: 2}}>What will be your new password?</Typography>
          <FormControl >
            <Input sx={{width: '80vw'}} required
            onChange={(e) =>
              setUserPass(e.target.value)
            }/>
          </FormControl >
        </>
    :
        <>
          <Typography>
            Dietary tags to include in feed
          </Typography>
          <MultipleSelectChip 
              seedValues={dietLabels}
              filledValues={true}
              seedData={Preferences.dietLabels}
              onChange={(actualValue) => {
                console.log(actualValue)
            }}
          />
          <Typography>
            Health tags to include in feed
          </Typography>
          <MultipleSelectChip
              seedValues={healthLabels}
              filledValues={true}
              seedData={Preferences.healthLabels}
              onChange={(actualValue) => {
                console.log(actualValue)
            }}
          />
        </>
      }
      </Box>
    </Box>
  </Dialog>
  );
}