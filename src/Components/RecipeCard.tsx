import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoginResponse, Recipe } from "../Utils/Types";
import { useState } from "react";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import CommentsDialog from "./CommentDialog";
import { addNewRecipeEdamam, deleteFavorite } from "../Utils/HelperFunctions";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface RecipeCardProps {
  recipe: Recipe;
  user: LoginResponse | undefined;
  isFavorite: boolean;
}

export default function RecipeCard(props: RecipeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [openCommentsDialog, setOpenCommentsDialog] = useState(false);
  const [recipeId, setRecipeId] = useState(
    props.recipe.recipeId == undefined ? 0 : props.recipe.recipeId
  );
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const [commentList, setCommentList] = useState(
    props.recipe.comments?.sort((a, b) => b.commentId - a.commentId)
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavorite = async () => {
    if (props.user?.token) {
      if (!isFavorite) {
        const newRecipe = await addNewRecipeEdamam(
          props.user!.token,
          props.recipe
        );
        if (newRecipe.recipeId != undefined) {
          setRecipeId(newRecipe.recipeId);
        }
      } else if (props.user.id !== props.recipe.recipeOwnerId) {
        await deleteFavorite(props.user!.token, recipeId);
        setRecipeId(0);
        setIsFavorite(!isFavorite);
      }
    }
  };

  return (
    <Card
      sx={{
        maxWidth: { xs: "100vw", tablet: "450px", desktop: "550px" },
        margin: "auto",
      }}
    >
      {props.recipe.userProfilePictureUrl ? (
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              alt={props.recipe.recipeOwnerName}
              src={props.recipe.userProfilePictureUrl}
            ></Avatar>
          }
          title={props.recipe.label}
          subheader={`By ${props.recipe.recipeOwnerName}`}
        />
      ) : (
        <CardHeader
          title={props.recipe.label}
          subheader={props.recipe.createdAt}
        />
      )}
      <CardMedia
        component="img"
        height="350"
        image={props.recipe.image}
        alt={props.recipe.label}
      />
      {props.recipe.instructions && (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.recipe.instructions}
          </Typography>
        </CardContent>
      )}
      <CardActions disableSpacing>
        <IconButton
          sx={{ marginRight: 1 }}
          aria-label="add to favorites"
          onClick={() => handleFavorite()}
        >
          <FavoriteIcon sx={{ color: `${recipeId ? "red" : "default"}` }} />
        </IconButton>
        <IconButton
          aria-label="go to comments"
          onClick={() => setOpenCommentsDialog(true)}
        >
          <MessageOutlinedIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <b>Ingredients</b>
          </Typography>
          {props.recipe.ingredientLines &&
            props.recipe.ingredientLines.map(ingredients => (
              <Typography key={ingredients}>{ingredients}</Typography>
            ))}
          <Typography paragraph sx={{ marginTop: 2 }}>
            <b>Method</b>
          </Typography>
          {props.recipe.instructions &&
            props.recipe.instructions.map(instruction => (
              <Typography key={instruction}>{instruction}</Typography>
            ))}
          {props.recipe.url && (
            <Typography>
              <a href={props.recipe.url} target="_blank">
                {props.recipe.url}
              </a>
            </Typography>
          )}
        </CardContent>
      </Collapse>
      <CommentsDialog
        recipe={props.recipe}
        user={props.user}
        comments={commentList}
        setCommentList={setCommentList}
        openCommentsDialog={openCommentsDialog}
        setOpenCommentsDialog={setOpenCommentsDialog}
      />
    </Card>
  );
}
