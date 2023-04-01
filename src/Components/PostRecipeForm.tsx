import { Box, FormControl, InputLabel, Input, FormHelperText, Typography, InputAdornment, Button, Alert, Snackbar, Divider } from '@mui/material'
import { Container } from '@mui/system'
import { ChangeEvent, useRef, useState } from 'react';
import { NewRecipe } from '../Utils/Types'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import MultipleSelectChip from './ChipSelector';
import { Preferences } from '../Utils/Constants';
import { isValidFileUploaded } from '../Utils/HelperFunctions';

type PostRecipeFormProps = {
    formState: NewRecipe;
    setFormState: React.Dispatch<React.SetStateAction<NewRecipe>>;
    openFormstateError :string;
    setOpenFormstateError : React.Dispatch<React.SetStateAction<string>>;
  };

const PostRecipeForm = (props :PostRecipeFormProps) => {
  const [quantity, setQuantity] = useState<string>();
  const [unit, setUnit] = useState<string>();
  const [ingredient, setIngredient] = useState<string>();
  const [openError, setOpenError] = useState(false);
  const [openFileError, setOpenFileError] = useState(false);
  const [ingredientList, setIngredientList] = useState<string[]>();

  function handleAddIngredient() {
    if (props.formState) {
        if (quantity && unit && ingredient) {
            let ingredientLine = `${quantity} ${unit} ${ingredient}`;
            let formIngredients = [...props.formState.Ingredients, ingredientLine];
            setIngredientList(formIngredients);
            props.setFormState({...props.formState, Ingredients: formIngredients});
        } else {
            setOpenError(true);
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
    setOpenError(false);
  };
  const handleFileClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFileError(false);
  };
  const handleFormstateClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    props.setOpenFormstateError("");
  };
  
  function fileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target && e.target.files) {
        if(e.target.files.length < 1){
          return;
        }
        const file = e.target.files[0];
        if(isValidFileUploaded(file)){
          props.setFormState({...props.formState, RecipePicture: file})
        }else{
            setOpenFileError(true);
        }
    }
  }

  return (
    <Box sx={{width: '80vw', margin: '0 auto', paddingTop: 2}}>
        <FormControl sx={{marginBottom : 2}}>
            <InputLabel htmlFor="recipe-name">Recipe name</InputLabel>
            <Input required id="recipe-name" 
            aria-describedby="recipe-name-helper-text" 
            sx={{width: '80vw'}}
            onChange={(e) => 
                props.setFormState({...props.formState, Title: e.target.value})
            }/>
            <FormHelperText id="recipe-name-helper-text">Give your recipe a name</FormHelperText>
        </FormControl >

        <Container sx={{padding: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginBottom : 2}}>
            <FormControl>
                <InputLabel htmlFor="recipe-yield">Yield</InputLabel>
                <Input type='number' id="recipe-yield" 
                aria-describedby="recipe-yield-helper-text" 
                sx={{width: '25vw'}}
                onChange={(e) => 
                    props.setFormState({...props.formState, Yield: e.target.value})
                }/>
                <FormHelperText id="recipe-yield-helper-text">How many paople can it feed?</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="recipe-calories">Cals</InputLabel>
                <Input type='number' id="recipe-calories" 
                aria-describedby="recipe-calories-helper-text"
                sx={{width: '25vw'}}
                endAdornment={<InputAdornment sx={{marginRight: 1}} position="end">kCal</InputAdornment>}
                onChange={(e) => 
                    props.setFormState({...props.formState, Calories: e.target.value})
                }/>
                <FormHelperText id="recipe-calories-helper-text">How many calories does it contain?</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="recipe-time">Time</InputLabel>
                <Input type='number' id="recipe-time"
                aria-describedby="recipe-time-helper-text"
                sx={{width: '25vw'}}
                endAdornment={<InputAdornment sx={{marginRight: 1}} position="end">min</InputAdornment>}
                onChange={(e) => 
                    props.setFormState({...props.formState, TotalTime: e.target.value})
                }/>
                <FormHelperText id="recipe-time-helper-text">How long does it take to cook it?</FormHelperText>
            </FormControl>
        </Container>
        <Typography>
        Ingredients
        </Typography>
        {ingredientList && ingredientList.map((ingredient, index) => <Typography key={index}>{ingredient}</Typography>)}
        <Container sx={{padding: 0, display: 'grid', gridTemplateColumns: '1fr 2fr 3fr', marginBottom : 2, marginTop: 2}}>
            <FormControl>
                <InputLabel htmlFor="recipe-quantity">#</InputLabel>
                <Input 
                    type='number' 
                    id="recipe-quantity"
                    onChange={(e) => 
                        setQuantity(e.target.value)
                    }
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="recipe-unit">Unit</InputLabel>
                <Input 
                    type='text' 
                    id="recipe-unit"
                    sx={{marginLeft: 1}}
                    onChange={(e) => 
                        setUnit(e.target.value)
                    }
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="recipe-ingredient">Ingredient</InputLabel>
                <Input 
                type='text' 
                id="recipe-ingredient"
                sx={{marginLeft: 1}}
                onChange={(e) => 
                    setIngredient(e.target.value)
                }
                />
            </FormControl>
        </Container>

        <Button 
            onClick={() => handleAddIngredient()}
            sx={{marginLeft: 'auto', border: 1, borderColor: "text.secondary"}}
            color= 'inherit'
            >
              Add ingredient
        </Button>
        <Divider sx={{ marginTop: 1, marginBottom: 1}}/>

        <Typography>
        Instructions
        </Typography>
        <FormControl sx={{display: 'block', marginTop: 1}}>
            <TextareaAutosize
            style={{
                fontSize: '100%',
                width: '80vw', 
                maxWidth: '80vw', 
                height: '150px', 
                maxHeight: '150px', 
                overflow: 'scroll'
            }}
            id="recipe-instructions"
            onChange={(e) => 
                props.setFormState({...props.formState, Instructions: e.target.value})
            }
            />
        </FormControl>

        <MultipleSelectChip 
            seedType='Cuisine' 
            seedData={Preferences.Cousines}
            onChange={(actualValue) => {
                let formIngredients = props.formState.CuisineType?.concat(actualValue);
                props.setFormState({...props.formState, CuisineType: formIngredients});
            }}
        />
        <MultipleSelectChip 
            seedType='Diet labels'
            seedData={Preferences.dietLabels}
            onChange={(actualValue) => {
                let formIngredients = props.formState.DietLabels?.concat(actualValue);
                props.setFormState({...props.formState, DietLabels: formIngredients});
            }}
        />
        <MultipleSelectChip 
            filledValues={false}
            seedType='Dish type'
            seedData={Preferences.DishTypes}
            onChange={(actualValue) => {
                let formIngredients = props.formState.DishType?.concat(actualValue);
                props.setFormState({...props.formState, DishType: formIngredients});
            }}
        />
        <MultipleSelectChip 
            filledValues={false}
            seedType='Health labels'
            seedData={Preferences.healthLabels}
            onChange={(actualValue) => {
                let formIngredients = props.formState.HealthLabels?.concat(actualValue);
                props.setFormState({...props.formState, HealthLabels: formIngredients});
            }}
        />
        <MultipleSelectChip 
            filledValues={false}
            seedType='Meal type'
            seedData={Preferences.mealTypes}
            onChange={(actualValue) => {
                let formIngredients = props.formState.MealType?.concat(actualValue);
                props.setFormState({...props.formState, MealType: formIngredients});
            }}
        />

        <FormControl
            sx={{marginTop: 2, marginBottom: 3}}
        >
            <Input
                aria-describedby='recipe-time-helper-text'
                type="file"
                id="recipe-image"
                onChange={(e :ChangeEvent<HTMLInputElement>) => fileChange(e)}
            />
            <FormHelperText id="recipe-time-helper-text">Please provide a picture</FormHelperText>
        </FormControl>

        <Snackbar open={props.openFormstateError != ""} autoHideDuration={2000} onClose={handleFormstateClose}>
        <Alert
          variant="filled"
          onClose={handleFileClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {props.openFormstateError}
        </Alert>
      </Snackbar>
        <Snackbar open={openFileError} autoHideDuration={2000} onClose={handleFileClose}>
        <Alert
          variant="filled"
          onClose={handleFileClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          You must provide a valid picture!
        </Alert>
      </Snackbar>
        <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          To add an ingredient, please fill all the data!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default PostRecipeForm