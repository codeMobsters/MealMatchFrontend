import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { FollowListDialogProps, } from "../Utils/Types";
import { Box, IconButton, Tab, Tabs, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UsersList from "./UsersList";
import { fetchFollowingUsers, fetchFollowedUsers } from "../Utils/HelperFunctions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function FollowListDialog(props: FollowListDialogProps) {

  const handleClose = () => {
    props.setOpenFollowDialog(0);
    if (props.refetch) {
      props.refetch();
    }
  }

  return (
      <Dialog
        fullScreen
        open={props.openFollowDialog > 0}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "fixed" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {props.openFollowDialog && props.openFollowDialog == 1 ?
          <UsersList
            queryType="followed" 
            user={props.user} 
            setUser={props.setUser}
            fetchFunction={fetchFollowingUsers} userId={props.userId}
          />
          :
          <UsersList
            queryType="followers"
            user={props.user}
            setUser={props.setUser}
            fetchFunction={fetchFollowedUsers}
            userId={props.userId}/>
        }
      </Dialog>
  );
}
