import React, { useState, useEffect  } from 'react';
import { firebase } from '../firebase/firebase.js';

const EditIngredient = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [cost, setCost] = useState('');
  const [costPerOz, setCostPerOz] = useState('');
  const [metric, setMetric] = useState('');

  useEffect(() => {
    const fetchIngredients = async () => {
      const snapshot = await firebase.firestore().collection('ingredients').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIngredients(data);
    };

    fetchIngredients();
  }, []);

  const handleSelectIngredient = (event) => {
    const ingredientId = event.target.value;
    const ingredient = ingredients.find(ingredient => ingredient.id === ingredientId);
    setSelectedIngredient(ingredient);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await firebase.firestore().collection('ingredients').doc(selectedIngredient.id).set({
      name,
      size,
      cost,
      costPerOz,
      metric,
    }, { merge: true });
  
    // Reset form
    setName('');
    setSize('');
    setCost('');
    setCostPerOz('');
    setMetric('');
    setSelectedIngredient(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Ingredient:
        <select onChange={handleSelectIngredient}>
          <option value="">Select an ingredient</option>
          {ingredients.map(ingredient => (
            <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
          ))}
        </select>
      </label>
      {selectedIngredient && (
        <>
          <label>
            Name:
            <input type="text" value={name} onChange={event => setName(event.target.value)} />
          </label>
          <label>
            Size:
            <input type="text" value={size} onChange={event => setSize(event.target.value)} />
          </label>
          <label>
            Cost:
            <input type="text" value={cost} onChange={event => setCost(event.target.value)} />
          </label>
          <label>
            Cost per oz:
            <input type="text" value={costPerOz} onChange={event => setCostPerOz(event.target.value)} />
          </label>
          <label>
            Metric:
            <input type="text" value={metric} onChange={event => setMetric(event.target.value)} />
          </label>
          <button type="submit">Save</button>
        </>
      )}
    </form>
  );
};

export default EditIngredient;
