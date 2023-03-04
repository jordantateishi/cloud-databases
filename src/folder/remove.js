import React, { useState } from 'react';
import { firebase } from '../firebase/firebase.js';

const RemoveIngredient = () => {
  const [ingredientName, setIngredientName] = useState('');

  const handleIngredientNameChange = (event) => {
    setIngredientName(event.target.value);
  }

  const handleRemoveIngredient = () => {
    const db = firebase.firestore();
    const ingredientsRef = db.collection('ingredients');
    
    const query = ingredientsRef.where('name', '==', ingredientName);
    query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
          console.log('Ingredient successfully deleted!');
        }).catch((error) => {
          console.error('Error removing ingredient: ', error);
        });
      });
      setIngredientName('');
    }).catch((error) => {
      console.error('Error getting documents: ', error);
    });
  }

  return (
    <div>
      <label htmlFor="ingredientName">Ingredient Name:</label>
      <input type="text" id="ingredientName" value={ingredientName} onChange={handleIngredientNameChange} />
      <button onClick={handleRemoveIngredient}>Remove Ingredient</button>
    </div>
  );
}

export default RemoveIngredient;

