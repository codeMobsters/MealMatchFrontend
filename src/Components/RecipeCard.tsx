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
import { LoginResponse, Recipe, SetValue } from "../Utils/Types";
import { useState } from "react";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentsDialog from "./CommentDialog";
import { addLikeToRecipe, addNewRecipeEdamam, deleteFavorite, deleteLike, addFavoriteToRecipe } from "../Utils/HelperFunctions";
import { Box, List, ListItem } from "@mui/material";

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
  user: LoginResponse;
  setUser: SetValue<LoginResponse>;
}

export default function RecipeCard(props: RecipeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [openCommentsDialog, setOpenCommentsDialog] = useState(false);
  const [recipeId, setRecipeId] = useState(
    props.recipe.recipeId == undefined ? 0 : props.recipe.recipeId
  );
  const [isFavorite, setIsFavorite] = useState(
    props.recipe.recipeId != undefined &&
      props.user.favoriteRecipes != undefined
      ? props.user.favoriteRecipes.includes(props.recipe.recipeId)
      : props.recipe.url != undefined && props.user.favoriteRecipesSources != undefined
        ? props.user.favoriteRecipesSources.includes(props.recipe.url)
        : false
  );
  const [isLiked, setIsLiked] = useState(
    props.recipe.recipeId != undefined &&
      props.user.likedRecipes != undefined
      ? props.user.likedRecipes.includes(props.recipe.recipeId)
      : false
  );
  const [commentList, setCommentList] = useState(
    props.recipe.comments?.sort((a, b) => b.commentId - a.commentId)
  );
  const [likeCount, setLikeCount] = useState(props.recipe.likes != undefined
    ? props.recipe.likes.length
    : 0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavorite = async () => {
    if (props.user?.token) {
      if (!isFavorite) {
        if (props.recipe.recipeId == undefined) {
        const newRecipe = await addNewRecipeEdamam(
          props.user!.token,
          props.recipe
        );
        if (newRecipe.recipeId != undefined) {
          setRecipeId(newRecipe.recipeId);
          setIsFavorite(!isFavorite);
          props.setUser({
            ...props.user,
            favoriteRecipes: [
              ...props.user.favoriteRecipes,
              newRecipe.recipeId,
            ],
          });
        }
      } else {
        await addFavoriteToRecipe(props.user!.token,
          { recipeId: props.recipe.recipeId })
          setRecipeId(props.recipe.recipeId);
          setIsFavorite(!isFavorite);
          let source = props.recipe.url != undefined ? [...props.user.favoriteRecipesSources, props.recipe.url] : [...props.user.favoriteRecipesSources]
          props.setUser({
            ...props.user,
            favoriteRecipes: [
              ...props.user.favoriteRecipes,
              props.recipe.recipeId,
            ], favoriteRecipesSources: [...source]
          });
      }
      } else if (props.user.id !== props.recipe.recipeOwnerId) {
        await deleteFavorite(props.user!.token, recipeId);
        setRecipeId(0);
        setIsFavorite(!isFavorite);
        props.setUser({
          ...props.user,
          favoriteRecipes: props.user.favoriteRecipes.filter(
            id => id !== recipeId
          ),
          favoriteRecipesSources: props.user.favoriteRecipesSources.filter(
            url => url !== props.recipe.url
          ),
        });
      }
    }
  };

  const handleLike = async () => {
    if (props.user?.token) {
      if (!isLiked) {
        await addLikeToRecipe(
          props.user!.token,
          { recipeId: recipeId }
        );
        setIsLiked(!isLiked);
        props.setUser({
          ...props.user,
          likedRecipes: [
            ...props.user.likedRecipes,
            recipeId
          ],
        });
        setLikeCount(likeCount + 1);
      } else {
        await deleteLike(props.user!.token, recipeId);
        setIsLiked(!isLiked);
        props.setUser({
          ...props.user,
          likedRecipes: props.user.likedRecipes.filter(
            id => id !== recipeId
          ),
        });
        setLikeCount(likeCount === 0 ? 0 : likeCount - 1);
      }
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "100vw",
        margin: "auto",
        borderBottom: 1,
        borderColor: "divider"
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
          subheader={`By ${
            props.recipe.recipeOwnerName == "Mr String" ? "Edamam" : props.recipe.recipeOwnerName
          }`}
        />
      ) : (
        <CardHeader
          title={props.recipe.label}
        />
      )}
      <CardMedia
        component="img"
        height="350"
        image={props.recipe.image}
        alt={props.recipe.label}
      />
      <CardActions disableSpacing>
        <IconButton
          sx={{ marginRight: 1 }}
          aria-label="add to favorites"
          onClick={() => handleFavorite()}
        >
          <FavoriteIcon
            sx={{ color: `${isFavorite ? "#D2042D" : "inherit"}` }}
          />
        </IconButton>
        {props.recipe.recipeOwnerName && (
          <>
          <p>{likeCount}</p>
          <IconButton
          sx={{ marginRight: 1 }}
          aria-label="add to likes"
          onClick={() => handleLike()}
        >
          {isLiked ? 
          <ThumbUpIcon
          sx={{ color: "gold" }}
         /> : 
          <ThumbUpOutlinedIcon
          sx={{ color: "inherit" }}
          /> 
          }
        </IconButton>
          <IconButton
            aria-label="go to comments"
            onClick={() => setOpenCommentsDialog(true)}
          >
            <MessageOutlinedIcon />
          </IconButton>
          </>
        )}
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
          </Typography>
          <Box sx={{marginBottom: 2}}>
          {props.recipe.healthLabels &&
            props.recipe.healthLabels.map((healthlabel, index) => (
              <Box 
                component="div" 
                sx={{ 
                  display: 'inline',
                  color: (props.user.healthLabels?.indexOf(healthlabel.toLowerCase()) > -1 ? "green" : "inherit")
                }}
                key={index}
              >
                {healthlabel + ", "}
              </Box>
            ))}
          </Box>
          <Box sx={{marginBottom: 2}}>
          {props.recipe.dietLabels &&
            props.recipe.dietLabels.map((dietlabel, index) => (
              <Box 
                component="div" 
                sx={{ 
                  display: 'inline',
                  color: (props.user.dietLabels?.indexOf(dietlabel.toLowerCase()) > -1 ? "green" : "inherit")
                }}
                key={index}
              >
                {dietlabel + ", "}
              </Box>
            ))}
          </Box>
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
            props.recipe.instructions.map((instruction, index) => (
              <Typography key={instruction}>Step {index + 1}: {instruction}</Typography>
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
