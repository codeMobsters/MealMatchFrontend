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

export default ExploreFilterForm;
