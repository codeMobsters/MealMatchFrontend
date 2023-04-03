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
import ExploreFilterForm from "./ExploreFilterForm";
import { LoginResponse, Filter } from "../Utils/Types";
import { filter } from "../Utils/Constants";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ExploreFilterDialog = {
  openPostDialog: boolean;
  setOpenPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
  user: LoginResponse;
  handleExploreSearch: (term: string) => void;
}

export default function ExploreFilterDialog(props: ExploreFilterDialog) {
  const [formState, setFormState] = useState<Filter>(filter);
  const [errorMsg, setErrorMsg] = useState("");
  const [openError, setOpenError] = useState(false);
  

  function handlePostRecipe() {
    
    props.setOpenPostDialog(false);
  }

  const handleClose = () => {
    setFormState(filter);
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
              Filters
            </Typography>
            <Button
              autoFocus
              color="inherit"
              sx={{ border: 1, borderColor: "text.secondary" }}
              onClick={() => handlePostRecipe()}
            >
              Apply
            </Button>
          </Toolbar>
        </AppBar>
        <ExploreFilterForm
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
