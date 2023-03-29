import { Box, FormControl, InputLabel, Input, FormHelperText, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { PostRecipeFormProps } from '../Utils/Types'

const PostRecipeForm = (props :PostRecipeFormProps) => {
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
                onChange={(e) => 
                    props.setFormState({...props.formState, TotalTime: e.target.value})
                }/>
                <FormHelperText id="recipe-time-helper-text">How long does it take to cook it?</FormHelperText>
            </FormControl>
        </Container>
        <Typography>
        Ingredients
        </Typography>
        <Container sx={{padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr 4fr', marginBottom : 2}}>
            <FormControl>
                <InputLabel htmlFor="recipe-quantity">#</InputLabel>
                <Input type='number' id="recipe-quantity" aria-describedby="recipe-quantity-helper-text"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="recipe-unit">Unit</InputLabel>
                <Input type='number' id="recipe-unit" aria-describedby="recipe-unit-helper-text"  sx={{marginLeft: 1}}/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="recipe-ingredient">Ingredient</InputLabel>
                <Input type='text' id="recipe-ingredient" aria-describedby="recipe-ingredient-helper-text" sx={{marginLeft: 1}}/>
            </FormControl>
            
        </Container>
    </Box>
  )
}

export default PostRecipeForm