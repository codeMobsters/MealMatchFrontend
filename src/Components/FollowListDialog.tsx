import { useState, forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { FollowListDialogProps, } from "../Utils/Types";
import { Box, IconButton, Tab, Tabs, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UsersList from "./UsersList";
import { fetchFollowingUsers, fetchFollowedUsers } from "../Utils/HelperFunctions";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

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
      style={{ marginTop: "155px" }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function FollowListDialog(props: FollowListDialogProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleClose = () => {
    props.setOpenFollowDialog(0);
    if (props.refetch) {
      props.refetch();
    }
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={props.openFollowDialog > 0}
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
          </Toolbar>
        </AppBar>
        <AppBar position="static">
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            variant="fullWidth"
          >
            <Tab
              label={props.openFollowDialog && props.openFollowDialog == 1 ? "Following" : "Followed"}
              id="tab-1"
              aria-controls="tabpanel-1"
            />
          </Tabs>
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
    </div>
  );
}
