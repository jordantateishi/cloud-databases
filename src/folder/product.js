import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/firebase.js';
import Select from 'react-select';

const Product = () => {
  const products = firebase.firestore().collection('products');
  const recipes = firebase.firestore().collection('recipes');

  const [addProductName, setAddProductName] = useState('');
  const [addProductRecipes, setAddProductRecipes] = useState([]);
  const [recipeOptions, setRecipeOptions] = useState([]);
  const [selectKey, setSelectKey] = useState(0);

  useEffect(() => {
    const unsubscribe = recipes.orderBy('name').onSnapshot((snapshot) => {
      const options = snapshot.docs.map((doc) => ({
        label: doc.data().name,
        value: doc.id
      }));
      setRecipeOptions(options);
    });
    return unsubscribe;
  }, [recipes]);

  const addField = () => {
    if (addProductName && addProductName.length > 0){
      const data = {
        name: addProductName,
        recipes: addProductRecipes,
      };
      products
        .add(data)
        .then(() => {
          setAddProductName('');
          setAddProductRecipes([]);
          setRecipeOptions([]);
          setSelectKey(selectKey + 1);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleChangeProductName = (event) => {
    setAddProductName(event.target.value);
  };

  const handleChangeProductRecipes = (selectedOptions) => {
    const recipes = selectedOptions.map((option) => option.value);
    setAddProductRecipes(recipes);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Add product name"
          placeholdertextcolor="#ADD8E6"
          onChange={handleChangeProductName}
          value={addProductName}
        />
        <Select
          key={selectKey}
          isMulti
          placeholder="Add recipes"
          options={recipeOptions}
          onChange={handleChangeProductRecipes}
        />
        <button onClick={addField}>Submit</button>
      </div>
    </div>
  );
};

export default Product;

