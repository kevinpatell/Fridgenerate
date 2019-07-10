import React, { useState } from 'react';
import ReactTags from 'react-tag-autocomplete';


const Test = () => {
    
    const initialTags = [
        {id: 1, name: "Apples"},
        {id: 2, name: "Bananas"},
        {id: 3, name: "Eggs"},
    ]
    
    const initialSuggestions = [
        {id:4, name: "Bacon"},
        {id:5, name: "Chicken"},
        {id:6, name: "Lemons"},
        {id:7, name: "Butter"},
        {id:8, name: "Milk"},
    ]
    
    const [tags, setTags] = useState(initialTags)
    const [suggestions, setSuggestions] = useState(initialSuggestions)

    const handleDelete = (i) => {
        console.log("Handle delete:", i)
        let newTags = tags.slice(0)
        newTags.splice(i, 1)

        setTags( newTags )
    }

    const handleAddition = (tag) => {
        console.log("Addition:", tag)

        const newTags = [].concat(tags, tag)
        setTags( newTags )
    }

    const handleSuggestion = (tag) => {
        // Do an axios call to an endpoint that returns Ingredients matching string
    }

    return (
        <ReactTags
            tags={tags}
            suggestions={suggestions}
            handleDelete={handleDelete}
            handleAddition={handleAddition} />
    )
}


export default Test;
