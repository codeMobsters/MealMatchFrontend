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
import { NewRecipe, Filter } from "../Utils/Types";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import MultipleSelectChip from "./ChipSelector";
import { Preferences } from "../Utils/Constants";
import { isValidFileUploaded } from "../Utils/HelperFunctions";

type ExploreFilterForm = {
  formState: Filter;
  setFormState: React.Dispatch<React.SetStateAction<Filter>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  openError: boolean;
  setOpenError: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExploreFilterForm = (props: ExploreFilterForm) => {
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

  return (
    <Box sx={{ width: "80vw", margin: "0 auto", paddingTop: 2 }}>
      <FormControl sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="search" sx={{ lineHeight: 2 }}>
          Search
        </InputLabel>
        <Input
          required
          id="search"
          aria-describedby="search-text"
          sx={{ width: "80vw" }}
          onChange={e =>
            props.setFormState({ ...props.formState, query: e.target.value })
          }
        />
        <FormHelperText id="recipe-name-helper-text">
          Give your recipe a name
        </FormHelperText>
      </FormControl>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
      <MultipleSelectChip
        seedType="Cuisine"
        seedData={Preferences.Cuisines}
        onChange={actualValue => {
          let formIngredients =
            props.formState.cuisineType?.concat(actualValue);
          props.setFormState({
            ...props.formState,
            cuisineType: formIngredients,
          });
        }}
      />
      <MultipleSelectChip
        seedType="Diet labels"
        seedData={Preferences.DietLabels}
        onChange={actualValue => {
          let formIngredients = props.formState.dietLabels?.concat(actualValue);
          props.setFormState({
            ...props.formState,
            dietLabels: formIngredients,
          });
        }}
      />
      <MultipleSelectChip
        filledValues={false}
        seedType="Dish type"
        seedData={Preferences.DishTypes}
        onChange={actualValue => {
          let formIngredients = props.formState.dishType?.concat(actualValue);
          props.setFormState({ ...props.formState, dishType: formIngredients });
        }}
      />
      <MultipleSelectChip
        filledValues={false}
        seedType="Health labels"
        seedData={Preferences.HealthLabels}
        onChange={actualValue => {
          let formIngredients =
            props.formState.healthLabels?.concat(actualValue);
          props.setFormState({
            ...props.formState,
            healthLabels: formIngredients,
          });
        }}
      />
      <MultipleSelectChip
        filledValues={false}
        seedType="Meal type"
        seedData={Preferences.MealTypes}
        onChange={actualValue => {
          let formIngredients = props.formState.mealType?.concat(actualValue);
          props.setFormState({ ...props.formState, mealType: formIngredients });
        }}
      />
      <Snackbar
        open={props.openError}
        autoHideDuration={2000}
        onClose={handleClose}
      >
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

export default ExploreFilterForm;
