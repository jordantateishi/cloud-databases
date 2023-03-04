import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/firebase.js';
import Select from 'react-select';

const Recipe = () => {
  const recipes = firebase.firestore().collection('recipes');
  const ingredients = firebase.firestore().collection('ingredients');

  const [addRecipeName, setAddRecipeName] = useState('');
  const [addRecipeIngredients, setAddRecipeIngredients] = useState([]);
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [selectKey, setSelectKey] = useState(0);

  useEffect(() => {
    const unsubscribe = ingredients.orderBy('name').onSnapshot((snapshot) => {
      const options = snapshot.docs.map((doc) => ({
        label: doc.data().name,
        value: doc.id
      }));
      setIngredientOptions(options);
    });
    return unsubscribe;
  }, [ingredients]);

  const addField = () => {
    if (addRecipeName && addRecipeName.length > 0){
      const data = {
        name: addRecipeName,
        ingredients: addRecipeIngredients,
      };
      recipes
        .add(data)
        .then(() => {
          setAddRecipeName('');
          setAddRecipeIngredients([]);
          setIngredientOptions([]);
          setSelectKey(selectKey + 1);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleChangeRecipeName = (event) => {
    setAddRecipeName(event.target.value);
  };

  const handleChangeRecipeIngredients = (selectedOptions) => {
    const ingredients = selectedOptions.map((option) => option.value);
    setAddRecipeIngredients(ingredients);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Add recipe name"
          placeholdertextcolor="#ADD8E6"
          onChange={handleChangeRecipeName}
          value={addRecipeName}
        />
        <Select
          key={selectKey}
          isMulti
          placeholder="Add ingredients"
          options={ingredientOptions}
          onChange={handleChangeRecipeIngredients}
        />
        <button onClick={addField}>Submit</button>
      </div>
    </div>
  );
};

export default Recipe;

