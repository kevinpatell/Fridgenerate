import React from 'react';
import axios from 'axios';

const RecipeDetails = ({ currentRecipe }) => {

    const similarRecipesClick = () => {
        const url = 'http://localhost:8000/similar_recipes/';
    
        axios.post(url, {
            'data': {
                'recipe_id': currentRecipe.id
            }
        })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    function recipeDetails() {
        if (currentRecipe.id) {
            return (
                <div className="recipe-summary">
                    <div className="recipe-details-name"><h1> {currentRecipe.name}</h1></div>
                    <div className="recipe-details-img"><img src={currentRecipe.image} alt={currentRecipe.name}/></div>
                    <div className="recipe-details-org"><p><span>Ingredients: </span>
                    <br/>
                    <br/>
                    {currentRecipe.originalString}</p></div>
                    <div className="recipe-details-inst"><p><span>Instructions: </span>
                    <br/>
                    <br/>
                    {currentRecipe.instructions}</p></div>
                    <button className="Ingredients-button" onClick={similarRecipesClick} type='button'>Click for Similar Recipes</button>
                </div>
            )
        }
    }

    return (
        <section className="recipe-details">
            {recipeDetails()}
        </section>
    )
};


export default RecipeDetails;