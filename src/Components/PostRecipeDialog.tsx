import { useState, forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import PostRecipeForm from "./PostRecipeForm";
import { NewRecipe, PostRecipeDialogProps } from "../Utils/Types";
import { newReipe } from "../Utils/Constants";
import { addNewRecipeFromForm } from "../Utils/HelperFunctions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PostRecipeDialog(props: PostRecipeDialogProps) {
  const [formState, setFormState] = useState<NewRecipe>(newReipe);
  const [errorMsg, setErrorMsg] = useState("");
  const [openError, setOpenError] = useState(false);

  function handlePostRecipe() {
    console.log(formState);
    if (formState.Title.trim() == "") {
      setErrorMsg("Title cannot be empty!");
      setOpenError(true);
      return;
    }
    if (formState.Ingredients.length < 1) {
      setErrorMsg("Ingredients cannot be empty!");
      setOpenError(true);
      return;
    }
    if (formState.Instructions.length < 1) {
      setErrorMsg("Instructions cannot be empty!");
      setOpenError(true);
      return;
    }
    addNewRecipeFromForm(props.user.token, formState);
    props.setOpenPostDialog(false);
  }

  const handleClose = () => {
    setFormState(newReipe);
    props.setOpenPostDialog(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.openPostDialog}
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add your recipe!
            </Typography>
            <Button
              autoFocus
              color="inherit"
              sx={{ border: 1, borderColor: "text.secondary" }}
              onClick={() => handlePostRecipe()}
            >
              Post
            </Button>
          </Toolbar>
        </AppBar>
        <PostRecipeForm
          formState={formState}
          setFormState={setFormState}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          openError={openError}
          setOpenError={setOpenError}
        />
      </Dialog>
    </div>
  );
}
