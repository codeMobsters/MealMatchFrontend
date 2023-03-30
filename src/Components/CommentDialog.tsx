import { useState, forwardRef, Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Comment } from '../Utils/Types';
import { FormControl, Input, Container, Divider, List, ListItem, ListItemText, Card, CardHeader, Avatar, CardContent, Typography } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import React from 'react';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export type CommentsDialogProps = {
  comments :Comment[] | undefined,
  openCommentsDialog :boolean,
  setOpenCommentsDialog : React.Dispatch<React.SetStateAction<boolean>>
}

export default function CommentsDialog(props :CommentsDialogProps) {
    
    const [commentText, setCommentText] = useState<string>("");
    
    function handlePostComment() {
        console.log(commentText);
    }
    const handleClose = () => {
      props.setOpenCommentsDialog(false);
    };

  return (
    <Dialog
      fullScreen
      open={props.openCommentsDialog}
      onClose={handleClose}
      TransitionComponent={Transition}>
    <>
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
      </Toolbar>
    </AppBar>
    <Container sx={{position: 'fixed', top: '56px', padding: 0, display: 'grid', gridTemplateColumns: '1fr'}}>
    {props.comments && props.comments.map(comment => 
        <Card key={comment.commentId}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="comment" 
                alt={comment.userName}
                src={comment.userProfilePictureUrl}>
              </Avatar>
            }
            title={comment.userName}
            subheader={comment.commentAt}
            >
            </CardHeader>
            <CardContent>
            <Typography variant="body2">
              {comment.commentText}
            </Typography>
          </CardContent>
        </Card>
      )
    }
    </Container>
    <Container sx={{position: 'fixed', bottom: 0, padding: 0, display: 'grid', gridTemplateColumns: '5fr 1fr', marginLeft: 2, marginTop: 2,marginBottom : 2}}>
      <FormControl sx={{marginBottom : 2}}>
          <Input autoFocus required id="comment-text" placeholder='Add your comment'
            sx={{width: '80vw'}}
            onChange={(e) => setCommentText(e.target.value)}
          />
      </FormControl >
      <Button color="inherit" onClick={() => handlePostComment()} sx={{}}>
        <SendOutlinedIcon />
      </Button>
    </Container>
    </>
  </Dialog>
  );
}