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
import { NewRecipe } from '../Utils/Types';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type PostRecipeDialogProps = {
    openPostDialog :boolean,
    setOpenPostDialog : React.Dispatch<React.SetStateAction<boolean>>
}

export default function PostRecipeDialog(props :PostRecipeDialogProps) {
    
    const [formState, setFormState] = useState<NewRecipe>({
        Title: "",
        Yield: "",
        Calories: "",
        TotalTime: "",
        Instructions: [],
        Ingredients: [],
        CuisineType: [],
        DietLabels: [],
        DishType: [],
        HealthLabels: [],
        MealType: []
    });
    
    function handlePostRecipe() {
        // post the formdata from the states
    }
    const handleClose = () => {
      props.setOpenPostDialog(false);
    };

  return (
    <div>
        <Dialog
          fullScreen
          open={props.openPostDialog}
          onClose={handleClose}
          TransitionComponent={Transition}>
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add your recipe!
            </Typography>
            <Button autoFocus color="inherit" onClick={() => handlePostRecipe()}>
              Post
            </Button>
          </Toolbar>
        </AppBar>
        <PostRecipeForm 
          formState={formState}
          setFormState={setFormState}
        />
      </Dialog>
    </div>
  );
}