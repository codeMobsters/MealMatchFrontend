import {
  Box,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
  InputAdornment,
  Button,
  Alert,
  Snackbar,
  Divider,
} from "@mui/material";
import { Container } from "@mui/system";
import { ChangeEvent, useRef, useState } from "react";
import { NewRecipe } from "../Utils/Types";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import MultipleSelectChip from "./ChipSelector";
import { Preferences } from "../Utils/Constants";
import { isValidFileUploaded } from "../Utils/HelperFunctions";

type PostRecipeFormProps = {
  formState: NewRecipe;
  setFormState: React.Dispatch<React.SetStateAction<NewRecipe>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  openError: boolean;
  setOpenError: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostRecipeForm = (props: PostRecipeFormProps) => {
  const [quantity, setQuantity] = useState<string>();
  const [unit, setUnit] = useState<string>();
  const [ingredient, setIngredient] = useState<string>();
  const [instruction, setInstruction] = useState<string>();
  
  const [ingredientList, setIngredientList] = useState<string[]>();
  const [instructionList, setInstructionList] = useState<string[]>();

  function handleAddIngredient() {
    if (props.formState) {
      if (quantity && unit && ingredient) {
        let ingredientLine = `${quantity} ${unit} ${ingredient}`;
        let formIngredients = [...props.formState.Ingredients, ingredientLine];
        setIngredientList(formIngredients);
        props.setFormState({
          ...props.formState,
          Ingredients: formIngredients,
        });
      } else {
        props.setErrorMsg("An error occured while adding ingredient!");
        props.setOpenError(true);
      }
    }
  }

  function handleAddInstruction() {
    if (props.formState) {
      if (instruction) {
        let formInstructions = [...props.formState.Instructions, instruction];
        setInstructionList(formInstructions);
        props.setFormState({
          ...props.formState,
          Instructions: formInstructions,
        });
      } else {
        props.setErrorMsg("An error occured while adding instruction!");
        props.setOpenError(true);
      }
    }
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    props.setErrorMsg("");
    props.setOpenError(false);
  };

  function fileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target && e.target.files) {
      if (e.target.files.length < 1) {
        return;
      }
      const file = e.target.files[0];
      if (isValidFileUploaded(file)) {
        props.setFormState({ ...props.formState, RecipePicture: file });
      } else {
        props.setErrorMsg("Please provide a valid picture!");
        props.setOpenError(true);
      }
    }
  }

  return (
    <Box sx={{ width: "80vw", margin: "0 auto", paddingTop: 2 }}>
      <FormControl sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="recipe-name" sx={{ lineHeight: 2}}>Recipe name</InputLabel>
        <Input
          required
          id="recipe-name"
          aria-describedby="recipe-name-helper-text"
          sx={{ width: "80vw" }}
          onChange={e =>
            props.setFormState({ ...props.formState, Title: e.target.value })
          }
        />
        <FormHelperText id="recipe-name-helper-text">
          Give your recipe a name
        </FormHelperText>
      </FormControl>

      <Container
        sx={{
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          marginBottom: 2,
        }}
      >
        <FormControl>
          <InputLabel htmlFor="recipe-yield" sx={{ lineHeight: 2}}>Yield</InputLabel>
          <Input
            type="number"
            id="recipe-yield"
            aria-describedby="recipe-yield-helper-text"
            sx={{ width: "25vw" }}
            onChange={e =>
              props.setFormState({ ...props.formState, Yield: e.target.value })
            }
          />
          <FormHelperText id="recipe-yield-helper-text">
            How many paople can it feed?
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="recipe-calories" sx={{ lineHeight: 2}} >Cals</InputLabel>
          <Input
            type="number"
            id="recipe-calories"
            aria-describedby="recipe-calories-helper-text"
            sx={{ width: "25vw"}}
            endAdornment={
              <InputAdornment sx={{ marginRight: 1}} position="end">
                kcal
              </InputAdornment>
            }
            onChange={e =>
              props.setFormState({
                ...props.formState,
                Calories: e.target.value,
              })
            }
          />
          <FormHelperText id="recipe-calories-helper-text">
            How many calories does it contain?
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="recipe-time" sx={{ lineHeight: 2}}>Time</InputLabel>
          <Input
            type="number"
            id="recipe-time"
            aria-describedby="recipe-time-helper-text"
            sx={{ width: "25vw" }}
            endAdornment={
              <InputAdornment sx={{ marginRight: 1 }} position="end">
                min
              </InputAdornment>
            }
            onChange={e =>
              props.setFormState({
                ...props.formState,
                TotalTime: e.target.value,
              })
            }
          />
          <FormHelperText id="recipe-time-helper-text">
            How long does it take to cook it?
          </FormHelperText>
        </FormControl>
      </Container>
      <Typography>Ingredients:</Typography>
      {ingredientList &&
        ingredientList.map((ingredient, index) => (
          <Typography key={index}>{ingredient}</Typography>
        ))}
      <Container
        sx={{
          padding: 0,
          display: "grid",
          gridTemplateColumns: "1fr 2fr 3fr",
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        <FormControl>
          <InputLabel htmlFor="recipe-quantity" sx={{ lineHeight: 2}}>#</InputLabel>
          <Input
            type="number"
            id="recipe-quantity"
            onChange={e => setQuantity(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="recipe-unit" sx={{ lineHeight: 2}}>Unit</InputLabel>
          <Input
            type="text"
            id="recipe-unit"
            sx={{ marginLeft: 1 }}
            onChange={e => setUnit(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="recipe-ingredient" sx={{ lineHeight: 2}}>Ingredient</InputLabel>
          <Input
            type="text"
            id="recipe-ingredient"
            sx={{ marginLeft: 1 }}
            onChange={e => setIngredient(e.target.value)}
          />
        </FormControl>
      </Container>

      <Button
        onClick={() => handleAddIngredient()}
        sx={{ marginLeft: "auto", border: 1, borderColor: "text.secondary" }}
        color="inherit"
      >
        Add ingredient
      </Button>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

      <Typography>Instructions:</Typography>
      {instructionList &&
        instructionList.map((instruction, index) => (
          <Typography key={index}>{instruction}</Typography>
        ))}
      <Container
        sx={{
          padding: 0,
          display: "grid",
          gridTemplateColumns: "1fr",
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        <FormControl>
          <InputLabel htmlFor="recipe-step" sx={{ lineHeight: 2}}>Step</InputLabel>
          <Input
            type="text"
            id="recipe-step"
            onChange={e => setInstruction(e.target.value)}
          />
        </FormControl>
      </Container>

      <Button
        onClick={() => handleAddInstruction()}
        sx={{ marginLeft: "auto", border: 1, borderColor: "text.secondary" }}
        color="inherit"
      >
        Add instruction step
      </Button>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
    

      <MultipleSelectChip
        seedType="Cuisine"
        seedData={Preferences.Cousines}
        onChange={actualValue => {
          let formIngredients =
            props.formState.CuisineType?.concat(actualValue);
          props.setFormState({
            ...props.formState,
            CuisineType: formIngredients,
          });
        }}
      />
      <MultipleSelectChip
        seedType="Diet labels"
        seedData={Preferences.dietLabels}
        onChange={actualValue => {
          let formIngredients = props.formState.DietLabels?.concat(actualValue);
          props.setFormState({
            ...props.formState,
            DietLabels: formIngredients,
          });
        }}
      />
      <MultipleSelectChip
        filledValues={false}
        seedType="Dish type"
        seedData={Preferences.DishTypes}
        onChange={actualValue => {
          let formIngredients = props.formState.DishType?.concat(actualValue);
          props.setFormState({ ...props.formState, DishType: formIngredients });
        }}
      />
      <MultipleSelectChip
        filledValues={false}
        seedType="Health labels"
        seedData={Preferences.healthLabels}
        onChange={actualValue => {
          let formIngredients =
            props.formState.HealthLabels?.concat(actualValue);
          props.setFormState({
            ...props.formState,
            HealthLabels: formIngredients,
          });
        }}
      />
      <MultipleSelectChip
        filledValues={false}
        seedType="Meal type"
        seedData={Preferences.mealTypes}
        onChange={actualValue => {
          let formIngredients = props.formState.MealType?.concat(actualValue);
          props.setFormState({ ...props.formState, MealType: formIngredients });
        }}
      />

      <FormControl sx={{ marginTop: 2, marginBottom: 3, display: 'block' }}>
        <Input
          aria-describedby="recipe-time-helper-text"
          type="file"
          id="recipe-image"
          onChange={(e: ChangeEvent<HTMLInputElement>) => fileChange(e)}
        />
        <FormHelperText id="recipe-time-helper-text">
          Please provide a picture
        </FormHelperText>
      </FormControl>

      <Snackbar open={props.openError} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {props.errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PostRecipeForm;
