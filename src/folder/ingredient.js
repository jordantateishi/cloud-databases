import React, { useState } from 'react';
import { firebase } from '../firebase/firebase.js';

const Ingredient = () => {
  const ingredients = firebase.firestore().collection('ingredients');
  const [addIngredientName, setAddIngredientName] = useState('');
  const [addIngredientSize, setAddIngredientSize] = useState('');
  const [addIngredientCost, setAddIngredientCost] = useState('');
  const [addIngredientCostPerOz, setAddIngredientCostPerOz] = useState('');
  const [addIngredientMetric, setAddIngredientMetric] = useState('');

  const addField = () => {
    if (addIngredientName && addIngredientName.length > 0){
      const data = {
        name: addIngredientName,
        size: addIngredientSize,
        cost: addIngredientCost,
        costPerOz: addIngredientCostPerOz,
        metric: addIngredientMetric
      };
      ingredients
        .add(data)
        .then(() => {
          setAddIngredientName('');
          setAddIngredientSize('');
          setAddIngredientCost('');
          setAddIngredientCostPerOz('');
          setAddIngredientMetric('');
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleChangeIngredientName = (event) => {
    setAddIngredientName(event.target.value);
  };

  const handleChangeIngredientSize = (event) => {
    setAddIngredientSize(event.target.value);
  };

  const handleChangeIngredientCost = (event) => {
    setAddIngredientCost(event.target.value);
  };

  const handleChangeIngredientCostPerOz = (event) => {
    setAddIngredientCostPerOz(event.target.value);
  };

  const handleChangeIngredientMetric = (event) => {
    setAddIngredientMetric(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Add ingredient name"
          placeholdertextcolor="#ADD8E6"
          onChange={handleChangeIngredientName}
          value={addIngredientName}
        />
        <input
          type="text"
          placeholder="Add ingredient size"
          placeholdertextcolor="#ADD8E6"
          onChange={handleChangeIngredientSize}
          value={addIngredientSize}
        />
        <input
          type="text"
          placeholder="Add ingredient cost"
          placeholdertextcolor="#ADD8E6"
          onChange={handleChangeIngredientCost}
          value={addIngredientCost}
        />
        <input
          type="text"
          placeholder="Add ingredient cost per oz"
          placeholdertextcolor="#ADD8E6"
          onChange={handleChangeIngredientCostPerOz}
          value={addIngredientCostPerOz}
        />
        <input
          type="text"
          placeholder="Add ingredient metric"
          placeholdertextcolor="#ADD8E6"
          onChange={handleChangeIngredientMetric}
          value={addIngredientMetric}
        />
        <button onClick={addField}>Submit</button>
      </div>
    </div>
  );
};

export default Ingredient;
